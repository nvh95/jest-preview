// @ts-check
const fs = require('fs');
const path = require('path');

const rootExamples = path.join(process.cwd(), '../examples');
const webDocs = path.join(process.cwd(), './docs/examples');

const directories = fs.readdirSync(rootExamples);
const onlyDirectories = directories.filter((dirName) =>
  fs.lstatSync(path.join(rootExamples, dirName)).isDirectory(),
);

onlyDirectories.forEach(async (dir) => {
  const readmePath = `${rootExamples}/${dir}/README.md`;
  const docsPath = `${webDocs}/${dir}.md`;

  if (fs.existsSync(docsPath)) {
    fs.appendFile(
      docsPath,
      fs.readFileSync(readmePath, 'utf8'),
      function (err) {
        if (err) throw err;
        console.log(`Appended to ${docsPath}`);
      },
    );
  }
});
