import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { spawnSync } from 'child_process';
import { pathToFileURL } from 'url';
import camelcase from 'camelcase';
import slash from 'slash';
import { transform } from '@svgr/core';
import { CACHE_FOLDER, CACHE_SUB_FOLDER, SASS_LOAD_PATHS_CONFIG, SASS_SHARED_RESOURCES_CONCAT } from './constants';
import { createCacheFolderIfNeeded } from './utils';

// https://github.com/vitejs/vite/blob/c29613013ca1c6d9c77b97e2253ed1f07e40a544/packages/vite/src/node/plugins/css.ts#L97-L98
const cssLangs = `\\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\\?)`;
const cssModuleRE = new RegExp(`\\.module${cssLangs}`);

function isSass(filename: string): boolean {
  return /.(sass|scss)$/.test(filename);
}

function isLess(filename: string): boolean {
  return /.(less)$/.test(filename);
}

// TODO: Add styl, stylus...
function isPreProcessor(filename: string): boolean {
  return isSass(filename) || isLess(filename);
}

function havePostCss() {
  // TODO: Since we executing postcssrc() twice, the overall speed is slow
  // We can try to process the PostCSS here to reduce the number of executions
  // TODO: Does this break on Windows?
  const checkHavePostCssFileContent = `const postcssrc = require('postcss-load-config');
  
  postcssrc().then(({ plugins, options }) => {
    console.log(true)
  })
  .catch(error=>{
    if (!/No PostCSS Config found/.test(error.message)) {
      throw new Error("Failed to load PostCSS config", error)
    }
    console.log(false)
  });`;
  const tempFileName = createTempFile(checkHavePostCssFileContent);
  const result = spawnSync('node', [tempFileName]);
  fs.unlink(tempFileName, (error) => {
    if (error) throw error;
  });
  const stderr = result.stderr.toString('utf-8').trim();
  if (stderr) console.error(stderr);
  if (result.error) throw result.error;
  return result.stdout.toString().trim() === 'true';
}

function getRelativeFilename(filename: string): string {
  return slash(filename.split(process.cwd())[1]);
}

type TransformedSource = {
  code: string;
};

export function processFile(src: string, filename: string): TransformedSource {
  // /Users/your-name/your-project/src/assets/image.png => /src/assets/image.png
  const relativeFilenameStringified = JSON.stringify(
    getRelativeFilename(filename),
  );

  // TODO: To support https://github.com/jpkleemans/vite-svg-loader and https://github.com/pd4d10/vite-plugin-svgr (already supported) as well
  if (filename.match(/\.svg$/)) {
    // Based on how SVGR generates a component name:
    // https://github.com/smooth-code/svgr/blob/01b194cf967347d43d4cbe6b434404731b87cf27/packages/core/src/state.js#L6
    const pascalCaseFilename = camelcase(path.parse(filename).name, {
      pascalCase: true,
    });
    const componentName = `Svg${pascalCaseFilename}`;

    try {
      const svgComponent = transform.sync(
        src,
        {
          // Do not insert `import * as React from "react";`
          jsxRuntime: 'automatic',
        },
        { componentName },
      );
      // We need to transpile jsx to vanilla jsx so Jest can understand
      // @babel/core is bundled with jest
      // I guess @babel/plugin-transform-react-jsx is installed by default? TODO: To validate this assumption
      // TODO: Do we have any other option to transpile jsx to vanilla jsx?
      // vite-plugin-svgr uses esbuild https://github.com/pd4d10/vite-plugin-svgr/blob/main/src/index.ts
      // How about add esbuild as dependency then use esbuild to transpile jsx to vanilla jsx?
      const babel = require('@babel/core');
      const result = babel.transformSync(svgComponent, {
        plugins: ['@babel/plugin-transform-react-jsx'],
      });

      // TODO: This is workaround to remove "export default". We might comeback to find a better solution
      const componentCodeWithoutExport = result.code
        .split('\n')
        .slice(0, -1) // Remove the last line
        .join('\n');
      return {
        // TODO: To render actual SVG to the snapshot
        code: `const React = require('react')
        ${componentCodeWithoutExport}
        module.exports = {
          __esModule: true,
          default: ${relativeFilenameStringified},
          ReactComponent: ${componentName}
        };`,
      };
    } catch (error) {
      // In case of there is any error, fallback to a span with filename
      return {
        code: `const React = require('react');
      module.exports = {
        __esModule: true,
        default: ${relativeFilenameStringified},
        ReactComponent: React.forwardRef(function ${componentName}(props, ref) {
          return {
            $$typeof: Symbol.for('react.element'),
            type: 'span',
            ref: ref,
            key: null,
            props: Object.assign({}, props, {
              children: ${relativeFilenameStringified}
            })
          };
        }),
      };`,
      };
    }
  }

  return {
    code: `module.exports = {
      __esModule: true,
      default: ${relativeFilenameStringified},
    };`,
  };
}

