import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../shared/services/products";
import Loading from "./Loading";
import Reviews from "./Reviews";
import { isLoggedIn } from "../shared/services/auth";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faCartShopping,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../provider/ContextProvider";
import type { ProductType } from "../shared/types/product";
import type CartProductType from "../shared/types/cart";
import type OrderProductType from "../shared/types/order";
import { v4 as uuidv4 } from "uuid";

export default function ProductView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { cartItems, setCartItems, orderItems, setOrderItems } =
    useAppContext();

  async function fetchData(): Promise<ProductType> {
    const data = await getProductById(id!);
    return data.data;
  }

  const { data: product, isPending } = useQuery({
    queryKey: [id],
    queryFn: fetchData,
  });

  const handleBuyClick = () => {
    if (isLoggedIn()) {
      const newOrder: OrderProductType = {
        orderId: uuidv4(),
        productId: product!.id.toString(),
        price: product!.price,
        quantity: 1,
      };
      setOrderItems([...orderItems, newOrder]);
      Swal.fire({
        title: "Order placed!",
        text: `Total amount: $${product?.price}`,
        icon: "success",
        draggable: true,
      });
    } else {
      Swal.fire({
        title: "Please login to place order!",
        icon: "error",
        draggable: true,
      });
      navigate("/login");
    }
  };

  const handleCartClick = (id: string) => {
    if (isLoggedIn()) {
      // Check whether the product is already added in cart
      if (cartItems.find((item) => item.id === id)) {
        return;
      }
      const newCartItem: CartProductType = {
        id,
        quantity: 1,
        price: product!.price,
      };
      setCartItems([...cartItems, newCartItem]);
      Swal.fire({
        title: "Item added to cart!",
        icon: "success",
        draggable: true,
      });
    } else {
      Swal.fire({
        title: "Please login to add the item in cart!",
        icon: "error",
        draggable: true,
      });
      navigate("/login");
    }
  };

  return (
    <>
      {isPending ? (
        <Loading />
      ) : product ? (
        <div className="w-full max-w-2xl mx-auto bg-white border border-gray-300 p-8 rounded-lg flex flex-col items-center gap-6 mt-8 shadow">
          <img
            src={product.images[0]}
            alt="product-img"
            className="w-80 h-80 object-cover rounded-lg shadow mb-2"
          />
          <p className="text-2xl font-bold text-blue-700 text-center">
            {product.title}
          </p>
          <p className="text-lg font-semibold text-gray-600">
            Brand:{" "}
            <span className="font-bold">
              {product.brand ? product.brand : "NA"}
            </span>
          </p>
          <p className="text-lg font-bold text-yellow-600">
            Rating: {product.rating} ⭐
          </p>
          <p className="text-base text-gray-500">
            Category: {product.category}
          </p>
          <p className="text-xl italic font-bold text-blue-600">
            Price: ${product.price}
          </p>
          <p className="text-base text-gray-700">
            Description:
            <span className="font-medium">{product.description}</span>
          </p>
          <p className="text-base text-green-700 font-semibold">
            Availability Status: {product.availabilityStatus}
          </p>
          <div className="btns flex gap-4 mt-4">
            <button
              className="btn rounded-lg px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-all text-white font-bold shadow flex items-center cursor-pointer"
              onClick={handleBuyClick}
            >
              <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
              Buy now
            </button>

            <button
              className={`btn rounded-lg px-6 py-3 bg-yellow-500 hover:bg-yellow-600 transition-all text-white font-bold shadow flex items-center ${
                cartItems.find((item) => item.id === id) ? "opacity-80" : ""
              } cursor-pointer`}
              onClick={() => handleCartClick(id!)}
            >
              <FontAwesomeIcon
                icon={
                  cartItems.find((item) => item.id === id)
                    ? faCircleCheck
                    : faCartPlus
                }
                className="mr-2"
              />
              {cartItems.find((item) => item.id === id) ? "Added" : "Add"} to
              cart
            </button>
          </div>
          <Reviews reviews={product.reviews} />
        </div>
      ) : (
        <h1 className="text-center font-bold mt-8 text-2xl text-red-500">
          No product found with id: {id}
        </h1>
      )}
    </>
  );
}
