import Swal from "sweetalert2";
import CartProduct from "../components/CartProduct";
import { v4 as uuidv4 } from "uuid";
import type OrderProductType from "../shared/types/order";
import { useDispatch, useSelector } from "react-redux";
import { addOrdersFromCart } from "../redux/slices/order";
import type { RootState } from "../redux/store/store";
import { emptyCart } from "../redux/slices/cart";

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((val, item) => {
    return val + item.quantity * item.price;
  }, 0);

  const handleCartPlaceOrder = () => {
    const newOrderItems: OrderProductType[] = cartItems.map((item) => {
      return { ...item, productId: item.id, orderId: uuidv4() };
    });
    dispatch(addOrdersFromCart(newOrderItems));

    Swal.fire({
      icon: "success",
      title: `Order placed successfully!`,
      text: `Total amount: $${totalPrice.toFixed(2)}`,
      draggable: true,
      timer: 3000,
    });
    dispatch(emptyCart());
  };

  return (
    <div className="w-full flex flex-col bg-white items-center">
      <p className="text-3xl font-bold text-blue-700 text-center p-5">Cart</p>
      {cartItems.length > 0 ? (
        <>
          <div className="cart-items flex flex-col gap-4 items-center mb-4 w-full max-w-2xl">
            {cartItems.map((cartItem, id) => {
              return (
                <CartProduct id={cartItem.id} index={id} key={cartItem.id} />
              );
            })}
          </div>
          <div className="w-[85vw] flex flex-row-reverse mb-5 mt-2 items-center">
            <button
              className="rounded-lg px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer font-semibold text-white shadow"
              onClick={handleCartPlaceOrder}
            >
              Place order
            </button>
            <p className="px-4 font-bold text-2xl text-blue-700">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600 font-bold text-2xl">
          Cart is empty!
        </p>
      )}
    </div>
  );
}