// We keep processFileCRA for backward compatible reason
export function processFileCRA(
  src: string,
  filename: string,
): TransformedSource {
  // TODO: To add deprecation warning here (using chalk)
  return processFile(src, filename);
}

// TODO: We need to re-architect the CSS transform as follow
// pre-processor (sass, stylus, less) => process(??) => post-processor (css modules, tailwindcss)
// Reference to https://github.com/vitejs/vite/blob/c29613013ca1c6d9c77b97e2253ed1f07e40a544/packages/vite/src/node/plugins/css.ts#L652-L673
export function processCss(src: string, filename: string): TransformedSource {
  const relativeFilename = getRelativeFilename(filename);
  console.time(`Processing ${relativeFilename}`);
  let cssSrc = src;
  const isModule = cssModuleRE.test(filename);
  const isPreProcessorFile = isPreProcessor(filename);
  const haveTailwindCss =
    fs.existsSync(path.join(process.cwd(), 'tailwind.config.js')) ||
    fs.existsSync(path.join(process.cwd(), 'tailwind.config.cjs'));
  const usePostCssExplicitly = havePostCss();

  // Pure CSS
  if (
    !isModule &&
    !isPreProcessorFile &&
    !usePostCssExplicitly &&
    !haveTailwindCss
  ) {
    // Transform to a javascript module that load a <link rel="stylesheet"> tag to the page.
    console.timeEnd(`Processing ${relativeFilename}`);
    return {
      code: `const relativeCssPath = "${relativeFilename}";
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = relativeCssPath;
  document.head.appendChild(link);
  
  module.exports = JSON.stringify(relativeCssPath);`,
    };
  }

  // Pre-processor (sass, stylus, less)
  if (isSass(filename)) {
    cssSrc = processSass(filename);
  }

  if (isLess(filename)) {
    cssSrc = processLess(filename);
  }

  // Process PostCSS (postcss.config.js can be present or not)
  if (usePostCssExplicitly || haveTailwindCss || isModule) {
    console.timeEnd(`Processing ${relativeFilename}`);
    return processPostCss(cssSrc, filename, {
      useConfigFile: usePostCssExplicitly,
      isModule,
      haveTailwindCss,
    });
  }

  console.timeEnd(`Processing ${relativeFilename}`);
  return {
    code: `const style = document.createElement('style');
  style.appendChild(document.createTextNode(${JSON.stringify(cssSrc)}));
  document.head.appendChild(style);
  module.exports = {}`,
  };
}

// TODO: MEDIUM PRIORITY To research about getCacheKey
// Reference:
// - https://jestjs.io/docs/code-transformation#writing-custom-transformers
// - https://github.com/swc-project/jest/blob/17cf883b46c050a485975d8ce96a05277cf6032f/index.ts#L37-L52
// const cacheKeyFunction = createCacheKey();
// export function getCacheKey(src: string, filename: string, ...rest): string {
//   const baseCacheKey = cacheKeyFunction(src, filename, ...rest);
//   return crypto.createHash('md5').update(baseCacheKey).digest('hex');
// }
// August 22, 2022: Actually, we can take css/file transform content into account for getCacheKey.
// So, each time they change, the cache will be invalidated

// We cannot create async transformer if we are using CommonJS
// ( Reference: https://github.com/facebook/jest/issues/11081#issuecomment-791259034
// https://github.com/facebook/jest/issues/11458
// Also, there is a inconsistency in jest docs about should `process` be required
// https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
// A transformer must be an object with at least a process function
// https://jestjs.io/docs/code-transformation#writing-custom-transformers
// As can be seen, only process or processAsync is mandatory to implement)

// Convert from
//cssModulesExportedTokens||| {"scssModule":"_scssModule_ujx1w_1"}
// ---
// css||| ._scssModule_ujx1w_1 {
//   color: #ff0000;
// }
// ---
// To this
// { "cssModulesExportedTokens": { "scssModule":"_scssModule_ujx1w_1"}, "css":"._scssModule_ujx1w_1 { color: #ff0000 }"}
function parsePostCssExternalOutput(output: string) {
  const lines = output.trim().split('---');
  const result = {
    cssModulesExportedTokens: '',
    css: '',
  };
  for (const line of lines) {
    const [key, value] = line.trim().split('|||');
    if (key === 'cssModulesExportedTokens') {
      result.cssModulesExportedTokens = value;
    }
    if (key === 'css') {
      result.css = value;
    }
  }
  return result;
}

