import React, { useContext } from 'react';
import { BookContext } from '../context/BookContext';
import Pagination from './Pagination';
import LoadingSkeleton from './LoadingSkeleton';

const BookTable = ({ books, isLoading }) => {
  const { setSelectedBook, setIsModalOpen, handleDelete } = useContext(BookContext);

  const confirmDelete = (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      handleDelete(bookId);
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-indigo-600 text-white uppercase text-sm font-semibold tracking-wider">
              <th className="py-4 px-6 text-left">Title</th>
              <th className="py-4 px-6 text-left">Author</th>
              <th className="py-4 px-6 text-left">Genre</th>
              <th className="py-4 px-6 text-left">Year</th>
              <th className="py-4 px-6 text-left">Status</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr
                key={book._id}
                className={`border-b border-gray-200 transition-colors duration-200 ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-indigo-50`}
              >
                <td className="py-4 px-6 font-medium text-gray-800">{book.title}</td>
                <td className="py-4 px-6 text-gray-700">{book.author}</td>
                <td className="py-4 px-6 text-gray-700">{book.genre}</td>
                <td className="py-4 px-6 text-gray-700">{book.publishedYear}</td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      book.status === 'Available'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {book.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-center space-x-4">
                  <button
                    onClick={() => {
                      setSelectedBook(book);
                      setIsModalOpen(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(book._id)}
                    className="text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Pagination />
    </div>
  );
};

export default BookTable;