import { render, screen } from "@testing-library/react";
import { Application } from "./Application";

describe("Application", () => {
  test("renders correctly", () => {});
  render(<Application />);

  const pageHeading = screen.getByRole("heading", {
    name: "Job application form",
    level: 1,
  });
  expect(pageHeading).toBeInTheDocument();

  const sectionHeading = screen.getByRole("heading", {
    name: "Section 1",
    level: 2,
  });
  expect(sectionHeading).toBeInTheDocument();

  const paragraphElement = screen.getByText("All fields are mandatory");
  expect(paragraphElement).toBeInTheDocument();

  const closeElement = screen.getByTitle("close");
  expect(closeElement).toBeInTheDocument();

  const imageElement = screen.getByAltText("A person with a laptop");
  expect(imageElement).toBeInTheDocument();

  const customElement = screen.getByTestId("custom-element");
  expect(customElement).toBeInTheDocument();

  // The default role for a text input element is 'textbox'.
  const nameElement = screen.getByRole("textbox", {
    name: "Name",
  });
  expect(nameElement).toBeInTheDocument();

  const nameElement2 = screen.getByLabelText("Name", {
    // We can use the selector to define the type of the element we're looking for, in case there are multiple tags with the same label.
    selector: "input",
  });
  expect(nameElement2).toBeInTheDocument();

  const nameElement3 = screen.getByPlaceholderText("Fullname");
  expect(nameElement3).toBeInTheDocument();

  const nameElement4 = screen.getByDisplayValue("Vishwas");
  expect(nameElement4).toBeInTheDocument();

  const bioElement = screen.getByRole("textbox", {
    name: "Bio",
  });
  expect(bioElement).toBeInTheDocument();

  // The default role for a select element is 'combobox'.
  const jobLocationElement = screen.getByRole("combobox");
  expect(jobLocationElement).toBeInTheDocument();

  const termsElement = screen.getByRole("checkbox");
  expect(termsElement).toBeInTheDocument();

  const termsElement2 = screen.getByLabelText(
    "I agree to the terms and conditions"
  );
  expect(termsElement2).toBeInTheDocument();

  const submitButtonElement = screen.getByRole("button");
  expect(submitButtonElement).toBeInTheDocument();
});
