import OrderProduct from "../components/OrderProduct";
import { useAppContext } from "../provider/ContextProvider";

export default function Orders() {
  const { orderItems } = useAppContext();
  return (
    <div className="w-full bg-white flex flex-col items-center">
      <p className="text-3xl font-bold text-blue-700 text-center p-5">
        My Orders
      </p>
      {orderItems.length > 0 ? (
        <>
          <div className="cart-items flex flex-col gap-4 items-center mb-4 w-full max-w-2xl">
            {orderItems.map((orderItem) => {
              return (
                <OrderProduct
                  productId={orderItem.productId}
                  orderId={orderItem.orderId}
                  key={orderItem.orderId}
                />
              );
            })}
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
