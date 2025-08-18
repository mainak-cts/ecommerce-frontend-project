import { APP_CONFIG } from "../../config/appconfig";
import { axiosInstance } from "../../config/axiosconfig";
import type { ProductResponse, ProductType } from "../types/product";

export const getAllProducts = ({ pageParam }: { pageParam: number }) => {
  return axiosInstance.get<ProductResponse>(
    `?skip=${pageParam}&limit=${APP_CONFIG.API_PRODUCT_LIMIT}`
  );
};

export const getProductsBySearchQuery = ({
  pageParam = 0,
  query,
}: {
  pageParam: number;
  query: string;
}) => {
  return axiosInstance.get<ProductResponse>(
    `/search?q=${query.toLowerCase()}&limit=${
      APP_CONFIG.API_PRODUCT_LIMIT
    }&skip=${pageParam}`
  );
};

export const getProductsByCategory = ({
  category,
  pageParam,
}: {
  category: string;
  pageParam: number;
}) => {
  return axiosInstance.get<ProductResponse>(
    `/category/${category.toLowerCase()}?skip=${pageParam}&limit=${
      APP_CONFIG.API_PRODUCT_LIMIT
    }`
  );
};

export const getProductById = (id: string) => {
  return axiosInstance.get<ProductType>(`/${id}`);
};
