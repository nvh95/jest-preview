---
sidebar_position: 2
---

# jestPreviewConfigure()

```js
// ./config/jest/setupTests.js
import { jestPreviewConfigure } from 'jest-preview';

// Should be path from root of your project
jestPreviewConfigure({
  // Configure external CSS
  externalCss: [
    'demo/global.css',
    'demo/global.scss', // Sass
    'node_modules/@your-design-system/css/dist/index.min.css', // css from node_modules
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
  ],
  // Configure public folder if your public folder is not "public"
  publicFolder: 'your-public-folder-name',
});
```
