// jest.config.js
const nextJest = require('next/jest');

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
  transform: {
    '^.+\\.css$': 'jest-preview/transforms/css',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)':
      'jest-preview/transforms/file',
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = async () => {
  const createFinalJestConfig = createJestConfig(customJestConfig)
  const config = await createFinalJestConfig();

  // `config` should always be an object, but in case it isn't, to avoid
  // any TypeError, a type check is included anyway.
  if (typeof config === 'object') {
    config.transformIgnorePatterns = config.transformIgnorePatterns.filter(pattern => pattern !== '^.+\\.module\\.(css|sass|scss)$');
    delete config.moduleNameMapper['^.+\\.module\\.(css|sass|scss)$'];
    delete config.moduleNameMapper['^.+\\.(css|sass|scss)$'];
    delete config.moduleNameMapper['^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$'];
  }

  return config;
};
