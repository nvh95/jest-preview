import { prettyDOM, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import * as fs from "fs";

describe("App", () => {
  it("should work as expected", () => {
    const { container } = render(<App />);
    console.log(
      prettyDOM(container, 100, {
        escapeString: false,
        highlight: false,
      })
    );

    userEvent.click(screen.getByTestId("increase"));
    userEvent.click(screen.getByTestId("increase"));
    userEvent.click(screen.getByTestId("increase"));
    userEvent.click(screen.getByTestId("increase"));
    userEvent.click(screen.getByTestId("increase"));
    userEvent.click(screen.getByTestId("increase"));
    if (!fs.existsSync("./node_modules/.cache/jest-preview-dom")) {
      fs.mkdirSync("./node_modules/.cache/jest-preview-dom", {
        recursive: true,
      });
    }
    fs.writeFileSync(
      "./node_modules/.cache/jest-preview-dom/index.html",
      prettyDOM(container, 50000, {
        highlight: false,
      }),
      {
        encoding: "utf-8",
        flag: "w",
      }
    );
    expect(screen.getByTestId("count")).toContainHTML("6");
  });
});
