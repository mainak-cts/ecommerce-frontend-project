import { useState } from "react";
import OrderProduct from "../components/OrderProduct";
import Pagination from "../components/Pagination";
import { useAppContext } from "../provider/ContextProvider";

export default function Orders() {
  const { orderItems } = useAppContext();
  const [currPage, setCurrPage] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(orderItems.length / itemsPerPage);
  const lastIndex = currPage * itemsPerPage + itemsPerPage;
  const firstIndex = currPage * itemsPerPage;

  const handlePageCLick = (pageNumber: number) => {
    setCurrPage(pageNumber);
  };
  return (
    <div className="w-full bg-white flex flex-col items-center">
      <p className="text-3xl font-bold text-blue-700 text-center p-5">
        My Orders
      </p>
      {orderItems.length > 0 ? (
        <>
          <div className="order-items flex flex-col gap-4 items-center mb-4 w-[85vw] max-w-6xl">
            {orderItems.slice(firstIndex, lastIndex).map((orderItem) => {
              return (
                <OrderProduct
                  productId={orderItem.productId}
                  orderId={orderItem.orderId}
                  key={orderItem.orderId}
                />
              );
            })}
            <Pagination
              firstIndex={firstIndex}
              lastIndex={lastIndex}
              totalProducts={orderItems.length}
              totalPages={totalPages}
              handlePageClick={handlePageCLick}
            />
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600 font-bold text-2xl">
          No orders avaialble!
        </p>
      )}
    </div>
  );
}
