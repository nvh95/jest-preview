---
sidebar_position: 1
description: When writing tests using Jest, we usually debug by reading the HTML code. Sometimes the HTML is too complicated, Jest Preview help you to "see" your tests in a browser.
---

# Introduction

## Welcome to Jest Preview

Jest Preview is an open source project to provide developer the ability to view and debug their tests live with the Browser preview feature. It's incredibly simple to install and use!

You can go straight to [Installation](https://www.jest-preview.com/docs/getting-started/installation) guide or check [Why Jest Preview](https://www.jest-preview.com/docs/getting-started/why-jest-preview) to see the benefits of using our library. 

👇 continue reading to know more and try Jest Preview in action

## Features

- 👀 Preview your actual app's HTML in a browser in milliseconds.
- 🔄 Auto reload browser when execute `preview.debug()`.
- 💅 Support CSS:
  - ✅ [Direct CSS import](#3-configure-jests-transform-to-intercept-css-and-files)
  - ✅ Number of CSS-in-JS libraries, such as:
    - ✅ [Styled-components](https://styled-components.com/)
    - ✅ [Emotion](https://emotion.sh/)
  - ✅ [Global CSS](/docs/getting-started/installation#4-optional-configure-global-css)
  - ✅ [CSS Modules](https://github.com/css-modules/css-modules)
  - ✅ [Sass](https://sass-lang.com/)
- 🌄 Support viewing images.
- 🧑‍💻 Our contributors work hard to add more features and provide support ⚙️

:::info
Would like to contribute? Great! We appreciate it a lot! Check our [Contributing](/docs/others/contributing) section 🙏 
:::

## Online Demo

Want to try the library before installing it? We got you covered! Check out [StackBlitz Demo App](https://stackblitz.com/edit/jest-preview?embed=1&file=package.json) or try it right here 😉

<iframe id="iframe" height="600px" width="100%" style={{marginBottom: "24px" }} src="https://stackblitz.com/edit/jest-preview?embed=1&ctl=1"></iframe>

:::tip Framework agnostic

**Jest Preview** is initially designed to work with [jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/). The package is framework-agnostic, and you can use it with **any** testing library.

:::


## How to use Jest Preview with only 2 lines of code

Start the Jest Preview Server by running the CLI command `jest-preview`. 

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
:::tip It's that simple! 😱
:::

