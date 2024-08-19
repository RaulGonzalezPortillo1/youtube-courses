import { render, screen } from "../../test-utils";
import { MuiMode } from "./Mui-mode";

describe("MuiMode", () => {
  test("should render text correctly", () => {
    render(<MuiMode />);
    const headingElement = screen.getByRole("heading");
    expect(headingElement).toHaveTextContent("dark mode");
  });
});
