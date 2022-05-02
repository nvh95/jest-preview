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
[![All Contributors](https://img.shields.io/badge/all_contributors-9-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- prettier-ignore-end -->

[![npm](https://img.shields.io/npm/v/jest-preview)](https://www.npmjs.com/package/jest-preview)
[![npm](https://img.shields.io/npm/dt/jest-preview)](https://www.npmjs.com/package/jest-preview)

![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)
[![Discord](https://img.shields.io/discord/967456149735637002?logo=discord&logoColor=ffffff&style=flat-square)](https://discord.gg/X5PyPUfemh)

## Why **jest-preview**

When writing tests using Jest, we usually debug by reading the HTML code. Sometimes, the HTML is too complicated to visualize the UI in our head. `jest-preview` initiates a server and serve your HTML in a browser, then you can see your actual UI visually, which helps you debug jest tests faster.

`jest-preview` is initially designed to work with [jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/). The package is framework-agnostic, and you can use it with any testing libraries.

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

- Use with [Vite](https://vitejs.dev/): [Example with Vite](https://www.jest-preview.com/docs/examples/vite-react)
- Use with [Create React App](https://create-react-app.dev/): [Example with CRA](https://www.jest-preview.com/docs/examples/create-react-app)
- Use with [NextJs Rust Compiler](https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler): [Example with NextJs Rust Compiler](https://www.jest-preview.com/docs/examples/next-rust)
- Use with [NextJS Babel](https://nextjs.org/docs/testing#setting-up-jest-with-babel): [Example with CRA](https://www.jest-preview.com/docs/examples/next-babel)

## Installation

See the [Installation Guide](https://www.jest-preview.com/docs/getting-started/installation) on Jest Preview official website.

## Usage

See the [Usage Guide](https://www.jest-preview.com/docs/getting-started/usage) on Jest Preview official website.

## Advanced configurations

Jest Preview comes with [Pre-configured transformation](https://www.jest-preview.com/docs/getting-started/installation#2-configure-jests-transform-to-transform-css-and-files). However, in more advanced use cases where you have custom code transformation, check out the [Code Transformation Guide](https://www.jest-preview.com/docs/advanced-guides/code-transform).

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
  <tr>
    <td align="center"><a href="https://github.com/minhmo1620"><img src="https://avatars.githubusercontent.com/u/44143370?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Minh Nguyen </b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=minhmo1620" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/tinhvqbk"><img src="https://avatars.githubusercontent.com/u/26925018?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kyle(Tình Vũ)</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/issues?q=author%3Atinhvqbk" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

![This is open source software](https://user-images.githubusercontent.com/8603085/161439058-98faea42-c6e6-46f4-9ce6-218fad5f3b9a.gif)

MIT
