import { render, screen } from "@testing-library/react";
import ComponentWrapper from "../utils/ComponentWrapper";
import "@testing-library/jest-dom/vitest";
import Signup from "../../src/pages/Signup";

describe("Signup", () => {
  it("should render heading", () => {
    render(<ComponentWrapper component={<Signup />} />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });

  it("should render signup button", () => {
    render(<ComponentWrapper component={<Signup />} />);

    const signUpBtn = screen.getByRole("button", { name: "Sign up" });
    expect(signUpBtn).toBeInTheDocument();
  });
});
