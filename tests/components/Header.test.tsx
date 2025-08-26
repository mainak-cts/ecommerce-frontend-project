import { render, screen } from "@testing-library/react";
import Header from "../../src/components/Header";
import "@testing-library/jest-dom/vitest";
import ComponentWrapper from "../utils/ComponentWrapper";

describe("Header", () => {
  it("should render heading", () => {
    render(<ComponentWrapper component={<Header />} />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/shopease/i);
  });

  it("should render search box", () => {
    render(<ComponentWrapper component={<Header />} />);

    const search = screen.getAllByPlaceholderText("Search products...")[0];
    expect(search).toBeInTheDocument();
  });

  it("should render login button", () => {
    render(<ComponentWrapper component={<Header />} />);

    const login = screen.getAllByRole("link", { name: "Login" })[0];
    expect(login).toBeInTheDocument();
  });
});
