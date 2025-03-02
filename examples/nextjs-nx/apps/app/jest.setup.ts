import { jestPreviewConfigure } from 'jest-preview';
import {jestPreviewCacheFolder} from "./constants";

jestPreviewConfigure({
  autoPreview: true,
  cacheFolder: jestPreviewCacheFolder,
});
