import path from 'path';
import fs from 'fs';
import { CACHE_FOLDER, SASS_LOAD_PATHS_CONFIG } from './constants';

interface JestPreviewConfigOptions {
  externalCss: string[];
  sassLoadPaths: string[];
  publicFolder?: string;
}

export async function jestPreviewConfigure(
  options: JestPreviewConfigOptions = { externalCss: [], sassLoadPaths: [] },
) {
  if (!fs.existsSync('./node_modules/.cache/jest-preview-dom')) {
    fs.mkdirSync('./node_modules/.cache/jest-preview-dom', {
      recursive: true,
    });
  }

  options.externalCss?.forEach((cssFile) => {
    const basename = path.basename(cssFile);

    // Avoid name collision
    // Add `global` to let `jest-preview` server that we want to cache those files
    const destinationBasename = `cache-${basename}`;
    const destinationFile = path.join(CACHE_FOLDER, destinationBasename);

    // If sass file is passed, we need to transform it to css
    if (cssFile.endsWith('.scss') || cssFile.endsWith('.sass')) {
      const sass = require('sass');

      // Create cache folder if it doesn't exist
      if (!fs.existsSync(CACHE_FOLDER)) {
        fs.mkdirSync(CACHE_FOLDER, {
          recursive: true,
        });
      }

      let sassLoadPaths: string[] = [];
      // Save sassLoadPaths to cache, so we can use it in the transformer
      if (options.sassLoadPaths) {
        sassLoadPaths = options.sassLoadPaths.map(
          (path) => `${process.cwd()}/${path}`,
        );

        fs.writeFileSync(
          path.join(CACHE_FOLDER, SASS_LOAD_PATHS_CONFIG),
          JSON.stringify(sassLoadPaths),
        );
      }
      const sassFile = fs.readFileSync(cssFile, 'utf8');
      // Transform sass to css
      const cssFileFullPath = path.join(process.cwd(), cssFile);
      console.log('cssFileFullPath', cssFileFullPath);
      // TODO: Jest hang there, output
      // TypeError: Cannot read property '_location' of null
      // at Window.get location [as location] (node_modules/jsdom/lib/jsdom/browser/Window.js:375:79)
      // I suspect there is something different regarding environment in `configure.ts` and `transform.ts`
      const cssResult = sass.compile(cssFileFullPath, {
        // loadPaths: sassLoadPaths,
      }).css;
      console.log('cssResult', cssResult);
      const cssDestinationFile = destinationFile.replace(
        /\.(scss|sass)$/,
        '.css',
      );
      fs.writeFileSync(cssDestinationFile, cssResult);
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
    if (!fs.existsSync(CACHE_FOLDER)) {
      fs.mkdirSync(CACHE_FOLDER, {
        recursive: true,
      });
    }
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
