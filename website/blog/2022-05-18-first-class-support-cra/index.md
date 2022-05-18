---
slug: first-class-support-cra
title: First class support for Create React App
authors: [nvh95]
tags: [jest-preview, developer-experience, create-react-app]
# TODO To update
# image: /img/automatic-mode.png
---

CRA is well known for bootstrapping a React App. It hides the complexity of bundling and configuration over `react-scripts`. However, in some scenarios, it's very hard to customize CRA for a specific purpose. Make Jest Preview works seamlessly with CRA is an example. Currently, there is no way to customize CRA's `jest.config.js` file easily. So, Jest Preview bundles a few CLIs to make integrating Jest Preview to CRA easier.

Option 1: Use codemod:

- Run this CLI `jest-preview config-cra`

Option 2: Configure manually

1. Create `jest.config.js`

- Create `jest.config.js` with following content:

<details>
  <summary>Click to expand!</summary>

```js
module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  setupFiles: ['react-app-polyfill/jsdom'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$':
      'react-scripts/config/jest/babelTransform.js',
    '^.+\\.(css|scss|sass)$': 'jest-preview/transforms/css',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)':
      'jest-preview/transforms/fileCRA',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
  ],
  modulePaths: [],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
  },
  moduleFileExtensions: [
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
    'node',
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  resetMocks: true,
};
```

</details>

2. Update test script in `package.json`

```diff
{
  "scripts": {
-    "test": "react-scripts test"
+    "test": "node scripts/test.js"
  }
}
```

3. Create test script

<details>
  <summary>Click to expand!</summary>

```js
'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

// Ensure environment variables are read.
require('react-scripts/config/env');

const jest = require('jest');
const execSync = require('child_process').execSync;
let argv = process.argv.slice(2);

function isInGitRepository() {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

function isInMercurialRepository() {
  try {
    execSync('hg --cwd . root', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

// Watch unless on CI or explicitly running all tests
if (
  !process.env.CI &&
  argv.indexOf('--watchAll') === -1 &&
  argv.indexOf('--watchAll=false') === -1
) {
  // https://github.com/facebook/create-react-app/issues/5210
  const hasSourceControl = isInGitRepository() || isInMercurialRepository();
  argv.push(hasSourceControl ? '--watch' : '--watchAll');
}

jest.run(argv);
```

</details>
