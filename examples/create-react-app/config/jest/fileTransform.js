const { processFileCRA } = require('jest-preview');

module.exports = {
  process(src, filename) {
    return processFileCRA(src, filename);
  },
};
