import { render, screen } from "@testing-library/react";
import ComponentWrapper from "../utils/ComponentWrapper";
import Review from "../../src/components/Review";

describe("Review", () => {
  it("should render review", () => {
    const date: Date = new Date();
    render(
      <ComponentWrapper
        component={
          <Review
            comment="Nice"
            date={date}
            rating={4}
            reviewerEmail="m@email.com"
            reviewerName="Mainak"
          />
        }
      />
    );

    screen.getByText(/mainak/i);
    screen.getByText(/nice/i);
    screen.getByText(new Date(date).toLocaleString());
    screen.getByText(/m@email.com/i);
    screen.getByText(/rating: 4/i);
  });
});
