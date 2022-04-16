'use strict';

import { processCss, getCacheKey } from '../transform';

function process(src: string, filename: string) {
  return processCss(src, filename);
}
export default { process, getCacheKey };
