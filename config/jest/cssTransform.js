"use strict";

// This is a custom Jest transformer turning style imports into empty objects.
// http://facebook.github.io/jest/docs/en/webpack.html

const { writeFileSync } = require("fs");
const path = require("path");
module.exports = {
  process(src, filename) {
    // NOTE: Jest only run process once
    console.log("cssTransform");
    console.log("src", src);
    console.log("filename", filename);
    writeFileSync(`./server/${path.basename(filename)}`, src);
    return "module.exports = {};";
  },
  getCacheKey() {
    // The output is always the same.
    return "cssTransform";
  },
};