function createTempFile(content: string) {
  createCacheFolderIfNeeded();
  const tempFileName = path.join(
    CACHE_FOLDER,
    crypto.randomBytes(16).toString('hex'),
  );
  fs.writeFileSync(tempFileName, content);
  return tempFileName;
}

function processPostCss(
  src: string,
  filename: string,
  options: {
    useConfigFile: boolean;
    isModule: boolean;
    haveTailwindCss: boolean;
  } = { useConfigFile: true, isModule: false, haveTailwindCss: false },
): TransformedSource {
  // TODO: SO SLOWWWWW. How can we speedup this?
  // It currently takes about 0.35 seconds to process one CSS file with PostCSS
  // - getCacheKey
  // - cache result of `postcssrc()` => very hard, since each css file, it must read the config again
  // - somehow speedup `spawnSync`?
  // - Do not execute postcssrc() twice
  const cssModulesPluginsContent = `require('postcss-modules')({
    getJSON: (cssFileName, json, outputFileName) => {
      console.log('cssModulesExportedTokens|||', JSON.stringify(json));
      console.log('---')
    },
    // Use custom scoped name to prevent different hash between operating systems
    // Because new line characters can be different between operating systems. Reference: https://stackoverflow.com/a/10805198
    // Original hash function: https://github.com/madyankin/postcss-modules/blob/7d5965d4df201ef301421a5e35805d1b47f3c914/src/generateScopedName.js#L6
    generateScopedName: function (name, filename, css) {
      const stringHash = require('string-hash');
      const i = css.indexOf('.' + name);
      const line = css.substr(0, i).split(/[\\r\\n|\\n|\\r]/).length;
      // This is not how the real app work, might be an issue if we try to make the snapshot interactive
      // https://github.com/nvh95/jest-preview/issues/84#issuecomment-1146578932
      const removedNewLineCharactersCss = css.replace(/(\\r\\n|\\n|\\r)/g, '');
      const hash = stringHash(removedNewLineCharactersCss).toString(36).substr(0, 5);
      return '_' + name + '_' + hash + '_' + line;
    },
  })`;
  let processPostCssFileContent = `const postcss = require('postcss');
  const postcssrc = require('postcss-load-config');
  const isModule = ${options.isModule}
  const cssSrc = ${JSON.stringify(src)};
  
  // TODO: We have to re-execute "postcssrc()" every CSS file.
  // Can we do better? Singleton?
  postcssrc().then(({ plugins, options }) => {
    plugins.unshift(require('postcss-import')())
    if (isModule) {
      plugins.push(
        ${cssModulesPluginsContent},
      )
    }
    postcss(plugins)
      .process(cssSrc, { ...options, from: ${JSON.stringify(filename)} })
      .then((result) => {
        console.log('css|||', result.css);
        console.log('---')
      });
  });`;

  if (!options.useConfigFile) {
    processPostCssFileContent = `const postcss = require('postcss');
const isModule = ${options.isModule};
const haveTailwindCss = ${options.haveTailwindCss};
const cssSrc = ${JSON.stringify(src)};

let plugins = [];
if (isModule) {
  plugins.unshift(require('postcss-import')())
  plugins.push(
    ${cssModulesPluginsContent},
  )
}
if (haveTailwindCss) {
  // tailwindCss auto resolve config
  // https://github.com/tailwindlabs/tailwindcss/blob/cef02e2dc395ed5b5d31b72183cf7504b3bd76c1/src/util/resolveConfigPath.js#L45-L52
  plugins.push(require("tailwindcss")())
}
postcss(plugins)
.process(cssSrc, { from: ${JSON.stringify(filename)} })
.then((result) => {
  console.log('css|||', result.css);
  console.log('---')
});`;
  }
  const tempFileName = createTempFile(processPostCssFileContent);
  // We have to write this file to disk since Windows cannot process the command with long arguments
  const result = spawnSync('node', [tempFileName]);
  fs.unlink(tempFileName, (error) => {
    if (error) throw error;
  });
  // TODO: What happens if we do not pass `utf-8`?
  const stderr = result.stderr?.toString('utf-8').trim();
  if (stderr) console.error(stderr);
  if (result.error) throw result.error;
  const output = parsePostCssExternalOutput(result.stdout.toString());
  return {
    code: `const style = document.createElement("style");
style.type = "text/css";
const styleContent = ${JSON.stringify(output.css)};
style.appendChild(document.createTextNode(styleContent.replace(/\\\\/g, '')));
document.head.appendChild(style);
module.exports = ${output.cssModulesExportedTokens || '{}'}`,
  };
}

type BuildCssOptions = {
  prependUseShared: boolean;
};

