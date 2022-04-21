import type { Config } from '@jest/types';

export async function enableJestPreview(
  createFinalJestConfig: () => Promise<Config.InitialOptions>,
) {
  const config = await createFinalJestConfig();

  if (config.transformIgnorePatterns) {
    config.transformIgnorePatterns = config.transformIgnorePatterns.filter(
      (pattern) => pattern !== '^.+\\.module\\.(css|sass|scss)$',
    );
  }
  if (config.moduleNameMapper) {
    delete config.moduleNameMapper['^.+\\.module\\.(css|sass|scss)$'];
    delete config.moduleNameMapper['^.+\\.(css|sass|scss)$'];
    delete config.moduleNameMapper[
      '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$'
    ];
  }

  return config;
}
