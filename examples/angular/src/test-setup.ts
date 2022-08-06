import * as fs from "fs";
import "zone.js/plugins/zone-error";

const globalStyles = fs
  .readFileSync("./src/styles.css", {
    encoding: "utf-8",
  })
  .toString();
const styleElement = document.createElement("style");
styleElement.innerHTML = globalStyles;
document.head.appendChild(styleElement);
