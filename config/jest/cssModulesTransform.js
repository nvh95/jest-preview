'use strict';
const { processCSSModules } = require('../../dist/index');

module.exports = {
  async processAsync(src, filename) {
    console.log('processAsync', src, filename);
    return processCSSModules(src, filename);
  },
};
