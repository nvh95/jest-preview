module.exports = {
  roots: ['<rootDir>/demo'],
  collectCoverageFrom: [
    'demo/**/*.{js,jsx,ts,tsx}',
    '!demo/**/*.d.ts',
    '!demo/mocks/**',
  ],
  coveragePathIgnorePatterns: [],
  setupFilesAfterEnv: ['./config/jest/setupTests.js'],
  testEnvironment: 'jsdom',
  modulePaths: ['<rootDir>/demo'],
  transform: {
    '^.+\\.(ts|js|tsx|jsx)$': '@swc/jest',
    '^.+(?!\\.module)\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^.+\\.module\\.(css|sass|scss)$':
      '<rootDir>/config/jest/cssModulesTransform.js',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|json)$)':
      '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    // "^.+\\.module\\.(css|sass|scss)$",
  ],
  modulePaths: ['<rootDir>/demo'],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    // '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
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
