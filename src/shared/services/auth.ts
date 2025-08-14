import { axiosAuthInstance } from "../../config/axiosconfig";
import type { LoginData, LoginResponseData } from "../types/auth";
import type { UserData } from "../types/user";

export const isLoggedIn = () => {
  const jwt = localStorage.getItem("jwt");
  return !!jwt;
};

export const handleLogOut = () => {
  localStorage.removeItem("jwt");
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
  return await axiosAuthInstance.get<UserData>("/me", {
    headers: {
      Authorization: `Bearer ${getJwt()}`,
    },
  });
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
