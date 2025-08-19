import { useState } from "react";

export const usePagination = <T>(items: T[], itemsPerPage: number) => {
  const [currPage, setCurrPage] = useState(0);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const lastIndex = currPage * itemsPerPage + itemsPerPage;
  const firstIndex = currPage * itemsPerPage;

  return { firstIndex, lastIndex, totalPages, setCurrPage };
};
