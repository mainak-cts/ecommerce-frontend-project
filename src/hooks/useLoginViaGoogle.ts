import type { CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import type { UserData } from "../shared/types/user";
import { Bounce, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleJwt, setLoggedInWithGoogle } from "../shared/services/auth";
import { storeLoggedInUserDetails } from "../redux/slices/auth";

type GoogleJwtPayload = {
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

  return (credentialResponse: CredentialResponse) => {
    const decodedResponse = jwtDecode<GoogleJwtPayload>(
      credentialResponse.credential!
    );

    const userData: UserData = {
      id: decodedResponse.sub ? Number(decodedResponse.sub) : 1,
      username: decodedResponse.name ?? "dummy-username",
      email: decodedResponse.email ?? "dummy@email.com",
      image: decodedResponse.picture ?? "https://dummyimage.com/100x100",
      role: "user", // Assuming default role
      phone: (decodedResponse.phone as string) ?? "000-000-0000",
      address: {
        address: "123 Dummy St",
        city: "Dummy City",
        state: "Dummy State",
        stateCode: "DS",
        postalCode: "00000",
        country: "Dummy Country",
      },
      firstName: decodedResponse.given_name ?? "Unknown",
      lastName: decodedResponse.family_name ?? "Unknown",
      age: decodedResponse.age ?? 18,
      gender: decodedResponse.gender ?? "Unknown",
      birthDate: decodedResponse.birthDate ?? "",
    };

    toast.success(`Welcome ${userData.firstName + " " + userData.lastName}`, {
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
    dispatch(storeLoggedInUserDetails(userData));
    handleJwt(credentialResponse.credential!);
    setLoggedInWithGoogle();
    navigate("/");
  };
};
