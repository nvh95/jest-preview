/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testEnvironment: 'jsdom',
  modulePaths: ['<rootDir>/src'],
  transform: {
    '^.+\\.(ts|js|tsx|jsx)$': '@swc/jest',
    '^.+\\.(css|scss|sass)$': 'jest-preview/transforms/css',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)':
      'jest-preview/transforms/file',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
  ],
  modulePaths: ['<rootDir>/src'],
  moduleFileExtensions: ['js'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  resetMocks: true,
};