function processSass(filename: string): string {
  let sass;

  try {
    sass = require('sass');
  } catch (err) {
    console.log(err);
    throw new Error('Sass not found. Please install sass and try again.');
  }

  const sassLoadPathsConfigPath = path.join(
    CACHE_FOLDER,
    SASS_LOAD_PATHS_CONFIG,
  );

  let sassLoadPathsConfig: string[];
  if (fs.existsSync(sassLoadPathsConfigPath)) {
    const sassLoadPathsString = fs
      .readFileSync(path.join(CACHE_FOLDER, SASS_LOAD_PATHS_CONFIG), 'utf8')
      .trim();
    sassLoadPathsConfig = JSON.parse(sassLoadPathsString);
  } else {
    sassLoadPathsConfig = [];
  }

  // Workaround for ?bug? with sass.compileString that the location of the source file is not automatically included in load paths
  sassLoadPathsConfig.push(path.parse(filename).dir);

  const sharedSassResourcesPath = path.join(CACHE_FOLDER, SASS_SHARED_RESOURCES_CONCAT);
  const buildOptions: BuildCssOptions = { prependUseShared: false};

  if (fs.existsSync(sharedSassResourcesPath)) {
    buildOptions.prependUseShared = true;
  }

  return buildCssResult(sass, sassLoadPathsConfig, filename, buildOptions);
}

function buildCssResult(sass: any, sassLoadPathsConfig: string[], filename: string, options: BuildCssOptions): string {
  let cssResult;

  // An importer that redirects relative URLs starting with "~" to `node_modules`
  // Reference: https://sass-lang.com/documentation/js-api/interfaces/FileImporter
  const tildeImporter = (url: string) => {
    if (!url.startsWith('~')) return null;
    return new URL(
      // TODO: Search in node_modules by require.resolve (monorepo)
      // E.g: input: ~animate-sass/animate
      // output: file:/Users/yourname/oss/jest-preview/node_modules/animate-sass/animate
      // => require.resolve('animate-sass') + animate
      path.join(pathToFileURL('node_modules').href, url.substring(1)),
    );
  };

  if (options.prependUseShared && !sass.compileString) {
    console.warn("WARNING: Config specifies sharedSassResources, but your version of Sass doesn't support it - consider updating to v1.45.0 or higher.")
  }

  const compileOptions = {
    loadPaths: sassLoadPathsConfig,
    importers: [
      {
        findFileUrl(url: string) {
          return tildeImporter(url);
        },
      },
    ],
  }

  if (options.prependUseShared && sass.compileString) {
    // Transform the filename for use in "use" statement
    const sharedResourcesFilenameForUse = SASS_SHARED_RESOURCES_CONCAT.replace(/^_|\.scss$/g, '');
    // Prepend a "use" statement so shared sass resources are accessible from all source files
    const useSharedStatement = `@use '~${CACHE_SUB_FOLDER}/${sharedResourcesFilenameForUse}' as *;`;
    const sassContent = fs.readFileSync(filename, 'utf8');
    const sassPrefixedWithSharedResources = `${useSharedStatement}\n\n${sassContent}`;

    cssResult = sass.compileString(sassPrefixedWithSharedResources, compileOptions).css;
  } else if (sass.compile) {
    cssResult = sass.compile(filename, compileOptions).css;
  }
  // Because sass.compile is only introduced since sass version 1.45.0
  // For older versions, we have to use the legacy API: renderSync
  else if (sass.renderSync) {
    cssResult = sass
      .renderSync({
        file: filename,
        includePaths: sassLoadPathsConfig,
        importer: [
          function (url: string) {
            return tildeImporter(url);
          },
        ],
      })
      .css.toString();
  } else {
    throw new Error(
      'Cannot compile sass to css: No compile method is available.',
    );
  }

  return cssResult;
}

export function processLess(filename: string): string {
  console.log('processLess', filename);

  try {
    require('less');
  } catch (err) {
    console.log(err);
    throw new Error('Less not found. Please install less and try again.');
  }

  const processLessFileContent = `const less = require('less');
  const fs = require('fs');
  const path = require('path');
  const cssContent = fs.readFileSync(${JSON.stringify(filename)}, 'utf8');
  less.render(cssContent, { filename: ${JSON.stringify(
    filename,
  )}}).then((output) => {
    console.log(output.css);
  });`;

  const tempFileName = createTempFile(processLessFileContent);
  const result = spawnSync('node', [tempFileName]);
  fs.unlink(tempFileName, (error) => {
    if (error) throw error;
  });
  const stderr = result.stderr.toString('utf-8').trim();
  if (stderr) console.error(stderr);
  if (result.error) throw result.error;
  return result.stdout.toString();
}
