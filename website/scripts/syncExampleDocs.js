const fs = require('fs');
const path = require('path');

const rootExamples = '../../examples';
const webDocs = '../docs/examples';

fs.readdir(path.join(__dirname, rootExamples), (err, directories) => {
  const onlyDirectories = directories.filter(dirName => dirName !== '.gitignore');

  onlyDirectories.forEach(async dir => {
    const readmePath = path.join(__dirname, `${rootExamples}/${dir}/README.md`);

    await fs.copyFile(readmePath, path.join(__dirname, `${webDocs}/${dir}.md`), (err) => {
      if (err) {
        throw new Error(err);
      }

      console.log(`File ${dir}/README.md saved to Web Docs folder`);
    });
  });
});

