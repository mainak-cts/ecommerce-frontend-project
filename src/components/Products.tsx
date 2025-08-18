import Product from "./Product";
import { useParams } from "react-router-dom";
import {
  getAllProducts,
  getProductsByCategory,
} from "../shared/services/products";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import type { ProductType } from "../shared/types/product";

export default function Products() {
  const { category } = useParams();

  async function fetchData(): Promise<ProductType[]> {
    let data;
    if (category) {
      data = await getProductsByCategory(category);
    } else {
      data = await getAllProducts();
    }
    return data.data.products;
  }

  const {
    data: products,
    isPending,
    error,
  } = useQuery({
    queryKey: ["products", category],
    queryFn: fetchData,
  });

  if (error) {
    throw error;
  }

  return (
    <>
      <div className="products w-full min-h-[60vh] bg-white shadow px-2 sm:px-8 py-10">
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center capitalize tracking-wide">
          {category ?? "Products"}
        </h1>
        {products && products.length > 0 ? (
          <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center mb-4">
            {products.map((product) => {
              return (
                <div
                  className="transition-transform duration-200 hover:scale-105 hover:shadow-lg rounded-lg"
                  key={product.id}
                >
                  <Product
                    key={product.id}
                    id={product.id}
                    brand={product.brand}
                    title={product.title}
                    category={product.category}
                    price={product.price}
                    images={product.images}
                    rating={product.rating}
                  />
                </div>
              );
            })}
          </div>
        ) : isPending ? (
          <h1 className="text-2xl font-semibold text-blue-600 text-center mt-8 animate-pulse">
            <Loading />
          </h1>
        ) : (
          <h1 className="text-2xl font-semibold text-gray-500 text-center mt-8">
            No products found 🥲
          </h1>
        )}
      </div>
    </>
  );
}
