process.env.VUE_CLI_BABEL_TARGET_NODE = true;
process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;

module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testURL: 'http://localhost/',
  testEnvironment: 'jest-environment-jsdom-global',
  transformIgnorePatterns: ['/node_modules/(?!babel/runtime)'],
  snapshotSerializers: ['jest-serializer-vue-tjw'],
  setupFilesAfterEnv: ['<rootDir>/tests/unit/setup.js'],
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!**/node_modules/**'
  ],
  testMatch: [
    '**/tests/unit/**/*.test.js'
  ],
  moduleNameMapper: {
    '^@@/(.*)$': '<rootDir>/tests/$1',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  // Used by jest-preview
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.css$': 'jest-preview/transforms/css',
    '^(?!.*\\.(js|css|json|vue)$)': 'jest-preview/transforms/file'
  }
};
