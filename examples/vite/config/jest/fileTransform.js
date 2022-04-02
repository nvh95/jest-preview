'use strict';

const { processFile } = require('jest-preview');

module.exports = {
  process(src, filename) {
    return processFile(src, filename);
  },
};
