import { render, screen } from "@testing-library/react";
import ComponentWrapper from "../utils/ComponentWrapper";
import "@testing-library/jest-dom/vitest";
import Login from "../../src/pages/Login";

describe("Login", () => {
  it("should rener heading", () => {
    render(<ComponentWrapper component={<Login />} />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/log in/i);
  });

  it("should rener login button", () => {
    render(<ComponentWrapper component={<Login />} />);

    const loginBtn = screen.getByRole("button", { name: "Login" });
    expect(loginBtn).toBeInTheDocument();
  });

  it("should submit form when login is clicked", async () => {});
});
