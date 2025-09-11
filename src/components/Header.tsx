import {
  faCartShopping,
  faFaceSadCry,
  faMagnifyingGlass,
  faSearch,
  faShoppingBag,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getCurrentLoggedInUser,
  handleLogOut,
  isLoggedIn,
} from "../shared/services/auth";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductsBySearchQuery } from "../shared/services/products";
import SearchRecommendation from "./SearchRecommendation";
import { BeatLoader } from "react-spinners";
import { useDebounce } from "../hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store/store";
import { changeSearchInput } from "../redux/slices/search";
import {
  removeLoggedInUserDetails,
  storeLoggedInUserDetails,
} from "../redux/slices/auth";
import { Bounce, toast } from "react-toastify";
import { APP_CONFIG } from "../config/appconfig";

function Header() {
  // const { loggedInUser, setLoggedInUser } = useAppContext();
  const loggedInUser = useSelector(
    (state: RootState) => state.auth.loggedInUser
  );
  const [isFocused, setIsFocused] = useState(false);

  const searchInput = useSelector(
    (state: RootState) => state.search.searchInput
  );

  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const navigate = useNavigate();

  const redirectToSearchPage = () => {
    if (searchInput.trim().length > 0)
      navigate(`/products/search/${searchInput}`);
  };

  const enterToSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      redirectToSearchPage();
    }
  };

  // Fetch user data, if JWT is present and valid
  useEffect(() => {
    async function getUserData() {
      try {
        const user = await getCurrentLoggedInUser();
        dispatch(storeLoggedInUserDetails(user));
      } catch (err) {
        console.log(err);
        toast.error(`Please login again!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        handleLogOut();
        navigate("/login");
        dispatch(removeLoggedInUserDetails());
      }
    }
    if (isLoggedIn()) {
      getUserData();
    }
  }, []);

  // const [debouncedSearchInput] = useDebounce(searchInput, 500);
  const debouncedSearchInput = useDebounce(searchInput, 500);

  const { data: searchResults, isPending } = useQuery({
    queryKey: ["search-recommendations", debouncedSearchInput],
    queryFn: () =>
      getProductsBySearchQuery({ pageParam: 0, query: debouncedSearchInput }),
    enabled: !!debouncedSearchInput.trim(),
  });

  return (
    <>
      <div className="header w-full px-6 py-4 flex justify-between items-center bg-white fixed top-0 left-0 z-50 shadow-md border-b border-gray-200">
        <div className="logo-container w-[200px]">
          <NavLink to="/">
            <h1
              id="logo"
              className="font-extrabold text-3xl ml-3 text-blue-700"
            >
              <FontAwesomeIcon
                icon={faShoppingBag}
                className="mr-2 text-amber-500"
              />
              {APP_CONFIG.APP_NAME}
            </h1>
          </NavLink>
        </div>
        <div className="search-bar w-[40vw] min-w-[200px] max-w-lg relative">
          <input
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 501)}
            type="text"
            name="searchInput"
            onChange={(e) => dispatch(changeSearchInput(e.target.value))}
            onKeyDown={(e) => enterToSearch(e)}
            value={searchInput}
            placeholder="Search products..."
            id="search-bar"
            className="w-full py-2 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 text-gray-900 bg-gray-100 placeholder-gray-400 shadow-sm transition-all focus:outline-0"
          />
          <button
            className="absolute right-[2px] top-[1px] rounded-lg px-[0.6rem] py-[0.45rem] bg-blue-600 hover:bg-blue-700 transition-colors text-white shadow cursor-pointer"
            onClick={redirectToSearchPage}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          {searchInput ? (
            <button
              className="absolute right-12 top-2 cursor-pointer rounded-full p-2transition-colors text-gray-700"
              onClick={() => dispatch(changeSearchInput(""))}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          ) : null}
          {isFocused &&
          searchResults &&
          searchResults.data.products.length > 0 ? (
            <div id="recommendations" className="absolute w-full shadow">
              {searchResults.data.products.slice(0, 5).map((product) => {
                return (
                  <SearchRecommendation
                    key={product.id}
                    productId={product.id.toString()}
                    productName={product.title}
                    productImage={product.images[0]}
                  />
                );
              })}
              <button
                type="button"
                onClick={redirectToSearchPage}
                className="w-full cursor-pointer bg-white p-2 border-t-1 border-t-sky-100 flex gap-2 justify-center items-center text-[0.95rem] hover:bg-sky-100 transition-colors"
              >
                <FontAwesomeIcon icon={faSearch} className="text-sky-600" />
                Show All
              </button>
            </div>
          ) : isPending && debouncedSearchInput.trim().length ? (
            <div className="absolute p-2 flex justify-center bg-white w-full shadow">
              <div>
                <BeatLoader size={"8px"} color="#0187D5" />
              </div>
            </div>
          ) : (
            isFocused &&
            debouncedSearchInput.trim().length > 0 && (
              <p className="absolute p-2 bg-white w-full shadow flex items-center gap-2">
                No match found
                <FontAwesomeIcon icon={faFaceSadCry} className="text-sky-600" />
              </p>
            )
          )}
        </div>

        <div className="btns flex items-center gap-4">
          {loggedInUser ? (
            <>
              <NavLink
                to="/profile"
                className="avatar border border-gray-300 w-10 h-10 rounded-full overflow-hidden shadow outline-2 outline-blue-500 hover:outline-3 transition-all"
              >
                <img
                  className="w-full h-full object-cover"
                  src={loggedInUser.image}
                  alt="avatar"
                />
              </NavLink>

              <NavLink
                to="/cart"
                className="btn rounded-lg px-4 py-3 bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold shadow flex items-center text-xl relative"
              >
                <FontAwesomeIcon icon={faCartShopping} />
                <span className="rounded-full w-5 h-5 bg-red-600 text-white text-xs absolute flex justify-center items-center top-0 right-0 font-bold shadow">
                  {cartItems.length}
                </span>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="btn rounded-lg px-5 py-2 bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold shadow"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="btn rounded-lg px-5 py-2 bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold shadow"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
