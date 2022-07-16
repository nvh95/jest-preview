import fs from 'fs';
import path from 'path';
import { CACHE_FOLDER, ROOT_HTML_NAME_CONFIG } from './constants';

export function debug(): void {
  if (!fs.existsSync(CACHE_FOLDER)) {
    fs.mkdirSync(CACHE_FOLDER, {
      recursive: true,
    });
  }

  // Get index file name, which is generated when preview server starts
  const indexFileName = fs.readFileSync(
    path.join(CACHE_FOLDER, ROOT_HTML_NAME_CONFIG),
    'utf-8',
  );
  fs.writeFileSync(
    path.join(CACHE_FOLDER, indexFileName),
    document.documentElement.outerHTML,
  );
}
