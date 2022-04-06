import createCacheKey from '@jest/create-cache-key-function';

const fs = require('fs');
const crypto = require('crypto');

function generateHashedFilename(filename: string): string {
  const [basename, ext] = filename.split('.');
  const hashedBasename = crypto
    .createHash('md5')
    .update(basename)
    .digest('hex');
  return `${hashedBasename}.${ext}`;
}

export function generateAssetFile(src: string, filename: string) {
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
  return hashedFilename;
}

// TODO2: What about files that are not images? e.g. pdf, doc, mp3?
// I suppose it's OK. Because as I recalled, webpack still convert pdf, doc, mp3 => link (file-loader?)

function getRelativeFilename(filename: string): string {
  return filename.split(process.cwd())[1];
}

export function processFile(src: string, filename: string): string {
  const relativeFilename = getRelativeFilename(filename);
  return `module.exports = ${JSON.stringify(relativeFilename)};`;
}

// TODO: Import a javascript module that load a <style> tag to header
export function processCss(src: string, filename: string): string {
  // NOTE: Jest only run process once
  // console.log("cssTransform");
  // console.log("src", src);
  // console.log("filename", filename);
  // const hashedFilename = generateAssetFile(src, filename);
  return `const cssFilename = "${filename}";
  const relativeCssPath = cssFilename.split(process.cwd())[1];
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = relativeCssPath;
  document.body.appendChild(link);
  
  module.exports = JSON.stringify(relativeCssPath);
  `;
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
