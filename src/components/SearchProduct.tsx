import { getProductsBySearchQuery } from "../shared/services/products";
import Product from "./Product";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import type { ProductResponse } from "../shared/types/product";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function SearchProduct() {
  const { searchInput } = useParams();

  async function fetchData({ pageParam = 0 }): Promise<ProductResponse> {
    const data = await getProductsBySearchQuery({
      pageParam,
      query: searchInput!,
    });
    return data.data;
  }

  const { inView, ref } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["products", searchInput],
    queryFn: fetchData,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : null;
    },
  });

  if (error) {
    throw error;
  }

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      <div className="products w-full min-h-[60vh] bg-white rounded-lg shadow px-2 sm:px-8 py-10">
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center capitalize tracking-wide">
          {searchInput
            ? `Showing results for "${searchInput}"`
            : "Showing all products"}
        </h1>
        {isLoading && (
          <h1 className="text-2xl font-semibold text-blue-600 text-center mt-8 animate-pulse">
            <Loading />
          </h1>
        )}
        {data &&
          data.pages.flatMap((page) =>
            page.products && page.products.length > 0 ? (
              <div
                className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center mb-4"
                key={page.skip}
              >
                {page.products.map((product) => (
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
                ))}
              </div>
            ) : (
              <h1
                className="text-2xl font-semibold text-gray-500 text-center mt-8"
                key={page.skip}
              >
                No products found 🥲
              </h1>
            )
          )}
        <div ref={ref}>{isFetchingNextPage && <Loading />}</div>
      </div>
    </>
  );
}
