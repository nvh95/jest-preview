'use strict';
const { processCss } = require('../../dist/index');

module.exports = {
  process(src, filename) {
    return processCss(src, filename);
  },
};
