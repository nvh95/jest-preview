module.exports =
  /** @type {import('@jest/types').Config.InitialOptions} */
  {
    roots: ['<rootDir>/src'],
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    transform: {
      '^.+\\.(css|scss|sass)$': 'jest-preview/transforms/css',
      '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)':
        'jest-preview/transforms/file',
    },
  };
