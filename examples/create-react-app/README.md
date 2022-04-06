# Use with create-react-app

This example demonstrates how to use `jest-preview` with `create-react-app`.

## Setup jest with create-react-app

jest is setup with create-react-app by default, we don't need to do anything more

## Installation and Usage

Please refer to [Installation](../../README.md#installation) and [Usage](../../README.md#usage).
Except for step 2 of installation: Create `fileTransform.js`:

- Because `create-react-app` allows user to [use svg files as React components](https://create-react-app.dev/docs/adding-images-fonts-and-files/#adding-svgs), `jest-preview` therefore needs to support that, so we use the below config:

```javascript
// config/jest/fileTransform.js
const { processFileCRA } = require('jest-preview');

module.exports = {
  process(src, filename) {
    return processFileCRA(src, filename);
  },
};
```
