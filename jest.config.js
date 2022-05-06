module.exports = {
  roots: ['<rootDir>/demo'],
  collectCoverageFrom: [
    'demo/**/*.{js,jsx,ts,tsx}',
    '!demo/**/*.d.ts',
    '!demo/mocks/**',
    // TODO: To report coverage in `src`. They are compiled to `dist` so it's difficult to report coverage directly
  ],
  coveragePathIgnorePatterns: [],
  setupFilesAfterEnv: ['./config/jest/setupTests.js'],
  testEnvironment: 'jsdom',
  modulePaths: ['<rootDir>/demo'],
  transform: {
    '^.+\\.(ts|js|tsx|jsx)$': '@swc/jest',
    '^.+\\.(css|scss|sass)$': '<rootDir>/transforms/css',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|json)$)': '<rootDir>/transforms/file',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
  ],
  modulePaths: ['<rootDir>/demo'],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
  },
  moduleFileExtensions: [
    // Place tsx and ts to beginning as suggestion from Jest team
    // https://jestjs.io/docs/configuration#modulefileextensions-arraystring
    'tsx',
    'ts',
    'web.js',
    'js',
    'web.ts',
    'web.tsx',
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
