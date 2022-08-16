module.exports =
  /** @type {import('@jest/types').Config.InitialOptions} */
  {
    roots: ['<rootDir>/src'],
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    snapshotSerializers: [
      'jest-preset-angular/build/serializers/no-ng-attributes',
      'jest-preset-angular/build/serializers/ng-snapshot',
      'jest-preset-angular/build/serializers/html-comment',
    ],
    transform: {
      // '^.+\\.(ts|js|html)$': 'jest-preset-angular',
      '^.+\\.(css|scss|sass)$': 'jest-preview/transforms/css',
      '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)':
        'jest-preview/transforms/file',
    },
  };
