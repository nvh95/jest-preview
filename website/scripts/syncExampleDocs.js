const fs = require('fs');
const path = require('path');

const rootExamples = '../../examples';
const webDocs = '../docs/examples';

fs.readdir(path.join(__dirname, rootExamples), (err, directories) => {
  const onlyDirectories = directories.filter(dirName => dirName !== '.gitignore');

  onlyDirectories.forEach(async dir => {
    const readmePath = path.join(__dirname, `${rootExamples}/${dir}/README.md`);
    const docsPath = path.join(__dirname, `${webDocs}/${dir}.md`);

    await fs.readFile(readmePath, 'utf-8', (err, data) => {
      const fileWithFixedLinks = data.replaceAll('../../README.md', 'README.md');

      console.log(fileWithFixedLinks);

      fs.writeFile(docsPath, fileWithFixedLinks, 'utf-8', (err, data) => {
        if (err) {
          throw err
        }
      })
    })
  });
});

