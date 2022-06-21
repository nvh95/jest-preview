module.exports = {
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  transform: {
    '^.+\\.(js|ts)$': 'ts-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.css$': 'jest-preview/transforms/css',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json|vue)$)':
      'jest-preview/transforms/file',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
  ],
  testEnvironment: 'jsdom',
  moduleFileExtensions: [
    'js',
    'tsx',
    'ts',
    'web.js',
    'web.ts',
    'web.tsx',
    'json',
    'web.jsx',
    'jsx',
    'node',
  ],
};
