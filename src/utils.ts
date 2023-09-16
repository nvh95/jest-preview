import fs from 'fs';
import { CACHE_FOLDER } from './constants';

export function createCacheFolder(cacheFolder = CACHE_FOLDER) {
  if (!fs.existsSync(cacheFolder)) {
    fs.mkdirSync(cacheFolder, {
      recursive: true,
    });
  }
}
