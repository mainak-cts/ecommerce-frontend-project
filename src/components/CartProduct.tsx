import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../shared/services/products";
import { useEffect, useState } from "react";
import CartProductLoading from "./CartProductLoading";
import type { ProductType } from "../shared/types/product";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store/store";
import {
  addQuantityToCartProduct,
  reduceQuantityFromCartProduct,
  removeProductFromCart,
} from "../redux/slices/cart";
import { Bounce, toast } from "react-toastify";

export default function CartProduct({
  id: productId,
}: {
  id: string;
  index: number;
}) {
  const cartItem = useSelector((state: RootState) =>
    state.cart.cartItems.find((item) => item.id === productId)
  );

  const [quantity, setQuantity] = useState(cartItem?.quantity || 1);

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

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

  const handleRemoveItemFromCart = () => {
    // setCartItems(cartItems.filter((item) => item.id !== id));
    dispatch(removeProductFromCart(productId));
    toast.success(`Item removed from cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      transition: Bounce,
    });
  };

  const addQuantity = () => {
    dispatch(addQuantityToCartProduct({ productId }));
  };

  const reduceQuantity = () => {
    dispatch(reduceQuantityFromCartProduct({ productId }));
  };

  if (isError) {
    throw error;
  }
  return (
    <>
      {isPending ? (
        <CartProductLoading />
      ) : product ? (
        <div className="w-[85vw] min-h-[200px] flex gap-5 rounded-xl bg-white border border-gray-300 shadow px-3 py-0 items-center">
          <NavLink to={`/products/${productId}`}>
            <div className="product-img w-70 h-70 flex-shrink-0 flex items-center justify-center">
              <img
                src={product.images[0]}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </NavLink>
          <div className="details flex flex-col gap-2 w-full justify-center">
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
            <p className="text-base font-semibold text-yellow-600">
              Rating: {product.rating} ⭐
            </p>
            <p className="text-1xl text-gray-600">{product.description}</p>

            <p className="text-lg italic font-bold text-blue-600">
              Price: ${(product.price * quantity).toFixed(2)}
            </p>
            <div className="btns w-full flex flex-row-reverse font-medium gap-3 mt-2">
              <button
                className="w-min rounded-lg bg-red-600 text-white px-4 py-2 cursor-pointer hover:bg-red-700 transition-colors shadow"
                onClick={handleRemoveItemFromCart}
              >
                Remove
              </button>
              <div className="qty px-3 py-2 flex justify-center items-center gap-2 bg-gray-100 rounded-lg border border-gray-200">
                <span className="font-semibold text-gray-700">Quantity</span>
                <button
                  className="rounded bg-blue-600 text-white px-2 cursor-pointer hover:bg-blue-700 transition-colors"
                  onClick={addQuantity}
                >
                  +
                </button>
                <span className="font-bold text-blue-700">{quantity}</span>
                <button
                  className="rounded bg-blue-600 text-white px-2 cursor-pointer hover:bg-blue-700 transition-colors"
                  onClick={reduceQuantity}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Something went wrong...</p>
      )}
    </>
  );
}
