import { prettyDOM, render, screen } from "@testing-library/react";
import App from "../App";
import { writeFileSync } from "fs";
describe("App", () => {
  it("should work as expected", () => {
    const { container } = render(<App />);
    console.log(
      prettyDOM(container, 100, {
        escapeString: false,
        highlight: false,
      })
    );
    writeFileSync(
      "./server/index.html",
      prettyDOM(container, 50000, {
        highlight: false,
      }),
      {
        encoding: "utf-8",
      }
    );
    expect(screen.getByText("My favorite fruit is banana")).toBeInTheDocument();
  });
});
