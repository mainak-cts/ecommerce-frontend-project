import Swal from "sweetalert2";
import { useAppContext } from "../provider/ContextProvider";
import { handleLogOut } from "../shared/services/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBagShopping,
  faHeadset,
  faHeart,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import CartProductLoading from "../components/CartProductLoading";

function Profile() {
  const { loggedInUser: user, setLoggedInUser } = useAppContext();
  const navigate = useNavigate();
  const handleLogOutUser = () => {
    Swal.fire({
      title: "Log out successful!",
      icon: "success",
      draggable: true,
    });
    setLoggedInUser(null);
    handleLogOut();
    navigate("/login");
  };
  return (
    <div className="w-full bg-white pb-5 flex justify-center items-center min-h-[70vh] flex-col">
      <h1 className="text-3xl mt-8 font-bold text-blue-700 mb-5">Profile</h1>
      <div className="profile-card w-full max-w-xl bg-white rounded-xl shadow-lg border border-gray-300 p-8 flex flex-col items-center gap-6 relative">
        {user ? (
          <>
            <div className="profile-img w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600 shadow">
              <img
                src={user.image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-2xl font-bold text-gray-800 text-center">
              Hi,{" "}
              <span className="text-blue-700">
                {user.firstName} {user.lastName}
              </span>{" "}
              👋
            </p>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500">Username</span>
                <span className=" text-blue-700">{user.username}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500">Email</span>
                <span className="text-blue-700">{user.email}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500">Phone</span>
                <span className=" text-blue-700">{user.phone}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500">Gender</span>
                <span className=" text-blue-700">{user.gender}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500">Age</span>
                <span className=" text-blue-700">{user.age}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500">Birth Date</span>
                <span className=" text-blue-700">{user.birthDate}</span>
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <span className="text-sm text-gray-500">Role</span>
                <span className=" text-blue-700 capitalize">{user.role}</span>
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <span className="text-sm text-gray-500">Address</span>
                <span className=" text-blue-700">
                  {user.address.address}, {user.address.city},{" "}
                  {user.address.state} ({user.address.stateCode}),{" "}
                  {user.address.postalCode}, {user.address.country}
                </span>
              </div>
              <button
                className="btn rounded-lg px-5 py-2 bg-gray-100 hover:bg-gray-200 transition-all text-red-700 cursor-pointer font-semibold border border-gray-300 absolute top-2 right-2 flex justify-center items-center gap-1"
                onClick={handleLogOutUser}
              >
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                Log out
              </button>
            </div>
            <p className="font-bold text-blue-600 text-[1.15rem]">Actions</p>
            <div className="actions grid grid-cols-2 grid-rows-2 w-full gap-x-7 gap-y-3">
              <NavLink
                to="/orders"
                className="btn rounded-lg px-5 py-2 bg-gray-100 hover:bg-gray-200 transition-all text-blue-700 cursor-pointer font-semibold border border-gray-300 flex gap-3 justify-center items-center"
              >
                <FontAwesomeIcon icon={faBagShopping} />
                View Orders
              </NavLink>
              <button className="btn rounded-lg px-5 py-2 bg-gray-100 hover:bg-gray-200 transition-all text-blue-700 cursor-pointer font-semibold border border-gray-300 flex gap-3 justify-center items-center">
                <FontAwesomeIcon icon={faTicket} />
                Coupons
              </button>
              <button className="btn rounded-lg px-5 py-2 bg-gray-100 hover:bg-gray-200 transition-all text-blue-700 cursor-pointer font-semibold border border-gray-300 flex gap-3 justify-center items-center">
                <FontAwesomeIcon icon={faHeart} />
                Wishlist
              </button>
              <button className="btn rounded-lg px-5 py-2 bg-gray-100 hover:bg-gray-200 transition-all text-blue-700 cursor-pointer font-semibold border border-gray-300 flex gap-3 justify-center items-center">
                <FontAwesomeIcon icon={faHeadset} />
                Help Center
              </button>
            </div>
          </>
        ) : (
          <p className="text-center font-bold text-xl">
            <CartProductLoading />
          </p>
        )}
      </div>
    </div>
  );
}

export default Profile;
