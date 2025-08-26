import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import type { ReviewType } from "../../src/shared/types/product";
import ComponentWrapper from "../utils/ComponentWrapper";
import Reviews from "../../src/components/Reviews";

describe("Reviews", () => {
  const mockReviews: ReviewType[] = [
    {
      comment: "Amazing product!",
      rating: 5,
      date: new Date("2025-08-20"),
      reviewerEmail: "john@example.com",
      reviewerName: "John Doe",
    },
    {
      comment: "Not bad.",
      rating: 3,
      date: new Date("2025-08-21"),
      reviewerEmail: "jane@example.com",
      reviewerName: "Jane Smith",
    },
  ];

  it("should render heading when reviews are available", () => {
    render(<ComponentWrapper component={<Reviews reviews={mockReviews} />} />);

    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent(/reviews/i);
  });

  it("should not render heading when reviews are unavilable", () => {
    render(<ComponentWrapper component={<Reviews reviews={[]} />} />);

    const heading = screen.queryByRole("heading", { name: /reviews/i });
    expect(heading).not.toBeInTheDocument();
  });

  it("should render reviews", () => {
    render(<ComponentWrapper component={<Reviews reviews={mockReviews} />} />);

    mockReviews.map((review) => {
      screen.getByText(review.comment);
      screen.getByText(review.reviewerEmail);
      screen.getByText(review.reviewerName);
      screen.getByText(`Rating: ${review.rating} ⭐`);
      screen.getByText(review.date.toLocaleString());
    });
  });
});
