import createCacheKey from '@jest/create-cache-key-function';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const camelcase = require('camelcase');

const generateHashedFilename = (filename: string): string => {
  const [basename, ext] = filename.split('.');
  const hashedBasename = crypto
    .createHash('md5')
    .update(basename)
    .digest('hex');
  return `${hashedBasename}.${ext}`;
};

// TODO1: We can support image import by convert image to base 64
// or just copy image to preview folder
// Currently, we copy to preview folder. But convert to base64 might be a better idea
// Since we can avoid the File I/O operations and keep images in the memory
// To experiment about this idea but low priority. First, make it work.

// TODO2: HIGH PRIORITY What about files that are not images? e.g. pdf, doc, mp3?
// I suppose it's OK. Because as I recalled, webpack still convert pdf, doc, mp3 => link (file-loader?)
export function processFile(
  src: string,
  filename: string,
  option?: { supportSvgComponent?: boolean },
): string {
  // Hash to avoid 2 files in different folders with the same name.
  // E.g: `assets/images/abc.png` vs `demo/abc.png`
  const hashedFilename = generateHashedFilename(filename);

  if (!fs.existsSync('./node_modules/.cache/jest-preview-dom')) {
    fs.mkdirSync('./node_modules/.cache/jest-preview-dom', {
      recursive: true,
    });
  }
  fs.writeFileSync(
    `./node_modules/.cache/jest-preview-dom/${hashedFilename}`,
    src,
    {
      flag: 'w',
    },
  );

  const stringifiedHashedFilename = JSON.stringify(hashedFilename);

  if (filename.match(/\.svg$/)) {
    // Based on how SVGR generates a component name:
    // https://github.com/smooth-code/svgr/blob/01b194cf967347d43d4cbe6b434404731b87cf27/packages/core/src/state.js#L6
    const pascalCaseFilename = camelcase(path.parse(filename).name, {
      pascalCase: true,
    });
    const componentName = `Svg${pascalCaseFilename}`;
    return `const React = require('react');
      module.exports = {
        __esModule: true,
        default: ${stringifiedHashedFilename},
        ReactComponent: React.forwardRef(function ${componentName}(props, ref) {
          return {
            $$typeof: Symbol.for('react.element'),
            type: 'img',
            ref: ref,
            key: null,
            props: Object.assign({}, props, {
              src: ${stringifiedHashedFilename}
            })
          };
        }),
      };`;
  }

  return `module.exports = ${stringifiedHashedFilename};`;
}

export function processCss(src: string, filename: string): string {
  // NOTE: Jest only run process once
  // console.log("cssTransform");
  // console.log("src", src);
  // console.log("filename", filename);
  const hashedFilename = generateHashedFilename(filename);

  if (!fs.existsSync('./node_modules/.cache/jest-preview-dom')) {
    fs.mkdirSync('./node_modules/.cache/jest-preview-dom', {
      recursive: true,
    });
  }
  fs.writeFileSync(
    `./node_modules/.cache/jest-preview-dom/${hashedFilename}`,
    src,
    {
      flag: 'w',
    },
  );
  return `module.exports = ${JSON.stringify(hashedFilename)};`;
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
