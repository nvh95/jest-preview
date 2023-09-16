import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { CACHE_FOLDER, SASS_LOAD_PATHS_CONFIG } from './constants';
import { createCacheFolder } from './utils';
import { debug } from './preview';

interface JestPreviewConfigOptions {
  /**
   * @deprecated externalCss should not be used and will be removed in 0.4.0. Import the css files directly instead. Read more at www.jest-preview.com/blog/deprecate-externalCss
   */
  externalCss?: string[];
  autoPreview?: boolean;
  publicFolder?: string;
  sassLoadPaths?: string[];
  cacheFolder?: string;
}

export function jestPreviewConfigure(
  {
    externalCss,
    autoPreview = false,
    publicFolder,
    sassLoadPaths,
    cacheFolder = CACHE_FOLDER,
  }: JestPreviewConfigOptions = {
    autoPreview: false,
    sassLoadPaths: [],
  },
) {
  if (autoPreview) {
    autoRunPreview({ cacheFolder });
  }

  createCacheFolder(cacheFolder);

  let sassLoadPathsConfig: string[] = [];
  // Save sassLoadPathsConfig to cache, so we can use it in the transformer
  if (sassLoadPaths) {
    sassLoadPathsConfig = sassLoadPaths.map(
      (path) => `${process.cwd()}/${path}`,
    );

    createCacheFolder(cacheFolder);

    fs.writeFileSync(
      path.join(cacheFolder, SASS_LOAD_PATHS_CONFIG),
      JSON.stringify(sassLoadPathsConfig),
    );
  }

  externalCss?.forEach((cssFile) => {
    console.log(
      chalk.red(
        'externalCss is deprecated and has no effects.\n',
        'Please import css files directly in your setup file.\n',
        'See the migration guide at www.jest-preview.com/blog/deprecate-externalCss',
      ),
    );
  });

  if (publicFolder) {
    createCacheFolder(cacheFolder);
    fs.writeFileSync(
      path.join(cacheFolder, 'cache-public.config'),
      publicFolder,
      {
        encoding: 'utf-8',
        flag: 'w',
      },
    );
  }
}

// Omit only, skip, todo, concurrent, each. Couldn't use Omit. Just redeclare for simplicity
type RawIt = (...args: Parameters<jest.It>) => ReturnType<jest.It>;

interface PatchJestFunctionOptions {
  cacheFolder?: string;
}

function patchJestFunction(
  it: RawIt,
  { cacheFolder }: PatchJestFunctionOptions = {},
) {
  const originalIt = it;
  const itWithPreview: RawIt = (name, callback, timeout) => {
    let callbackWithPreview: jest.ProvidesCallback | undefined;
    if (!callback) {
      callbackWithPreview = undefined;
    } else {
      callbackWithPreview = async function (
        ...args: Parameters<jest.ProvidesCallback>
      ) {
        try {
          // @ts-expect-error Just forward the args
          return await callback(...args);
        } catch (error) {
          debug({ cacheFolder });
          throw error;
        }
      };
    }
    return originalIt(name, callbackWithPreview, timeout);
  };
  return itWithPreview;
}

interface AutoRunPreviewOptions {
  cacheFolder?: string;
}

function autoRunPreview({ cacheFolder }: AutoRunPreviewOptions = {}) {
  const originalIt = it;
  const itWithPreview = patchJestFunction(it, { cacheFolder }) as jest.It;
  itWithPreview.each = originalIt.each;
  itWithPreview.only = patchJestFunction(originalIt.only, {
    cacheFolder,
  }) as jest.It;
  itWithPreview.skip = originalIt.skip;
  itWithPreview.todo = originalIt.todo;
  itWithPreview.concurrent = patchJestFunction(originalIt.concurrent, {
    cacheFolder,
  }) as jest.It;

  // Overwrite global it/ test
  // Is there any use cases that `it` and `test` is undefined?
  it = itWithPreview;
  test = itWithPreview;
  fit = itWithPreview.only;
}
