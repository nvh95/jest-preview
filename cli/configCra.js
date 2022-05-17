#!/usr/bin/env node
// TODO: To revamp the CLI name (currently: config-cra. A proposal: `jest-preview config-cra`)
const path = require('path');
const fs = require('fs');
// Append current node_modules to the module search path, so require('react-scripts') can work.
module.paths.push(path.resolve(process.cwd(), './node_modules'));

const createJestConfig = require('react-scripts/scripts/utils/createJestConfig.js');
const jestConfig = createJestConfig(
  (filePath) => path.posix.join('<rootDir>', filePath),
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
  (pattern) => pattern !== '^.+\\.module\\.(css|sass|scss)$',
);
delete jestConfig.moduleNameMapper['^.+\\.module\\.(css|sass|scss)$'];
const jestConfigFileContent = `module.exports = ${JSON.stringify(
  jestConfig,
  null,
  2,
)}\n`;
fs.writeFileSync('jest.config.js', jestConfigFileContent);

// Try to prettier `jest.config.js`
const execSync = require('child_process').execSync;
try {
  execSync('prettier jest.config.js --write');
} catch (error) {
  // Just ignore if user doesn't have prettier installed
}
