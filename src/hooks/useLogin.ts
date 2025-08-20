import { useMutation } from "@tanstack/react-query";
import {
  getCurrentLoggedInUser,
  handleJwt,
  handleLogIn,
} from "../shared/services/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  removeLoggedInUserDetails,
  storeLoggedInUserDetails,
} from "../redux/slices/auth";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: handleLogIn,
    onSuccess: (data) => {
      async function fetchLoggedInUser() {
        try {
          const data = await getCurrentLoggedInUser();
          dispatch(storeLoggedInUserDetails(data.data));
        } catch (error) {
          console.log(error);
          dispatch(removeLoggedInUserDetails());
        }
      }
      Swal.fire({
        title: `Welcome back ${data.data.firstName + " " + data.data.lastName}`,
        icon: "success",
        draggable: true,
      });
      handleJwt(data.data.accessToken);
      navigate("/");
      fetchLoggedInUser();
    },
  });
};
