import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";

export default function Pagination({
  firstIndex,
  lastIndex,
  totalPages,
  totalProducts,
  handlePageClick,
}: {
  firstIndex: number;
  lastIndex: number;
  totalPages: number;
  totalProducts: number;
  handlePageClick: (page: number) => void;
}) {
  const handlePageChange = (data: { selected: number }) => {
    handlePageClick(data.selected);
  };
  return (
    <div className="w-full hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p className="text-md text-gray-700">
          Showing <span className="font-medium">{firstIndex + 1}</span> to{" "}
          <span className="font-medium">
            {lastIndex > totalProducts ? totalProducts : lastIndex}
          </span>{" "}
          of <span className="font-medium">{totalProducts}</span> results
        </p>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<FontAwesomeIcon icon={faCaretRight} />}
        onPageChange={handlePageChange}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel={<FontAwesomeIcon icon={faCaretLeft} />}
        activeClassName="page relative z-10 inline-flex items-center bg-indigo-600 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-indigo-700"
        previousClassName="page relative inline-flex items-center rounded-l-md text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
        containerClassName="isolate inline-flex -space-x-px rounded-md shadow-xs"
        pageClassName="page relative inline-flex items-center text-sm font-semibold text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
        nextClassName="page relative inline-flex items-center rounded-r-md text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
      />
    </div>
  );
}
