// @ts-check
const path = require('path');
const fs = require('fs');

const DISTRIBUTION_DIRECTORY = path.resolve('./dist');

if (fs.existsSync(DISTRIBUTION_DIRECTORY)) {
  const files = fs.readdirSync(DISTRIBUTION_DIRECTORY);
  files.forEach((file) => {
    if (
      // Only cache tsconfig.types.tsbuildinfo and .d.ts files in non-latest versions
      (process.env.BUILD_TAG !== 'prod' &&
        (file === 'tsconfig.types.tsbuildinfo' || file.endsWith('.d.ts'))) ||
      // Always keep .npmignore
      file === '.npmignore'
    ) {
      // Cache types files
      console.log(`Keeping file: ${file}`);
    } else {
      console.log(`Removing file: ${file}`);
      fs.unlinkSync(path.join(DISTRIBUTION_DIRECTORY, file));
    }
  });
} else {
  console.log('No "dist" folder yet. Do nothing.');
}
