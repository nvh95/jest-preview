const nextJest = require('next/jest');
const {configureNextJestPreview} = require('jest-preview')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const customConfig = {
  displayName: 'app',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', {presets: ['@nrwl/next/babel']}],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/app',
};

module.exports = configureNextJestPreview(createJestConfig(customConfig))
