---
sidebar_position: 5
---

# Code transformation

You should use [Pre-configured transformation](/docs/getting-started/installation#2-configure-jests-transform-to-transform-css-and-files) in most cases. However, if you have existing code transformation, you can use the following provided ones as follow:

- `processCss`: Process CSS files
- `processFile`: Process files assets like images

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
```

```javascript
// config/jest/fileTransform.js
'use strict';

const { processFile } = require('jest-preview');

module.exports = {
  process(src, filename) {
    return processFile(src, filename);
  },
};
```
