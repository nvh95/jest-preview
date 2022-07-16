import fs from 'fs';
import path from 'path';
import { CACHE_FOLDER, INDEX_FILE_NAME } from './constants';

export function debug(): void {
  if (!fs.existsSync(CACHE_FOLDER)) {
    fs.mkdirSync(CACHE_FOLDER, {
      recursive: true,
    });
  }

  const indexFileName = fs.readFileSync(
    path.join(CACHE_FOLDER, INDEX_FILE_NAME),
    'utf-8',
  );
  fs.writeFileSync(
    path.join(CACHE_FOLDER, indexFileName),
    document.documentElement.outerHTML,
  );
}
