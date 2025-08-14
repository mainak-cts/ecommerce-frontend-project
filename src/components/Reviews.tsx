import type { ReviewType } from "../shared/types/product";
import Review from "./Review";

export default function Reviews({ reviews }: { reviews: ReviewType[] }) {
  return (
    <>
      <h1 className="text-2xl font-bold mb-2 mt-2">Reviews</h1>
      {reviews.map((review, id) => {
        return (
          <Review
            key={id}
            comment={review.comment}
            rating={review.rating}
            date={review.date}
            reviewerEmail={review.reviewerEmail}
            reviewerName={review.reviewerName}
          />
        );
      })}
    </>
  );
}
