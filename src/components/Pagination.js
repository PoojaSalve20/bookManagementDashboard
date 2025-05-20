import React, { useContext } from 'react';
import { BookContext } from '../context/BookContext';

const Pagination = () => {
  const { currentPage, totalPages, setCurrentPage } = useContext(BookContext);

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 rounded mr-2 disabled:opacity-50"
      >
        Previous
      </button>
      <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 rounded ml-2 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;