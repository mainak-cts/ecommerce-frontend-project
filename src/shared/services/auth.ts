import { axiosAuthInstance } from "../../config/axiosconfig";
import type { LoginData, LoginResponseData } from "../types/auth";
import type { UserData } from "../types/user";
import axios from "axios";

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

export const isLoggedIn = () => {
  const jwt = localStorage.getItem("jwt");
  return !!jwt;
};

export const handleLogOut = () => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("google-auth");
};

export const handleLogIn = async ({ username, password }: LoginData) => {
  return await axiosAuthInstance.post<LoginResponseData>("/login", {
    username,
    password,
  });
};

export const handleSignUp = () => {
  // Actual API call to be implemented
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Success");
    }, 2000);
  });
};

export const getCurrentLoggedInUser = async () => {
  let user: UserData | null = null;
  if (!isLoggedInWithGoogle()) {
    const data = await axiosAuthInstance.get<UserData>("/me", {
      headers: {
        Authorization: `Bearer ${getJwt()}`,
      },
    });

    user = {
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
  } else {
    const userData = await fetchUserInfo(getJwt()!);
    user = {
      id: userData.sub ? Number(userData.sub) : 1,
      username: userData.name ?? "dummy-username",
      email: userData.email ?? "dummy@email.com",
      image: userData.picture ?? "https://dummyimage.com/100x100",
      role: "user", // Assuming default role
      phone: (userData.phone as string) ?? "000-000-0000",
      address: {
        address: "123 Dummy St",
        city: "Dummy City",
        state: "Dummy State",
        stateCode: "DS",
        postalCode: "00000",
        country: "Dummy Country",
      },
      firstName: userData.given_name ?? "Unknown",
      lastName: userData.family_name ?? "Unknown",
      age: userData.age ?? 18,
      gender: userData.gender ?? "Unknown",
      birthDate: userData.birthDate ?? "",
    };
  }

  return user;
};

export const handleJwt = (jwt: string) => {
  localStorage.setItem("jwt", jwt);
};

export const getJwt = (): string | null => {
  const jwt = localStorage.getItem("jwt");
  if (jwt !== null) {
    return jwt;
  }
  return null;
};

export const setLoggedInWithGoogle = () => {
  localStorage.setItem("google-auth", "true");
};

export const isLoggedInWithGoogle = () => {
  const loggedInWithGoogle = localStorage.getItem("google-auth");
  return !!loggedInWithGoogle;
};

// Function to fetch user data from google API
const fetchUserInfo = async (jwtToken: string): Promise<GoogleJwtPayload> => {
  const userData = await axios.get(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  );

  return userData.data;
};
