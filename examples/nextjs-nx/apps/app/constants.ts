import {cacheFolder} from "jest-preview";

import {resolve, sep} from "path";

export const jestPreviewCacheFolder = resolve(`${__dirname + `${sep}..`.repeat(4)}${sep}${cacheFolder}`);
