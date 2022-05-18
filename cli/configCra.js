#!/usr/bin/env node
// @ts-check
const path = require('path');
const fs = require('fs');
// Append current node_modules to the module search path, so require('react-scripts') can work.
module.paths.push(path.resolve(process.cwd(), './node_modules'));

// Create `jest.config.js`
// @ts-expect-error This is meant to run where react-scripts is installed
const createJestConfig = require('react-scripts/scripts/utils/createJestConfig.js');
const jestConfig = createJestConfig(
  (/** @type {string} */ filePath) => path.posix.join('<rootDir>', filePath),
  null,
  true,
);
jestConfig.transform = {
  '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$':
    'react-scripts/config/jest/babelTransform.js',
  '^.+\\.(css|scss|sass)$': 'jest-preview/transforms/css',
  '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)':
    'jest-preview/transforms/fileCRA',
};
jestConfig.transformIgnorePatterns = jestConfig.transformIgnorePatterns.filter(
  (/** @type {string} */ pattern) =>
    pattern !== '^.+\\.module\\.(css|sass|scss)$',
);
delete jestConfig.moduleNameMapper['^.+\\.module\\.(css|sass|scss)$'];
const jestConfigFileContent = `module.exports = ${JSON.stringify(
  jestConfig,
  null,
  2,
)}\n`;
fs.writeFileSync('jest.config.js', jestConfigFileContent);
console.log(`Added jest.config.js to the project.`);

// Try to prettier `jest.config.js`
const execSync = require('child_process').execSync;
try {
  execSync('prettier jest.config.js --write');
} catch (error) {
  // Just ignore if user doesn't have prettier installed
}

// Create `scripts/test.js`
// https://github.com/facebook/create-react-app/blob/f99167c014a728ec856bda14f87181d90b050813/packages/react-scripts/scripts/eject.js#L158-L162

const testFile = path.resolve(
  process.cwd(),
  './node_modules/react-scripts/scripts/test.js',
);
let content = fs.readFileSync(testFile, 'utf8');

content =
  content
    // Remove dead code from .js files on eject
    .replace(
      /\/\/ @remove-on-eject-begin([\s\S]*?)\/\/ @remove-on-eject-end/gm,
      '',
    )
    // Require `env` direct from `react-scripts`
    .replace(
      `require('../config/env');`,
      `require('react-scripts/config/env');`,
    )
    .trim() + '\n';
console.log(`Added scripts/test.js to the project.`);
fs.writeFileSync(path.resolve(process.cwd(), 'scripts/test.js'), content);
