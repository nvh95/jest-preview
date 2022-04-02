import { prettyDOM } from "@testing-library/dom";
const fs = require("fs");

export function preview(container: Element): void {
  if (!fs.existsSync("./node_modules/.cache/jest-preview-dom")) {
    fs.mkdirSync("./node_modules/.cache/jest-preview-dom", {
      recursive: true,
    });
  }
  fs.writeFileSync(
    "./node_modules/.cache/jest-preview-dom/index.html",
    prettyDOM(container, 50000, {
      highlight: false,
    }) || "",
    {
      encoding: "utf-8",
      flag: "w",
    }
  );
}
