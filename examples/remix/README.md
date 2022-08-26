# Remix

This example demonstrates how to use `jest-preview` with [`Remix`](https://remix.run/), bootstrapped using [`create-remix`](https://remix.run/docs/en/v1#getting-started) (without using any built-in templates/stacks).

🚧 This example only demonstrates the simplest use of CSS in a Remix app (global stylesheet). Remix supports [many different ways of styling](https://remix.run/docs/en/v1/guides/styling). Example of more complex ways to style is coming.

You can see the full example at <https://github.com/nvh95/jest-preview/tree/main/examples/remix>

## Install Jest

<!-- TODO: Add Son's Setup Jest blog post here -->

You have to manually install Jest in your Remix app.

First, install `jest` itself. If you are using `jest` version 28 or later, you must install `jest-environment-jsdom` too ([reference](https://jestjs.io/docs/upgrading-to-jest28#jsdom)).

```bash
npm install --save-dev jest jest-environment-jsdom
```

Install [SWC](https://swc.rs)

```bash
npm install --save-dev @swc/core @swc/jest
```

Config [SWC](https://swc.rs) inside `.swcrc`

```js
{
  "jsc": {
    "target": "es2017",
    "parser": {
      "syntax": "typescript",
      "tsx": true,
      "decorators": false,
      "dynamicImport": false
    },
    "transform": {
      "react": {
        "pragma": "React.createElement",
        "pragmaFrag": "React.Fragment",
        "throwIfNamespace": true,
        "development": false,
        "useBuiltins": false,
        "runtime": "automatic"
      },
      "hidden": {
        "jest": true
      }
    }
  },
  "module": {
    "type": "commonjs",
    "strict": false,
    "strictMode": true,
    "lazy": false,
    "noInterop": false
  }
}
```

Next, install your favorite testing libraries. This example uses `react-testing-library`, at version 12 specifically ([version 13 wouldn't work](https://stackoverflow.com/questions/71713405/cannot-find-module-react-dom-client-from-node-modules-testing-library-react)). Optionally, you can install its companion [`jest-dom`](https://testing-library.com/docs/ecosystem-jest-dom/) package to add some useful matchers to Jest.

```bash
npm install --save-dev @testing-library/react@12 @testing-library/jest-dom
```

## Install & configure Jest Preview

Install Jest Preview

```bash
npm install --save-dev jest-preview
```

Enable Jest Preview inside `jest.config.js`. The config options are largely up to you, but remember to remove/add the highlighted options as followed so Jest Preview could work properly.

```js
module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  moduleNameMapper: {
    // Handle absolute imports in Remix
    '~/(.*)': '<rootDir>/app/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.cache/',
    '<rootDir>/build/',
  ],
  testEnvironment: 'jsdom',
  transform: {
    // Use @swc/jest to transpile tests
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': '@swc/jest',
    '^.+\\.(css|scss|sass|less)$': 'jest-preview/transforms/css',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)':
      'jest-preview/transforms/file',
  },
  transformIgnorePatterns: ['/node_modules/'],
};
```

Configure Jest Preview inside `jest.setup.js` (or any setup files specified in your `setupFilesAfterEnv` config), so Jest Preview knows which global CSS file to load. You can even set `autoPreview` to `true` so your failed test gets a preview automatically! 🤯

```js
import { jestPreviewConfigure } from 'jest-preview';
import './app/styles/global.css';

jestPreviewConfigure({
  // Enable autoPreview so Jest Preview runs automatically
  // whenever your test fails, without you having to do anything!
  autoPreview: true,
});
```

## Done

That's it! Now you can use Jest Preview in your test. Say we have `app/__tests__/index.test.tsx` as follow...

```tsx
import { render, screen } from '@testing-library/react';
import { debug } from 'jest-preview';
import Index from '../routes/index';
import '@testing-library/jest-dom'; // So we can use toBeInTheDocument assertion

it('should show welcome message', () => {
  render(<Index />);

  debug(); // Remove this line if you have enabled autoPreview in jest.setup.js

  expect(
    screen.getByRole('heading', { name: /welcome to remix/i }),
  ).toBeInTheDocument();
});
```

...and an `app/styles/global.css` like this:

```css
html {
  max-width: 38rem;
  padding: 2rem;
  margin: auto;
  line-height: 1.5rem;
  font-size: 24px;
}
```

To run this test with Jest Preview, you must keep the `jest-preview` server running in parallel. See the result at `http://locahost:3336`.

```bash
./node_modules/.bin/jest-preview

./node_modules/.bin/jest --watch
```

You might as well add some NPM scripts for convenience:

```diff
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
+ "test": "jest --watch",
+ "jest-preview": "jest-preview"
},
```

```bash
npm run jest-preview

npm run test
```

You may even install `npm-run-all` to simplify this further:

```bash
npm install --save-dev npm-run-all
```

```diff
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "jest --watch",
  "jest-preview": "jest-preview",
+ "test:preview": "npm-run-all -p test jest-preview"
},
```

```bash
npm run test:preview
```
