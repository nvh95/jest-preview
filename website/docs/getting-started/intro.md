---
sidebar_position: 1
description: When writing tests using Jest, we usually debug by reading the HTML code. Sometimes the HTML is too complicated, Jest Preview help you to "see" your tests in a browser.
---

# Introduction

## Why Jest Preview

When writing tests using Jest, we usually debug by reading the HTML code. Sometimes, the HTML is too complicated to visualize the UI in our head. `jest-preview` initiates a server and serve your HTML in a browser, then you can see your actual UI visually, which helps you debug jest tests faster.

`jest-preview` is initially designed to work with [jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/). The package is framework-agnostic, and you can use it with any testing libraries.

## Online Demo

You can try Jest Preview right on the browser without installing or cloning anything, thanks to [StackBlitz](https://stackblitz.com/):

<p align="center">
  <a href="https://stackblitz.com/edit/jest-preview?file=README.md" title="Try Jest Preview Now">Try Jest Preview Online. No downloads needed!</a>. 
</p>

## What does it look like to use Jest Preview

<p align="center">
  <img align="center" src="https://user-images.githubusercontent.com/8603085/162563155-7e18c9ef-4fe3-45f2-9065-7fcea8ddb18e.gif" alt="Jest Preview Demo" />
</p>

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
