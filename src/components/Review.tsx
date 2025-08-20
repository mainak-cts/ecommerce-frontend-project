import type { ReviewType } from "../shared/types/product";

export default function Review({
  comment,
  date,
  rating,
  reviewerEmail,
  reviewerName,
}: ReviewType) {
  return (
    <>
      <div className="review w-full bg-white border border-gray-200 shadow rounded-lg p-4 mb-1 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {new Date(date).toLocaleString()}
          </span>
          <span className="text-base font-semibold text-yellow-600">
            Rating: {rating} ⭐
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-4">
          <span className="text-sm text-gray-600">
            Name:{" "}
            <span className="font-semibold text-blue-700">{reviewerName}</span>
          </span>
          <span className="text-sm text-gray-600">
            Email: <span className="font-semibold">{reviewerEmail}</span>
          </span>
        </div>
        <p className="text-base font-bold text-gray-800 mt-2">
          Comment: <span className="font-normal">{comment}</span>
        </p>
      </div>
    </>
  );
}
