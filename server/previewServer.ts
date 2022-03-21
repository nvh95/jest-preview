const express = require("express");
const app = express();
const port = 3006;

const { readFileSync } = require("fs");

app.get("/", (req, res) => {
  const html = readFileSync(
    "./node_modules/.cache/jest-preview-dom/index.html",
    "utf8"
  );
  console.log(html);
  const css = readFileSync(
    "./node_modules/.cache/jest-preview-dom/App.css",
    "utf8"
  );
  console.log(css);
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
