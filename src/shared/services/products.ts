import { axiosInstance } from "../../config/axiosconfig";
import type { ProductType } from "../../models/ProductType";

export const getAllProducts = () => {
  return axiosInstance.get<{ products: ProductType[] }>("");
};

export const getProductsBySearchQuery = (query: string) => {
  return axiosInstance.get<{ products: ProductType[] }>(
    `/search?q=${query.toLowerCase()}`
  );
};

export const getProductsByCategory = (category: string) => {
  return axiosInstance.get<{ products: ProductType[] }>(
    `/category/${category.toLowerCase()}`
  );
};

export const getProductById = (id: string) => {
  return axiosInstance.get<ProductType>(`/${id}`);
};
