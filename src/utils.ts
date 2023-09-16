import fs from 'fs';
import { CACHE_FOLDER } from './constants';

// Create cache folder if it doesn't exist
export function createCacheFolderIfNeeded(cacheFolder = CACHE_FOLDER) {
  if (!fs.existsSync(cacheFolder)) {
    fs.mkdirSync(cacheFolder, {
      recursive: true,
    });
  }
}
