---
sidebar_position: 5
---

# 代码转换

在大多数情况下，你应该使用[预配置的转换](/docs/getting-started/installation#2-配置-jest-的-transform-以转换-css-和文件)。但如果你有现有的代码转换，你也可以使用如下方式：

- `processCss`: 处理 CSS 文件
- `processFile`: 处理文件（如图像）

例如：

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
