# Use with create-react-app

This example demonstrates how to use `jest-preview` with `create-react-app`.

## Setup jest with create-react-app

jest is setup with create-react-app by default, we don't need to do anything more

## Installation and Usage

Please refer to [Installation](../../README.md#installation) and [Usage](../../README.md#usage).
Except for step 2 of installation: Create `fileTransform.js`:

- Because `create-react-app` allows user to [use svg files as React components](https://create-react-app.dev/docs/adding-images-fonts-and-files/#adding-svgs), jest therefore needs to support that, so we use the below config:

```javascript
// config/jest/fileTransform.js
const fs = require('fs');
const path = require('path');
const camelcase = require('camelcase');
const { processFile, generateHashedFilename } = require('jest-preview');

module.exports = {
  process(src, filename) {
    if (filename.match(/\.svg$/)) {
      const hashedFilename = JSON.stringify(generateHashedFilename(filename));
      if (!fs.existsSync('./node_modules/.cache/jest-preview-dom')) {
        fs.mkdirSync('./node_modules/.cache/jest-preview-dom', {
          recursive: true,
        });
      }
      fs.writeFileSync(
        `./node_modules/.cache/jest-preview-dom/${hashedFilename}`,
        src,
        {
          flag: 'w',
        },
      );

      // Based on how SVGR generates a component name:
      // https://github.com/smooth-code/svgr/blob/01b194cf967347d43d4cbe6b434404731b87cf27/packages/core/src/state.js#L6
      const pascalCaseFilename = camelcase(path.parse(filename).name, {
        pascalCase: true,
      });
      const componentName = `Svg${pascalCaseFilename}`;
      // Remain assetFilename as the content of SVG Component, so the snapshot will be exactly the same with what CRA generates currently.
      const assetFilename = JSON.stringify(path.basename(filename));
      return `const React = require('react');
      module.exports = {
        __esModule: true,
        default: ${hashedFilename},
        ReactComponent: React.forwardRef(function ${componentName}(props, ref) {
          return {
            $$typeof: Symbol.for('react.element'),
            type: 'svg',
            ref: ref,
            key: null,
            props: Object.assign({}, props, {
              children: ${assetFilename}
            })
          };
        }),
      };`;
    }
    return processFile(src, filename);
  },
};
```
