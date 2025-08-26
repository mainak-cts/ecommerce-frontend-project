import { render, screen } from "@testing-library/react";
import ComponentWrapper from "../utils/ComponentWrapper";
import "@testing-library/jest-dom/vitest";
import CartProduct from "../../src/components/CartProduct";

describe("CartProduct", () => {
  it("should", () => {
    render(<ComponentWrapper component={<CartProduct id="121" index={0} />} />);

    screen.debug();
  });
});
