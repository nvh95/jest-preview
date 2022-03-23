'use strict';

const { processFile } = require('../../dist/index');

module.exports = {
  process(src, filename) {
    return processFile(src, filename);
  },
};
