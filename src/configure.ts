import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';

import { CACHE_FOLDER } from './constants';
import { createCacheFolderIfNeeded } from './utils';
import { debug } from './preview';

interface JestPreviewConfigOptions {
  externalCss?: string[];
  autoPreview?: boolean;
  publicFolder?: string;
}

export async function jestPreviewConfigure(
  options: JestPreviewConfigOptions = { externalCss: [], autoPreview: true },
) {
  // Always try to auto preview unless user choose not to
  if (options.autoPreview !== false) {
    autoPreview();
  }
  if (!fs.existsSync(CACHE_FOLDER)) {
    fs.mkdirSync(CACHE_FOLDER, {
      recursive: true,
    });
  }

  options.externalCss?.forEach((cssFile) => {
    // Avoid name collision
    // Example: src/common/styles.css => cache-src___common___styles.css
    const delimiter = '___';
    const destinationBasename = `cache-${cssFile.replace(/\//g, delimiter)}`;
    const destinationFile = path.join(CACHE_FOLDER, destinationBasename);

    createCacheFolderIfNeeded();

    // If sass file is included, we need to transform it to css
    if (cssFile.endsWith('.scss') || cssFile.endsWith('.sass')) {
      const cssDestinationFile = destinationFile.replace(
        /\.(scss|sass)$/,
        '.css',
      );

      // Transform sass to css and save to cache folder
      // We use exec instead of sass.compile because running sass.compile in jsdom environment cause unexpected behavior
      // What we encountered is that filename is automatically added `http://localhost` as the prefix
      // Example: style.scss => http://localhost/style.scss
      // As a result, sass.compile cannot find the file
      exec(
        `./node_modules/.bin/sass ${cssFile} ${cssDestinationFile} --no-source-map`,
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
    fs.copyFile(cssFile, destinationFile, (err: any) => {
      if (err) throw err;
    });
    // }
  });

  if (options.publicFolder) {
    createCacheFolderIfNeeded();
    fs.writeFileSync(
      path.join(CACHE_FOLDER, 'cache-public.config'),
      options.publicFolder,
      {
        encoding: 'utf-8',
        flag: 'w',
      },
    );
  }
}

function autoPreview() {
  console.log('hello');
  const originalIt = it;
  const newIt = function (name, callback, timeout) {
    // TODO: Can we type correctly?
    const newCallback: jest.ProvidesCallback = async (...args: any[]) => {
      try {
        console.log('callback');
        // @ts-expect-error: Just need to overwrite `it`
        return callback(...args);
      } catch (error) {
        debug();
        throw error;
      }
    };
    return originalIt(name, newCallback, timeout);
  } as jest.It;
  it = newIt;
  test = newIt;
}
