import type { Config } from '@jest/types';

export async function configureNextJestPreview(
  createFinalJestConfig: () => Promise<Config.InitialOptions>,
) {
  const config = await createFinalJestConfig();

  // Use transforms from `jest-preview`
  if (config.transform) {
    config.transform['^.+\\.(css|scss|sass)$'] = 'jest-preview/transforms/css';
    config.transform['^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)'] = 'jest-preview/transforms/file';
  }
  // Don't ignore Module CSS/Sass/SCSS
  if (config.transformIgnorePatterns) {
    config.transformIgnorePatterns = config.transformIgnorePatterns.filter(
      (pattern) => pattern !== '^.+\\.module\\.(css|sass|scss)$',
    );
  }
  // Don't mock Module CSS/Sass/SCSS, normal CSS/Sass/SCSS, or images
  if (config.moduleNameMapper) {
    delete config.moduleNameMapper['^.+\\.module\\.(css|sass|scss)$'];
    delete config.moduleNameMapper['^.+\\.(css|sass|scss)$'];
    delete config.moduleNameMapper[
      '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$'
    ];
  }

  return config;
}
