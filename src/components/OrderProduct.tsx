import { useState } from "react";
import type { ProductType } from "../shared/types/product";
import { getProductById } from "../shared/services/products";
import { useQuery } from "@tanstack/react-query";
import CartProductLoading from "./CartProductLoading";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder } from "../redux/slices/order";
import type { RootState } from "../redux/store/store";

export default function OrderProduct({
  productId,
  orderId,
}: {
  productId: string;
  orderId: string;
}) {
  const orderItems = useSelector((state: RootState) => state.order.orderItems);
  const [quantity] = useState(
    orderItems.filter((item) => item.orderId === orderId)[0].quantity
  );

  const dispatch = useDispatch();

  async function fetchData(): Promise<ProductType> {
    const data = await getProductById(productId);
    return data.data;
  }

  // console.log(cartItems);

  const {
    data: product,
    isError,
    isPending,
    error,
  } = useQuery({
    queryKey: ["cart-item", productId],
    queryFn: fetchData,
  });

  const handleCancelOrder = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel the order?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Don't cancel",
      confirmButtonColor: "#d63030ff",
      cancelButtonColor: "#428af5",
      confirmButtonText: "Cancel Order",
    }).then((result) => {
      if (result.isConfirmed) {
        // setOrderItems(orderItems.filter((item) => item.orderId !== orderId));
        dispatch(cancelOrder(productId));

        Swal.fire({
          title: "Order Cancelled!",
          text: "Your order has been deleted.",
          icon: "success",
        });
      }
    });
  };

  if (isError) {
    throw error;
  }

  return (
    <>
      {isPending ? (
        <CartProductLoading />
      ) : product ? (
        <div className="w-[85vw] min-h-[200px] flex gap-5 rounded-xl bg-white border border-gray-300 shadow p-3 items-center">
          <NavLink to={`/products/${productId}`}>
            <div className="product-img w-70 h-70 flex-shrink-0 flex items-center justify-center">
              <img
                src={product.images[0]}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </NavLink>
          <div className="details flex flex-col gap-2 w-full justify-center">
            <p className="text-sm text-gray-500">Order ID: {orderId}</p>
            <NavLink
              to={`/products/${productId}`}
              className="decoration-blue-700 hover:underline"
            >
              <p className="text-2xl font-bold text-blue-700">
                {product.title}
              </p>
            </NavLink>
            <p className="text-sm text-gray-500">
              Category: {product.category}
            </p>
            <p className="text-sm text-green-600 font-bold">
              {`Delivery in ${Math.round(Math.random() * 7 + 1)} day(s)`}
            </p>
            <p className="text-base font-semibold text-yellow-600">
              Rating: {product.rating} ⭐
            </p>
            <p className="text-1xl text-gray-600">{product.description}</p>
            <p className="text-1xl text-gray-600">Quantity: {quantity}</p>

            <p className="text-lg italic font-bold text-blue-600">
              Price: ${(product.price * quantity).toFixed(2)}
            </p>
            <div className="btns w-full flex flex-row-reverse font-medium gap-3 mt-2">
              <button
                className="w-min rounded-lg bg-red-600 text-white px-4 py-2 cursor-pointer hover:bg-red-700 transition-colors shadow"
                onClick={handleCancelOrder}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Something went wrong...</p>
      )}
    </>
  );
}
