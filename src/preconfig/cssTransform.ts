'use strict';

import { processCss } from '../transform';

export function process(src: string, filename: string) {
  return processCss(src, filename);
}
