import { render, screen } from "@testing-library/react";
import { Greet } from "./Greet";

describe("Greet", () => {
  test("Greet renders correctly", () => {
    render(<Greet />);
    const textElement = screen.getByText(/Hello/);
    // Assertion
    expect(textElement).toBeInTheDocument();
  });

  test("Greet renders with a name", () => {
    render(<Greet name="Vishwas" />);
    const textElement = screen.getByText("Hello Vishwas");
    // Assertion
    expect(textElement).toBeInTheDocument();
  });
});
