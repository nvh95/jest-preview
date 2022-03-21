"use strict";

const path = require("path");
const fs = require("fs");

// This is a custom Jest transformer turning file imports into filenames.
// http://facebook.github.io/jest/docs/en/webpack.html
const { writeFileSync } = require("fs");
module.exports = {
  // TODO: We can support image import by convert image to base 64
  // or just copy image to preview folder
  process(src, filename) {
    const assetFilename = JSON.stringify(path.basename(filename));
    // console.log("fileTransform");
    // console.log("src", src);
    // console.log("filename", filename);
    if (!fs.existsSync("./node_modules/.cache/jest-preview-dom")) {
      fs.mkdirSync("./node_modules/.cache/jest-preview-dom", {
        recursive: true,
      });
    }
    fs.writeFileSync(
      `./node_modules/.cache/jest-preview-dom/${path.basename(filename)}`,
      src,
      {
        flag: "w",
      }
    );

    return `module.exports = ${assetFilename};`;
  },
};
