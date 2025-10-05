import { useGoogleLogin } from "@react-oauth/google";
import type { UserData } from "../shared/types/user";
import { Bounce, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleJwt, setLoggedInWithGoogle } from "../shared/services/auth";
import { storeLoggedInUserDetails } from "../redux/slices/auth";
import axios from "axios";

type GoogleUserPayload = {
  sub?: string;
  name?: string;
  email?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  gender?: string;
  birthDate?: string;
  age?: number;
  [key: string]: unknown;
};

export const useLoginViaGoogle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        const data: GoogleUserPayload = res.data;

        const userData: UserData = {
          id: data.sub ? Number(data.sub) : 1,
          username: data.name ?? "dummy-username",
          email: data.email ?? "dummy@email.com",
          image: data.picture ?? "https://dummyimage.com/100x100",
          role: "user", // Assuming default role
          phone: (data.phone as string) ?? "000-000-0000",
          address: {
            address: "123 Dummy St",
            city: "Dummy City",
            state: "Dummy State",
            stateCode: "DS",
            postalCode: "00000",
            country: "Dummy Country",
          },
          firstName: data.given_name ?? "Unknown",
          lastName: data.family_name ?? "Unknown",
          age: data.age ?? 18,
          gender: data.gender ?? "Unknown",
          birthDate: data.birthDate ?? "",
        };

        toast.success(
          `Welcome ${userData.firstName + " " + userData.lastName}`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          }
        );
        dispatch(storeLoggedInUserDetails(userData));
        handleJwt(access_token);
        setLoggedInWithGoogle();
        navigate("/");
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    },
    onError: () => {
      toast.error(`Login failed, please try agian!`, {
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
    },
  });

  return login;
};
