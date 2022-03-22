"use strict";
const { processCss } = require("../../dist/index.cjs");

module.exports = {
  process(src, filename) {
    return processCss(src, filename);
  },
};
