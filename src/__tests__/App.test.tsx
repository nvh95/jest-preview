import { prettyDOM, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { writeFileSync } from "fs";
import App from "../App";

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
