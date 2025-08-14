import axios from "axios";
import { APP_CONFIG } from "./appconfig";

export const axiosInstance = axios.create({
  baseURL: APP_CONFIG.API_URL,
});

export const axiosAuthInstance = axios.create({
  baseURL: APP_CONFIG.AUTH_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
