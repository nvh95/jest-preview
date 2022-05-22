#!/usr/bin/env node
// @ts-check
const path = require('path');
const fs = require('fs');
// Append current node_modules to the module search path, so require('react-scripts') can work.
module.paths.push(path.resolve(process.cwd(), './node_modules'));

// 1. Create `jest.config.js`
try {
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
  jestConfig.transformIgnorePatterns =
    jestConfig.transformIgnorePatterns.filter(
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
} catch (error) {
  console.error(error);
}

// 2. Create `scripts/test.js`
// https://github.com/facebook/create-react-app/blob/f99167c014a728ec856bda14f87181d90b050813/packages/react-scripts/scripts/eject.js#L158-L162

try {
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
  if (!fs.existsSync('scripts')) {
    fs.mkdirSync('scripts');
  }
  fs.writeFileSync(path.resolve(process.cwd(), 'scripts/test.js'), content);

  // 3. Update `package.json`
  const packageJson = require(path.resolve(process.cwd(), 'package.json'));
  packageJson.scripts.test = 'node scripts/test.js';
  if (!packageJson.scripts['jest-preview']) {
    packageJson.scripts['jest-preview'] = 'jest-preview';
  }
  fs.writeFileSync(
    path.resolve(process.cwd(), 'package.json'),
    JSON.stringify(packageJson, null, 2) + '\n',
  );
  console.log(`Update test script in package.json.`);
} catch (error) {
  console.error(error);
}

// 4. Configure Jest Preview using jestPreviewConfigure in `src/setupTests.ts` or `src/setupTests.js`
/**
 * @param {string} filePath
 * @param {string} content
 */
function injectToFileIfExisted(filePath, content) {
  if (fs.existsSync(filePath)) {
    fs.appendFileSync(filePath, content);
  }
}

try {
  const configToInject = `import { jestPreviewConfigure } from 'jest-preview'

jestPreviewConfigure({
  // Opt-in to automatic mode to preview failed test case.
  autoPreview: true,
  // TODO: To add your global css here
  externalCss: ['src/index.css'],
})
`;
  injectToFileIfExisted(
    path.resolve(process.cwd(), 'src/setupTests.ts'),
    configToInject,
  );
  injectToFileIfExisted(
    path.resolve(process.cwd(), 'src/setupTests.js'),
    configToInject,
  );
  console.log(`Configured Jest Preview in src/setupTests.(ts|js).`);
} catch (error) {
  console.error(error);
}

console.log(
  '\nTo continue, run `npm run jest-preview` to open Jest Preview server, then `npm run test` to run Jest. It will preview any failed test in your browser.',
);
