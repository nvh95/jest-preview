import path from 'path';

function getRelativeFilename(filename: string): string {
  return filename.split(process.cwd())[1];
}

export function processFile(src: string, filename: string): string {
  const relativeFilename = getRelativeFilename(filename);
  return `module.exports = ${JSON.stringify(relativeFilename)};`;
}

export function processCss(src: string, filename: string): string {
  const relativeFilename = getRelativeFilename(filename);
  // Transform to a javascript module that load a <link rel="stylesheet"> tag to the page.
  return `const relativeCssPath = "${relativeFilename}";
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = relativeCssPath;
  document.body.appendChild(link);
  
  module.exports = JSON.stringify(relativeCssPath);`;
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
