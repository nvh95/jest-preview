const nextJest = require('next/jest');
const { configureNextJestPreview } = require('jest-preview');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

// NOTE: `configureNextJestPreview` accepts the final configuration for Jest.
// Modifying its return value before exporting might break `jest-preview`.
module.exports = configureNextJestPreview(createJestConfig(customJestConfig));
