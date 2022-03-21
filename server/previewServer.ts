const express = require("express");
const app = express();
const port = 3006;

const { readFileSync } = require("fs");

app.get("/", (req, res) => {
  const html = readFileSync("server/index.html", "utf8");
  console.log(html);
  const css = readFileSync("server/App.css", "utf8");
  console.log(css);
  const content = `
  <style>${css}</style>
  ${html}
`;
  // res.sendFile("index.html", { root: __dirname });
  res.send(content);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
