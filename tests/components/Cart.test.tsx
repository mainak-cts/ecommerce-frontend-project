import { render, screen } from "@testing-library/react";
import ComponentWrapper from "../utils/ComponentWrapper";
import "@testing-library/jest-dom/vitest";
import Cart from "../../src/pages/Cart";

describe("Cart", () => {
  it("should render heading", () => {
    render(<ComponentWrapper component={<Cart />} />);

    const heading = screen.getByRole("heading", { name: "Cart" });
    expect(heading).toBeInTheDocument();
  });
});
