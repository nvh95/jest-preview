'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('path');
require('camelcase');

function getRelativeFilename(filename) {
    return filename.split(process.cwd())[1];
}
function processCss(src, filename) {
    if (filename.endsWith('.module.css')) {
        return processCSSModules(src, filename);
    }
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
// CSS Modules will be compiled at run time then inject to the document.body
// One notable note is that `postcss-modules` is an async postcss plugin
// so we need to use `postcss-modules.sync`, with function `sync()`
function processCSSModules(src, filename) {
    return `
const postcss = require('postcss');
const CSSModulesSync = require('postcss-modules-sync').default;
const cssSrc = ${JSON.stringify(src)};

let exportedTokens = {};

const result = postcss(
  CSSModulesSync({
    getJSON: (tokens) => {
      exportedTokens = tokens;
    },
  }),
)
.process(cssSrc, { from: ${JSON.stringify(filename)} })

const style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode(result.css));
document.body.appendChild(style);

module.exports = exportedTokens`;
}

function process$1(src, filename) {
    return processCss(src, filename);
}

exports.process = process$1;
