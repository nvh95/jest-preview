<p align="center">
<!-- TODO: Add logo -->
<!-- <img src="" height=""> -->

</p>

<h1 align="center">
Jest Preview 🛠🖼 
</h1>

<p align="center">
Preview your HTML code while using Jest
<p>
  
<p align="center">
  <img align="center" src="https://user-images.githubusercontent.com/8603085/161395967-a99e70d2-2153-46cc-985e-aa54839e4183.gif" alt="Jest Preview Demo" />
<p>

<!-- prettier-ignore-start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- prettier-ignore-end -->

![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)
![npm](https://img.shields.io/npm/v/jest-preview)

## Why **jest-preview**

When writing tests using Jest, we usually debug by reading the HTML code. Sometimes the HTML is too complex and it's hard to imagine how the UI looks in our head. `jest-preview` initiates a server and serve your HTML in a browser, then you can see your actual UI visually. This way, it helps you debug jest tests faster.

`jest-preview` is initially design to work with [jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/). However it's framework-agnostic and you can use it with any testing libraries.

## Features

- 👀 Preview your actual app's HTML in a browser.
- 🔄 Auto reload browser on new preview
- 💅 Support direct import css.
- 🌄 Support viewing images.

## Examples

- Use with [Vite](https://vitejs.dev/): [Example with Vite](https://github.com/nvh95/jest-preview/tree/main/examples/vite)
- Use with [Create React App](https://create-react-app.dev/): [Example with CRA](https://github.com/nvh95/jest-preview/tree/main/examples/create-react-app)

## Installation

1. Install `jest-preview`

```bash
npm install jest-preview
#Or
yarn add jest-preview
pnpm install jest-preview
```

2. Create `cssTransform.js` and `fileTransform.js`

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

3. Configure jest's transform to intercept CSS and files

```javascript
// jest.config.js
transform: {
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js",
  },
```

## Usage

1. Update to `package.json`

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

2. Run the `jest-preview` server

```bash
# You can use PORT to customize port, default to 3336
npm run jest-preview
# Or
yarn jest-preview
pnpm run jest-preview
```

3. Preview your html from jest. Following code demo how to use it with [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)

```javascript
import preview from 'jest-preview';

describe('App', () => {
  it('should work as expected', () => {
    const { container } = render(<App />);

    userEvent.click(screen.getByTestId('increase'));
    userEvent.click(screen.getByTestId('increase'));

    // Open http://localhost:3336 to see the preview
    preview(container);

    expect(screen.getByTestId('count')).toContainHTML('2');
  });
});
```

Then visit http://localhost:3336 to see the preview

<img alt="Preview your jest test in the browser" src="https://user-images.githubusercontent.com/8603085/161393898-7e283e38-6114-4064-9414-a0ce6d52361d.png" width="600" />

## Upcoming features

- Support css-in-js
- Multiple preview (in progress)
- [You name it](https://github.com/nvh95/jest-preview/labels/feature_request)

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

Open chrome at http://localhost:3006 to see the preview

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://hung.dev"><img src="https://avatars.githubusercontent.com/u/8603085?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Hung Viet Nguyen</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=nvh95" title="Code">💻</a> <a href="https://github.com/nvh95/jest-preview/commits?author=nvh95" title="Documentation">📖</a> <a href="#example-nvh95" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/ntt261298"><img src="https://avatars.githubusercontent.com/u/36792554?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Truong Nguyen</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=ntt261298" title="Code">💻</a> <a href="https://github.com/nvh95/jest-preview/commits?author=ntt261298" title="Documentation">📖</a> <a href="#example-ntt261298" title="Examples">💡</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
