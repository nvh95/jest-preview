'use strict';

const { processCss } = require('jest-preview');

module.exports = {
  process(src, filename) {
    return processCss(src, filename);
  },
};
