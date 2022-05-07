---
sidebar_position: 5
---

# Code transformation

You should use [Pre-configured transformation](/docs/getting-started/installation#2-configure-jests-transform-to-transform-css-and-files) in most cases. However, if you have existing code transformation, you can use following provided ones as follow:

- `processCss`: Process CSS files
- `processFile`: Process files
- `processFileCRA`: Process files for Create React App

For examples:

```javascript
// config/jest/cssTransform.js
'use strict';

const { processCss } = require('jest-preview');

module.exports = {
  process(src, filename) {
    return processCss(src, filename);
  },
};
````

```javascript
// config/jest/fileTransform.js
'use strict';

const { processFile } = require('jest-preview');
// Use processFileCRA for Create React App

module.exports = {
  process(src, filename) {
    return processFile(src, filename); // Use processFileCRA for Create React App
  },
};
```
