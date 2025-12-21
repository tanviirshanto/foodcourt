import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const PaginationControls = ({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition-all"
        aria-label="Previous Page"
      >
        <FaArrowLeft />
      </button>
      <span className="text-lg text-gray-700">
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition-all"
        aria-label="Next Page"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default PaginationControls;