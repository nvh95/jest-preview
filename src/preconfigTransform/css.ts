'use strict';

import { processCss } from '../transform';

function process(src: string, filename: string) {
  return processCss(src, filename);
}
export default { process };
