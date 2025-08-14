import { useMutation } from "@tanstack/react-query";
import {
  getCurrentLoggedInUser,
  handleJwt,
  handleLogIn,
} from "../shared/services/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppContext } from "../provider/ContextProvider";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setLoggedInUser } = useAppContext();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: handleLogIn,
    onSuccess: (data) => {
      async function fetchLoggedInUser() {
        try {
          const data = await getCurrentLoggedInUser();
          setLoggedInUser(data.data);
        } catch (error) {
          console.log(error);
          setLoggedInUser(null);
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
