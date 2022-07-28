import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import chalk from 'chalk';
import { CACHE_FOLDER, DELIMITER, SASS_LOAD_PATHS_CONFIG } from './constants';
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
}

export function jestPreviewConfigure(
  {
    externalCss,
    autoPreview = false,
    publicFolder,
    sassLoadPaths,
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
    // Avoid name collision
    // Example: src/common/styles.css => cache-src___common___styles.css
    console.log(
      chalk.yellow(
        'externalCss is deprecated. Please import css files directly in your setup file.',
        'See the migration guide at www.jest-preview.com/blog/deprecate-externalCss',
      ),
    );
    const destinationBasename = `cache-${cssFile.replace(/\//g, DELIMITER)}`;
    const destinationFile = path.join(CACHE_FOLDER, destinationBasename);

    createCacheFolderIfNeeded();

    // If sass file is included, we need to transform it to css
    if (cssFile.endsWith('.scss') || cssFile.endsWith('.sass')) {
      const cssDestinationFile = destinationFile.replace(
        /\.(scss|sass)$/,
        '.css',
      );

      const sassLoadPathsCLIConfig = sassLoadPathsConfig.reduce(
        (currentConfig, nextLoadPath) =>
          `${currentConfig} --load-path ${nextLoadPath}`,
        '',
      );

      // Transform sass to css and save to cache folder
      // We use exec instead of sass.compile because running sass.compile in jsdom environment cause unexpected behavior
      // What we encountered is that filename is automatically added `http://localhost` as the prefix
      // Example: style.scss => http://localhost/style.scss
      // As a result, sass.compile cannot find the file
      // TODO: Can we inject css to the `document.head` directly?
      // TODO: Support import ~ for configured scss
      // Currently, we cannot find the option to pass `importer` to sass CLI: https://sass-lang.com/documentation/cli/dart-sass#options
      exec(
        `${path.join(
          process.cwd(),
          'node_modules',
          '.bin',
          'sass',
        )} ${cssFile} ${cssDestinationFile} --no-source-map ${sassLoadPathsCLIConfig}`,
        (err: any) => {
          if (err) {
            console.log(err);
          }
        },
      );
      return;
    }

    // TODO: To move to load file directly instead of cloning them to `.cache`
    // Move together with transform
    // TODO: To cache those files. We cannot cache them by checking if files exists
    // Since content of the files might changes and it won't be copied over
    // Can we send a websocket event to preview server and let server remember location of the files in the memory?
    // That way, we can don't have to copy files to disk
    // Memory is faster than disk anyway!!!!
    // if (!fs.existsSync(destinationFile)) {
    // TODO: Can we inject css to the `document.head` directly?
    fs.copyFile(cssFile, destinationFile, (err: any) => {
      if (err) throw err;
    });
    // }
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
