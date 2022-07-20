---
sidebar_position: 2
---

# Create React App

## Integrating Jest Preview to Create React App

This example demonstrates how to use `jest-preview` with `create-react-app`. See the full source code at [Create React App Example on GitHub](https://github.com/nvh95/jest-preview/tree/main/examples/create-react-app)

## Setup jest with create-react-app

`jest` is setup with create-react-app by default, we don't need to do anything more

## Installation and Usage

Please refer to [Installation](/docs/getting-started/installation) and [Usage](/docs/getting-started/usage).
Except for step 2 and 3 of installation: **Configure jest's transform to transform CSS and files** and **If you use CSS Modules, make sure it doesn't get ignored**, you just need to run

```bash
npx jest-preview config-cra
```

or

```bash
./node_modules/.bin/jest-preview config-cra
```

## Reference

- [First class support for Create React App](/blog/first-class-support-cra)
