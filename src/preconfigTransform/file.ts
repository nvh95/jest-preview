'use strict';

import { processFile, getCacheKey } from '../transform';

function process(src: string, filename: string) {
  return processFile(src, filename);
}
export default { process, getCacheKey };
