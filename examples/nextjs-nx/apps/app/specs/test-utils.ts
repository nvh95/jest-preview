import preview from "jest-preview";
import {jestPreviewCacheFolder} from "../constants";

export const debug = () => {
  preview.debug({cacheFolder: jestPreviewCacheFolder});
};
