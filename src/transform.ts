import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import camelcase from 'camelcase';
import slash from 'slash';
import { CACHE_FOLDER, SASS_LOAD_PATHS_CONFIG } from './constants';

function getRelativeFilename(filename: string): string {
  return slash(filename.split(process.cwd())[1]);
}

type TransformedSource = {
  code: string;
};
export function processFile(src: string, filename: string): TransformedSource {
  const relativeFilename = getRelativeFilename(filename);
  return { code: `module.exports = ${JSON.stringify(relativeFilename)};` };
}

export function processFileCRA(
  src: string,
  filename: string,
): TransformedSource {
  // /Users/your-name/your-project/src/assets/image.png => /src/assets/image.png
  const relativeFilename = JSON.stringify(getRelativeFilename(filename));

  if (filename.match(/\.svg$/)) {
    // Based on how SVGR generates a component name:
    // https://github.com/smooth-code/svgr/blob/01b194cf967347d43d4cbe6b434404731b87cf27/packages/core/src/state.js#L6
    const pascalCaseFilename = camelcase(path.parse(filename).name, {
      pascalCase: true,
    });
    const componentName = `Svg${pascalCaseFilename}`;
    return {
      code: `const React = require('react');
    module.exports = {
      __esModule: true,
      default: ${relativeFilename},
      ReactComponent: React.forwardRef(function ${componentName}(props, ref) {
        return {
          $$typeof: Symbol.for('react.element'),
          type: 'svg',
          ref: ref,
          key: null,
          props: Object.assign({}, props, {
            children: ${relativeFilename}
          })
        };
      }),
    };`,
    };
  }

  return {
    code: `module.exports = ${relativeFilename};`,
  };
}

export function processCss(src: string, filename: string): TransformedSource {
  if (filename.endsWith('.module.css')) {
    return processCSSModules(src, filename);
  }
  if (filename.endsWith('.scss') || filename.endsWith('.sass')) {
    return processSass(src, filename);
  }

  const relativeFilename = getRelativeFilename(filename);
  // Transform to a javascript module that load a <link rel="stylesheet"> tag to the page.
  return {
    code: `const relativeCssPath = "${relativeFilename}";
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = relativeCssPath;
document.head.appendChild(link);

module.exports = JSON.stringify(relativeCssPath);`,
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

// We cannot create async transformer if we are using CommonJS
// ( Reference: https://github.com/facebook/jest/issues/11081#issuecomment-791259034
// https://github.com/facebook/jest/issues/11458
// Also, there is a inconsistency in jest docs about should `process` be required
// https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
// A transformer must be an object with at least a process function
// https://jestjs.io/docs/code-transformation#writing-custom-transformers
// As can be seen, only process or processAsync is mandatory to implement)

// We can use that if we opt-in to ESM. But it's not common use case right now (2022)
// So our approach is making CSS Modules a "CSS-in-JS" solution.
// CSS Modules will be compiled at run time then inject to the document.head
// One notable note is that `postcss-modules` is an async postcss plugin
// We have to use Singleton design pattern to make it works asynchronously.
function processCSSModules(src: string, filename: string): TransformedSource {
  return {
    code: `const postcss = require('postcss');
const PostcssModulesPlugin = require('postcss-modules');
const cssSrc = ${JSON.stringify(src)};

class Token {
  set(json) {
    Object.keys(json).forEach((key) => {
      this[key] = json[key];
    });
  }
}

const exportedTokens = new Token();

postcss(
  PostcssModulesPlugin({
    getJSON: (cssFileName, json, outputFileName) => {
      exportedTokens.set(json);
    },
    // Use custom scoped name to prevent different hash between operating systems
    // Because new line characters can be different between operating systems. Reference: https://stackoverflow.com/a/10805198
    // Original hash function: https://github.com/madyankin/postcss-modules/blob/7d5965d4df201ef301421a5e35805d1b47f3c914/src/generateScopedName.js#L6
    generateScopedName: function (name, filename, css) {
      const stringHash = require('string-hash');
      const i = css.indexOf('.' + name);
      const line = css.substr(0, i).split(/[\\r\\n|\\n|\\r]/).length;
      const removedNewLineCharactersCss = css.replace(/(\\r\\n|\\n|\\r)/g, '');
      const hash = stringHash(removedNewLineCharactersCss).toString(36).substr(0, 5);
      return '_' + name + '_' + hash + '_' + line;
    },
  }),
)
.process(cssSrc, { from: ${JSON.stringify(filename)} })
.then((result) => {
  // TODO: Jest 24 (jest-environment-jsdom@24) not work. To investigate
  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(result.css));
  document.head.appendChild(style);
});

module.exports = exportedTokens;`,
  };
}

function processSass(src: string, filename: string): TransformedSource {
  let sass;

  try {
    sass = require('sass');
  } catch (err) {
    console.log(err);
    return {
      code: `module.exports = ${JSON.stringify(filename)};`,
    };
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

  const cssResult = sass.compile(filename, {
    loadPaths: sassLoadPathsConfig,
    importers: [
      {
        // An importer that redirects relative URLs starting with "~" to `node_modules`
        // Reference: https://sass-lang.com/documentation/js-api/interfaces/FileImporter
        findFileUrl(url: string) {
          if (!url.startsWith('~')) return null;
          return new URL(
            path.join(pathToFileURL('node_modules').href, url.substring(1)),
          );
        },
      },
    ],
  }).css;

  return {
    code: `const style = document.createElement('style');
style.appendChild(document.createTextNode(${JSON.stringify(cssResult)}));
document.head.appendChild(style);
module.exports = {}`,
  };
}
