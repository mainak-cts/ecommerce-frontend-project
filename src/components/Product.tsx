import { NavLink } from "react-router-dom";
import type { ProductType } from "../shared/types/product";

function Product({
  id,
  brand,
  category,
  title,
  price,
  images,
  rating,
}: Omit<ProductType, "reviews" | "availabilityStatus" | "description">) {
  return (
    <>
      <NavLink to={`/products/${id}`}>
        <div className="bg-white border border-gray-400 p-5 w-full max-w-xs rounded-lg shadow hover:shadow-lg transition-transform duration-200 hover:scale-101 cursor-pointer flex flex-col items-center gap-3 hover:bg-blue-100">
          <img
            src={images[0]}
            alt="product-img"
            width={220}
            className="rounded-lg object-cover aspect-square mb-2"
          />
          <p className="text-lg font-bold text-blue-700 text-center">{title}</p>
          <p className="text-base font-semibold text-gray-600">
            Brand: <span className="font-bold">{brand ? brand : "NA"}</span>
          </p>
          <p className="italic font-bold text-yellow-600">
            Rating: {rating} ⭐
          </p>
          <p className="text-lg italic font-bold text-blue-600">
            Price: ${price}
          </p>
          <p className="text-sm text-gray-500">Category: {category}</p>
        </div>
      </NavLink>
    </>
  );
}

export default Product;
// export default Product;
