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
import { useAppContext } from "../provider/ContextProvider";
import {
  getCurrentLoggedInUser,
  handleLogOut,
  isLoggedIn,
} from "../shared/services/auth";
import { useEffect } from "react";
import Swal from "sweetalert2";
import type { UserData } from "../shared/types/user";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { getProductsBySearchQuery } from "../shared/services/products";
import SearchRecommendation from "./SearchRecommendation";
import { BeatLoader } from "react-spinners";

function Header() {
  const {
    searchInput,
    setSearchInput,
    loggedInUser,
    setLoggedInUser,
    cartItems,
  } = useAppContext();

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
        const data = await getCurrentLoggedInUser();

        const user: UserData = {
          id: data.data.id,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          age: data.data.age,
          gender: data.data.gender,
          email: data.data.email,
          phone: data.data.phone,
          username: data.data.username,
          birthDate: data.data.birthDate,
          image: data.data.image,
          address: {
            address: data.data.address.address,
            city: data.data.address.city,
            state: data.data.address.state,
            stateCode: data.data.address.stateCode,
            postalCode: data.data.address.postalCode,
            country: data.data.address.country,
          },
          role: data.data.role,
        };

        setLoggedInUser(user);
      } catch (err) {
        console.log(err);
        Swal.fire({
          title: "Something went wrong!",
          icon: "error",
          draggable: true,
        });
        handleLogOut();
        navigate("/login");
        setLoggedInUser(null);
      }
    }
    if (isLoggedIn()) {
      getUserData();
    }
  }, []);

  const [debouncedSearchInput] = useDebounce(searchInput, 500);

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
              ShopEase
            </h1>
          </NavLink>
        </div>
        <div className="search-bar w-[40vw] min-w-[200px] max-w-lg relative">
          <input
            type="text"
            name="searchInput"
            onChange={(e) => setSearchInput(e.target.value)}
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
              onClick={() => setSearchInput("")}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          ) : null}
          {searchResults && searchResults.data.products.length > 0 ? (
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
