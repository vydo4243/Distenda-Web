import React from 'react';
function PaginationControl({ currentPage = 1, onPageChange }) {
  const handlePrevPage = () => {
    if (onPageChange && currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (onPageChange) {
      onPageChange(currentPage + 1);
    }
  };


  return (
    <nav aria-label="Pagination" className="flex gap-6 justify-center mt-[0.5rem] items-center mx-auto max-w-none max-md:gap-5 max-md:max-w-[991px] max-sm:gap-4 max-sm:max-w-screen-sm">
      <button
        onClick={handlePrevPage}
        aria-label="Go to previous page"
        className="w-9 h-9 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/dd49239d1a50098ae0b13da86a844346ec1b1c3f?placeholderIfAbsent=true"
          alt="Previous page"
          className="w-9 h-9"
        />
      </button>

      <span className="text-2xl text-slate-600 max-md:text-2xl max-sm:text-[1.25rem] max-md:text-[1rem]" aria-current="page">
        {currentPage}
      </span>

      <button
        onClick={handleNextPage}
        aria-label="Go to next page"
        className="w-9 h-9 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/df8077b4fed660d8d5e957cc1009fc200217beaf?placeholderIfAbsent=true"
          alt="Next page"
          className="w-9 h-9"
        />
      </button>
    </nav>
  );
}
export default PaginationControl
