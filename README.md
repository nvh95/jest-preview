<p align="center">
 <img align="center" alt="Jest Preview Logo" src="https://user-images.githubusercontent.com/8603085/161993303-e904a087-78a1-4abd-bb8d-3ef2cc6db442.svg" width="250"/>
</p>

<h1 align="center">
<a href="https://www.jest-preview.com/docs/getting-started/intro" target="_blank" >Jest Preview</a>
</h1>

<p align="center">
Debug your Jest tests. Effortlessly. 🛠🖼 
</p>
  
<p align="center">
  <img align="center" src="https://user-images.githubusercontent.com/8603085/162563155-7e18c9ef-4fe3-45f2-9065-7fcea8ddb18e.gif" alt="Jest Preview Demo" />
</p>

<p align="center">
  <a href="https://stackblitz.com/edit/jest-preview?file=README.md" title="Try Jest Preview Now" target="_blank">Try Jest Preview Online</a>. No downloads needed!
</p>

<!-- prettier-ignore-start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- prettier-ignore-end -->

[![npm](https://img.shields.io/npm/v/jest-preview)](https://www.npmjs.com/package/jest-preview)
[![npm](https://img.shields.io/npm/dt/jest-preview)](https://www.npmjs.com/package/jest-preview)

![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)
[![Discord](https://img.shields.io/discord/967456149735637002?logo=discord&logoColor=ffffff&style=flat-square)](https://discord.gg/X5PyPUfemh)

## Why **jest-preview**

When writing tests using Jest, we usually debug by reading the HTML code. Sometimes the HTML is too complicated and it's hard to imagine how the UI looks in our head. `jest-preview` initiates a server and serve your HTML in a browser, then you can see your actual UI visually. This way, it helps you debug jest tests faster.

`jest-preview` is initially design to work with [jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/). However it's framework-agnostic and you can use it with any testing libraries.

## Features

- 👀 Preview your actual app's HTML in a browser in milliseconds.
- 🔄 Auto reload browser when execute `preview.debug()`.
- 💅 Support CSS:
  - ✅ [Direct CSS import](#3-configure-jests-transform-to-intercept-css-and-files)
  - ✅ [Styled-components](https://styled-components.com/)
  - ✅ [External CSS](#4-optional-configure-external-css)
  - ✅ [CSS Modules](https://github.com/css-modules/css-modules)
  - ✅ [Sass](https://sass-lang.com/)
- 🌄 Support viewing images.

## How to use `jest-preview` in 2 lines of code

```diff
+import preview from 'jest-preview';

describe('App', () => {
  it('should work as expected', () => {
    render(<App />);
+    preview.debug();
  });
});
```

Or:

```diff
+import { debug } from 'jest-preview';

describe('App', () => {
  it('should work as expected', () => {
    render(<App />);
+    debug();
  });
});
```

## Examples

- Use with [Vite](https://vitejs.dev/): [Example with Vite](https://github.com/nvh95/jest-preview/tree/main/examples/vite-react)
- Use with [Create React App](https://create-react-app.dev/): [Example with CRA](https://github.com/nvh95/jest-preview/tree/main/examples/create-react-app)
- Use with [NextJs Rust Compiler](https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler): [Example with NextJs Rust Compiler](https://github.com/nvh95/jest-preview/tree/main/examples/nextjs)
- Use with [NextJS Babel](https://nextjs.org/docs/testing#setting-up-jest-with-babel): [Example with CRA](https://github.com/nvh95/jest-preview/tree/main/examples/nextjs-babel)

## Installation

### 1. Install `jest-preview`

```bash
npm install --save-dev jest-preview
# Or
yarn add --dev jest-preview
pnpm install --dev jest-preview
```

### 2. Configure jest's transform to transform CSS and files

`jest-preview` comes with pre-configured transformations to handle CSS and files. This is a recommended way to configure. However, you can configure it yourself using exported transform functions as well. See [Advanced configurations](#advanced-configurations) for more.

If you use [Sass](https://sass-lang.com/) in your project, make sure [sass](https://www.npmjs.com/package/sass) is already installed. Note that [Node Sass](https://www.npmjs.com/package/node-sass) and [LibSass](https://sass-lang.com/libsass) are [not supported](https://sass-lang.com/blog/libsass-is-deprecated).

Update `jest.config.js`:

```js
transform: {
  "^.+\\.(css|scss|sass)$": "jest-preview/transforms/css",
  "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "jest-preview/transforms/file",
}
```

For Create React App users, please use `jest-preview/transforms/fileCRA` instead of `jest-preview/transforms/file`. See more at [examples/create-react-app/README.md](./examples/create-react-app/README.md#installation-and-usage)

### 3. If you use CSS Modules, make sure it doesn't get ignored

In most cases, CSS Modules is ignored in Jest environment. For example, Create React App default configuration ignores CSS Modules via [transformIgnorePatterns](https://github.com/facebook/create-react-app/blob/63bba07d584a769cfaf7699e0aab92ed99c3c57e/packages/react-scripts/scripts/utils/createJestConfig.js#L53) and [moduleNameMapper](https://github.com/facebook/create-react-app/blob/63bba07d584a769cfaf7699e0aab92ed99c3c57e/packages/react-scripts/scripts/utils/createJestConfig.js#L58). To make CSS Modules works with Jest Preview, we need to make sure it isn't ignored. Remove options to ignore CSS Modules or mapping using a third party library (such as [identity-obj-proxy](https://github.com/keyz/identity-obj-proxy)).

```diff
// jest.config.js
transformIgnorePatterns: [
-  '^.+\\.module\\.(css|sass|scss)$',
],
moduleNameMapper: {
-  '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
},
```

### 4. Clear your jest Cache

Since we are updating our transformation code, make sure you clear your jest cache for new changes to take effect.

```bash
./node_modules/.bin/jest --clearCache
# Or usually
npm run test -- --clearCache
```

### 5. (Optional) Configure external CSS

Sometimes, there are some CSS files imported outside your current test components (e.g: CSS imported in `src/index.js`, `src/main.tsx`). In this case, you can manually add those CSS files to `jest-preview` by `jestPreviewConfigure`. Notice that they should be path from root of your project.

```js
  // jest.config.js
  {
    setupFilesAfterEnv: ["./config/jest/setupTests.js"],
  }
```

```js
// ./config/jest/setupTests.js
import { jestPreviewConfigure } from 'jest-preview';

// Should be path from root of your project
jestPreviewConfigure({
  externalCss: [
    'demo/global.css',
    'demo/global.scss', // Sass
    'node_modules/@your-design-system/css/dist/index.min.css', // css from node_modules
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
  ],
});
```

### 6. (Optional) Configure public folder

You don't need to do anything if your public folder is `public`. However, if it's different, you can configure as following:

<!-- To add Common public directories as msw does
 when we have a dedicated docs site. https://mswjs.io/docs/getting-started/integrate/browser#where-is-my-public-directory -->

```js
// ./config/jest/setupTests.js
import { jestPreviewConfigure } from 'jest-preview';

// Should be path from root of your project
jestPreviewConfigure({
  publicFolder: 'static', // No need to configure if `publicFolder` is `public`
});
```

## Usage

### 1. Update to `package.json`

```json
{
  "scripts": {
    "jest-preview": "jest-preview"
  }
}
```

Optionally, you can use `npm-run-all` to run jest and `jest-preview` server in parallel

```json
{
  "scripts": {
    "test:debug": "npm-run-all -p test jest-preview"
  },
  "devDependencies": {
    "npm-run-all": "latest"
  }
}
```

### 2. Run the `jest-preview` server

```bash
# You can use PORT to customize port, default to 3336
npm run jest-preview
# Or
yarn jest-preview
pnpm run jest-preview
```

### 3. Preview your html from jest. Following code demo how to use it with [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)

```javascript
import preview from 'jest-preview';

describe('App', () => {
  it('should work as expected', () => {
    render(<App />);

    userEvent.click(screen.getByTestId('increase'));
    userEvent.click(screen.getByTestId('increase'));

    // Open http://localhost:3336 to see the preview
    preview.debug();

    expect(screen.getByTestId('count')).toContainHTML('2');
  });
});
```

Then visit http://localhost:3336 to see the preview

<img alt="Preview your jest test in the browser" src="https://user-images.githubusercontent.com/8603085/161393898-7e283e38-6114-4064-9414-a0ce6d52361d.png" width="600" />

## Advanced configurations

You should use [Pre-configured transformation](#2-configure-jests-transform-to-transform-css-and-files) in most cases. However, if you have existing code transformation, you can use following provided ones as follow:

- `processCss`: Process CSS files
- `processFile`: Process files
- `processFileCRA`: Process files for Create React App

For examples:

````js
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

## Upcoming features

- Support more `css-in-js` libraries.
- Multiple preview.
- [You name it](https://github.com/nvh95/jest-preview/labels/feature_request).

## Run jest-preview locally

Install dependencies

```bash
npm install
```

To see the real demo app

```bash
npm run dev
```

Run `jest` and ` jest-preview` simultaneously

```bash
npm run test
```

Open chrome at http://localhost:3336 to see the preview

However, it's recommend to run `jest` and `jest-preview` separately

```bash
npm run server # Run jest-preview server
npm run test:only # Run jest
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://hung.dev"><img src="https://avatars.githubusercontent.com/u/8603085?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Hung Viet Nguyen</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=nvh95" title="Code">💻</a> <a href="https://github.com/nvh95/jest-preview/commits?author=nvh95" title="Documentation">📖</a> <a href="#example-nvh95" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/ntt261298"><img src="https://avatars.githubusercontent.com/u/36792554?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Truong Nguyen</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=ntt261298" title="Code">💻</a> <a href="https://github.com/nvh95/jest-preview/commits?author=ntt261298" title="Documentation">📖</a> <a href="#example-ntt261298" title="Examples">💡</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/viet-doan-830061a0/"><img src="https://avatars.githubusercontent.com/u/103036586?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Viet Huu Doan</b></sub></a><br /><a href="#design-doanhuuviet" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/ntbinh-Harvey"><img src="https://avatars.githubusercontent.com/u/57211574?v=4?s=100" width="100px;" alt=""/><br /><sub><b>HarveyNguyen</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=ntbinh-Harvey" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/mattmurph9"><img src="https://avatars.githubusercontent.com/u/63432827?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Matt Murphy</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=mattmurph9" title="Documentation">📖</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/traitanit-huangsri-8701b291/"><img src="https://avatars.githubusercontent.com/u/8110002?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Traitanit Huangsri</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=nottyo" title="Code">💻</a></td>
    <td align="center"><a href="http://linkedin.com/in/thanhsonng"><img src="https://avatars.githubusercontent.com/u/28614996?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Thanh Son Nguyen</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=thanhsonng" title="Code">💻</a> <a href="#example-thanhsonng" title="Examples">💡</a> <a href="https://github.com/nvh95/jest-preview/commits?author=thanhsonng" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

![This is open source software](https://user-images.githubusercontent.com/8603085/161439058-98faea42-c6e6-46f4-9ce6-218fad5f3b9a.gif)

MIT
