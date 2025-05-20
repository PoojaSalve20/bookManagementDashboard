import React, { createContext, useState } from 'react';
import { useBooks } from '../hooks/useBooks';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [toast, setToast] = useState({ message: '', type: '' });

  const { books, totalPages, isLoading, handleAddBook, handleUpdateBook, handleDelete } = useBooks({
    currentPage,
    searchTerm,
    genreFilter,
    statusFilter,
    setToast,
    setCurrentPage,
  });

  return (
    <BookContext.Provider
      value={{
        books,
        totalPages,
        isLoading,
        currentPage,
        setCurrentPage,
        searchTerm,
        setSearchTerm,
        genreFilter,
        setGenreFilter,
        statusFilter,
        setStatusFilter,
        isModalOpen,
        setIsModalOpen,
        selectedBook,
        setSelectedBook,
        handleAddBook,
        handleUpdateBook,
        handleDelete,
        toast,
        setToast,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};