# Use with create-react-app

This example demonstrates how to use `jest-preview` with `create-react-app`.

## Setup jest with create-react-app

jest is setup with create-react-app by default, we don't need to do anything more

## Installation and Usage

Please refer to [Installation](../../README.md#installation) and [Usage](../../README.md#installation).
Except for step 2 of installation: **Configure jest's transform to transform CSS and files**

- Because `create-react-app` allows user to [use svg files as React components](https://create-react-app.dev/docs/adding-images-fonts-and-files/#adding-svgs), `jest-preview` therefore needs to support that, we update Jest's configuration in `package.json` as follow:

```json
{
  "transform": {
    // Other transforms
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "jest-preview/transforms/fileCRA"
  }
}
```

## Caveats

Even though `jest-preview` itself supports CSS Modules, it doesn't support `create-react-app` without ejecting yet. The support will land in the next version.
