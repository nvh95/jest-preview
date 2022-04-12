'use strict';
const { processCss, processCSSModules } = require('../../dist/index');

module.exports = {
  process(src, filename) {
    if (filename.endsWith('.module.css')) {
      return processCSSModules(src, filename);
    }
    return processCss(src, filename);
  },
};
