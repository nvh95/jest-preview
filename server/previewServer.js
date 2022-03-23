// We can move this file to globalSetup, globalTeardown
// Reference:
// - https://jestjs.io/docs/puppeteer
// - https://jestjs.io/docs/configuration#globalsetup-string
// No, we can't. Since jest will terminate the express server after test finish running
// TODO: Is there any simpler solution compare to express? We just need to serve a file
// How vite starts a server? Can we leverage this?
// http-server? http?
const express = require('express');
const app = express();
const port = process.env.PORT || 3336;

const path = require('path');
const fs = require('fs');

app.get('/', (req, res) => {
  const HTML_PATH = './node_modules/.cache/jest-preview-dom/index.html';
  if (!fs.existsSync(HTML_PATH)) {
    // Make it looks nice
    return res.send(`
    No preview found.<br/>
    Please run: <br /> <br />
    <code>
    const { container } = render(<App />);<br/>
    preview(container);
    </code>
    <br /><br />
    then revisit this page.
    `);
  }
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  // console.log(html);
  // TODO2: How do we preserve the order of importing css file?
  // For now I think it's not very important, but this is the room for improvement in next versions
  // TODO3: not support styled-components. Might refer to jest-styled-components
  // Target for version > 0.0.1
  let css = '';
  const allFiles = fs.readdirSync('./node_modules/.cache/jest-preview-dom');
  allFiles.forEach((file) => {
    if (file.endsWith('.css')) {
      css += `\n<style>${fs.readFileSync(
        `./node_modules/.cache/jest-preview-dom/${path.basename(file)}`,
        'utf8',
      )}</style>`;
    }
  });
  // console.log(css);
  const content = `
    ${css}
    ${html}
  `;
  // res.sendFile("index.html", { root: __dirname });
  res.send(content);
});

app.use(express.static('./node_modules/.cache/jest-preview-dom'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
