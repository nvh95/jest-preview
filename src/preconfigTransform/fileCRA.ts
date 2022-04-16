'use strict';

import { processFileCRA, getCacheKey } from '../transform';

function process(src: string, filename: string) {
  return processFileCRA(src, filename);
}
export default { process, getCacheKey };
