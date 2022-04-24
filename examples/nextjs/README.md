# Use with Next.js (with new Next.js compiler)

This example demonstrates how to use `jest-preview` with `Next.js`, bootstrapped using `create-next-app`.

⚠️ This example is meant for Next.js apps using the new [Next.js compiler](https://nextjs.org/docs/advanced-features/compiler) (also called Rust compiler), available from Next.js 12.0.0 onward. If you use Next.js version 11 or below, or opt out of the Next.js compiler, please see the [nextjs-babel](/examples/nextjs-babel) example.

🚧 Next.js's `<Image />` component isn't working with Jest Preview yet.

## Install Jest

Install Jest and your favorite testing libraries, if you haven't already done so. Refer to [Next.js's official document](https://nextjs.org/docs/testing#jest-and-react-testing-library). This example uses `react-testing-library`.

## Install & configure Jest Preview

Install Jest Preview

```bash
npm install --save-dev jest-preview
```

Enable Jest Preview inside `jest.config.js`. Note that the Jest config object returned by `configureNextJestPreview` shouldn't be modified any further.

```diff
  const nextJest = require('next/jest')
+ const { configureNextJestPreview } = require('jest-preview')

  const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
  })

  // Add any custom config to be passed to Jest
  const customJestConfig = {
    // Add more setup options before each test is run
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
    moduleDirectories: ['node_modules', '<rootDir>/'],
    testEnvironment: 'jest-environment-jsdom',
  }

- // createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
- module.exports = createJestConfig(customJestConfig)
+ // NOTE: `configureNextJestPreview` accepts the final configuration for Jest.
+ // Modifying its return value before exporting might break `jest-preview`.
+ module.exports = configureNextJestPreview(createJestConfig(customJestConfig));
```

Configure Jest Preview inside `jest.setup.js` (or any setup files) specified in your `setupFilesAfterEnv` config, so Jest Preview knows which global CSS file to load.

```js
import { jestPreviewConfigure } from 'jest-preview';

jestPreviewConfigure({
  // An array of relative paths from the root of your project
  externalCss: [
    'styles/globals.css',
    // SCSS is also supported
    // 'demo/globals.scss',
    // Any CSS from node_modules is fine
    // 'node_modules/@your-design-system/css/dist/index.min.css',
  ],
});
```

## Done

That's it! Now you can use Jest Preview in your test. Say we have `__tests__/index.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import preview from 'jest-preview';
import Home from '../pages/index';
import '@testing-library/jest-dom';

it('should show welcome message', () => {
  render(<Home />);

  preview.debug();

  expect(
    screen.getByRole('heading', { name: /welcome to next.js/i }),
  ).toBeInTheDocument();
});
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
