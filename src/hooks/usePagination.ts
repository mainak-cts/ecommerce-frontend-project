import { useState } from "react";
import type OrderProductType from "../shared/types/order";

export const usePagination = (
  orderItems: OrderProductType[],
  itemsPerPage: number
) => {
  const [currPage, setCurrPage] = useState(0);
  const totalPages = Math.ceil(orderItems.length / itemsPerPage);
  const lastIndex = currPage * itemsPerPage + itemsPerPage;
  const firstIndex = currPage * itemsPerPage;

  return { firstIndex, lastIndex, totalPages, setCurrPage };
};
