'use strict';

import { processFile } from '../transform';

function process(src: string, filename: string) {
  return processFile(src, filename);
}
export default { process };
