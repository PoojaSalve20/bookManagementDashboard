import React, { useContext } from 'react';
import { BookContext } from '../context/BookContext';
import BookTable from '../components/BookTable';
import BookFormModal from '../components/BookFormModal';
import SearchFilter from '../components/SearchFilter';

const Dashboard = () => {
  const { books, isLoading, setIsModalOpen, setSelectedBook } = useContext(BookContext);

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Book Management Dashboard</h1>
        <button
          onClick={() => {
            setSelectedBook(null);
            setIsModalOpen(true);
          }}
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200"
        >
          Add Book
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <SearchFilter />
      </div>
      <div className="bg-white rounded-lg shadow-md">
        <BookTable books={books} isLoading={isLoading} />
      </div>
      <BookFormModal />
    </div>
  );
};

export default Dashboard;