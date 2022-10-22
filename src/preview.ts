import fs from 'fs';
import path from 'path';
import { CACHE_FOLDER, DELIMITER } from './constants';
import crypto from 'crypto';

// TODO: Add debug() result to /preview folder
// TODO: Add debug() result of failed test in /failed folder
export function debug(): void {
  const { testPath, currentTestName } = expect.getState();
  const testIdentification = [testPath, currentTestName].join(DELIMITER);
  const folderNameHash = crypto
    .createHash('md5')
    .update(testIdentification)
    .digest('hex');

  const folderPath = path.join(CACHE_FOLDER, 'preview', folderNameHash);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, {
      recursive: true,
    });
  }

  // Save each `debug()` to a different folder
  fs.writeFileSync(
    path.join(folderPath, 'index.html'),
    document.documentElement.outerHTML,
  );

  // To retrieve testPath, currentTestName
  fs.writeFileSync(path.join(folderPath, 'info.txt'), testIdentification);

  // Still write current screenshot
  fs.writeFileSync(
    path.join(CACHE_FOLDER, 'index.html'),
    document.documentElement.outerHTML,
  );
}
