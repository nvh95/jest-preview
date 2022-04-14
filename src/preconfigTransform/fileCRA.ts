'use strict';

import { processFileCRA } from '../transform';

function process(src: string, filename: string) {
  return processFileCRA(src, filename);
}
export default { process };
