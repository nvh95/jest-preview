// We can move this file to globalSetup, globalTeardown
// Reference:
// - https://jestjs.io/docs/puppeteer
// - https://jestjs.io/docs/configuration#globalsetup-string
// No, we can't. Since jest will terminate the express server after test finish running
const express = require("express");
const app = express();
const port = 3006;

const { readFileSync } = require("fs");

app.get("/", (req, res) => {
  const html = readFileSync(
    "./node_modules/.cache/jest-preview-dom/index.html",
    "utf8"
  );
  // console.log(html);
  // TODO1: HIGH PRIORITY: Hard code App.css. We need to find all css file and inject them to html
  // TODO2: How do we preserve the order of importing css file?
  // For now I think it's not very important, but this is the room for improvement in next versions
  // TODO3: not support styled-components. Might refer to jest-styled-components
  // Target for version > 0.0.1
  const css = readFileSync(
    "./node_modules/.cache/jest-preview-dom/App.css",
    "utf8"
  );
  // console.log(css);
  const content = `
  <style>${css}</style>
  ${html}
`;
  // res.sendFile("index.html", { root: __dirname });
  res.send(content);
});

app.use(express.static("./node_modules/.cache/jest-preview-dom"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
