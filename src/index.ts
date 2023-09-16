import { processFile, processFileCRA, processCss } from './transform';
import { debug } from './preview';
import { jestPreviewConfigure } from './configure';
import { configureNextJestPreview } from './next';
import {CACHE_FOLDER} from "./constants";

export const cacheFolder = CACHE_FOLDER;

export {
  jestPreviewConfigure,
  processCss,
  processFile,
  processFileCRA,
  debug,
  configureNextJestPreview,
};

export default {
  debug,
};
