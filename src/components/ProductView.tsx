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
import type { ProductType } from "../shared/types/product";
import type CartProductType from "../shared/types/cart";
import type OrderProductType from "../shared/types/order";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../redux/slices/order";
import type { RootState } from "../redux/store/store";
import { addProductToCart } from "../redux/slices/cart";
import { Bounce, toast } from "react-toastify";
import FAQ from "./FAQ";

export default function ProductView() {
  const navigate = useNavigate();
  const { id } = useParams();

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();

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

      dispatch(addOrder(newOrder));

      Swal.fire({
        title: "Order placed!",
        text: `Total amount: $${product?.price}`,
        icon: "success",
        draggable: true,
      });
    } else {
      toast.error(`Please login to place order!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
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
      // setCartItems([...cartItems, newCartItem]);
      dispatch(addProductToCart(newCartItem));

      toast.success(`Item added to cart!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    } else {
      toast.error(`Please login to add the item in cart!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
      navigate("/login");
    }
  };

  return (
    <>
      {isPending ? (
        <Loading />
      ) : product ? (
        <div className="w-full max-w-2xl mx-auto bg-white border border-gray-300 p-8 rounded-lg flex flex-col items-center gap-6 mt-8 shadow mb-4">
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
          <FAQ />
        </div>
      ) : (
        <h1 className="text-center font-bold mt-8 text-2xl text-red-500">
          No product found with id: {id}
        </h1>
      )}
    </>
  );
}
