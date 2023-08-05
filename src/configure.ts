import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { CACHE_FOLDER, SASS_LOAD_PATHS_CONFIG, SASS_SHARED_RESOURCES_CONCAT } from './constants';
import { createCacheFolderIfNeeded } from './utils';
import { debug } from './preview';

interface JestPreviewConfigOptions {
  /**
   * @deprecated externalCss should not be used and will be removed in 0.4.0. Import the css files directly instead. Read more at www.jest-preview.com/blog/deprecate-externalCss
   */
  externalCss?: string[];
  autoPreview?: boolean;
  publicFolder?: string;
  sassLoadPaths?: string[];
  sharedSassResources?: string[];
}

export function jestPreviewConfigure(
  {
    externalCss,
    autoPreview = false,
    publicFolder,
    sassLoadPaths,
    sharedSassResources,
  }: JestPreviewConfigOptions = {
    autoPreview: false,
    sassLoadPaths: [],
  },
) {
  if (autoPreview) {
    autoRunPreview();
  }

  if (!fs.existsSync(CACHE_FOLDER)) {
    fs.mkdirSync(CACHE_FOLDER, {
      recursive: true,
    });
  }

  let sassLoadPathsConfig: string[] = [];
  // Save sassLoadPathsConfig to cache, so we can use it in the transformer
  if (sassLoadPaths) {
    sassLoadPathsConfig = sassLoadPaths.map(
      (path) => `${process.cwd()}/${path}`,
    );

    createCacheFolderIfNeeded();

    fs.writeFileSync(
      path.join(CACHE_FOLDER, SASS_LOAD_PATHS_CONFIG),
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
    createCacheFolderIfNeeded();
    fs.writeFileSync(
      path.join(CACHE_FOLDER, 'cache-public.config'),
      publicFolder,
      {
        encoding: 'utf-8',
        flag: 'w',
      },
    );
  }

  if (sharedSassResources && sharedSassResources.length > 0) {
    createCacheFolderIfNeeded();

    const resourceFileContents = sharedSassResources.map((sassResourceFile) => {
      const filenameComment = `// ${sassResourceFile}`;
      const fileContents = fs.readFileSync(sassResourceFile, "utf-8");

      return `${filenameComment}\n${fileContents}`;
    });

    const resourceFileContentsConcat = resourceFileContents.join('\n\n');

    fs.writeFileSync(
      path.join(CACHE_FOLDER, SASS_SHARED_RESOURCES_CONCAT),
      resourceFileContentsConcat,
    );
  }
}

// Omit only, skip, todo, concurrent, each. Couldn't use Omit. Just redeclare for simplicity
type RawIt = (...args: Parameters<jest.It>) => ReturnType<jest.It>;

function patchJestFunction(it: RawIt) {
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
          debug();
          throw error;
        }
      };
    }
    return originalIt(name, callbackWithPreview, timeout);
  };
  return itWithPreview;
}

function autoRunPreview() {
  const originalIt = it;
  let itWithPreview = patchJestFunction(it) as jest.It;
  itWithPreview.each = originalIt.each;
  itWithPreview.only = patchJestFunction(originalIt.only) as jest.It;
  itWithPreview.skip = originalIt.skip;
  itWithPreview.todo = originalIt.todo;
  itWithPreview.concurrent = patchJestFunction(
    originalIt.concurrent,
  ) as jest.It;

  // Overwrite global it/ test
  // Is there any use cases that `it` and `test` is undefined?
  it = itWithPreview;
  test = itWithPreview;
  fit = itWithPreview.only;
}
