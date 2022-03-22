"use strict";

const { processFile } = require("../../dist/index.cjs");

module.exports = {
  process(src, filename) {
    return processFile(src, filename);
  },
};
