import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'https://crudcrud.com/api/7e74615f5e644636bd0d8e3596d13001/unicorns'; // Replace with your crudcrud.com endpoint

export const useBooks = ({ currentPage, searchTerm, genreFilter, statusFilter, setToast, setCurrentPage }) => {
  const queryClient = useQueryClient();
  const ITEMS_PER_PAGE = 10;

  // Fetch books
  const { data, isLoading } = useQuery({
    queryKey: ['books', currentPage, searchTerm, genreFilter, statusFilter],
    queryFn: async () => {
      const response = await axios.get(API_URL);
      let books = response.data;

      // Client-side filtering and searching
      if (searchTerm) {
        books = books.filter(
          (book) =>
            (typeof book.title === 'string' && book.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (typeof book.author === 'string' && book.author.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
      if (genreFilter) {
        books = books.filter((book) => typeof book.genre === 'string' && book.genre === genreFilter);
      }
      if (statusFilter) {
        books = books.filter((book) => typeof book.status === 'string' && book.status === statusFilter);
      }

      // Pagination
      const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);
      const start = (currentPage - 1) * ITEMS_PER_PAGE;
      const paginatedBooks = books.slice(start, start + ITEMS_PER_PAGE);

      return { books: paginatedBooks, totalPages };
    },
  });

  // Add book
  const addBookMutation = useMutation({
    mutationFn: (newBook) => axios.post(API_URL, newBook),
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      setCurrentPage(1);
      setToast({ message: 'Book added successfully', type: 'success' });
    },
    onError: () => {
      setToast({ message: 'Failed to add book', type: 'error' });
    },
  });

  // Update book
  const updateBookMutation = useMutation({
    mutationFn: ({ id, updatedBook }) => axios.put(`${API_URL}/${id}`, updatedBook),
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      setToast({ message: 'Book updated successfully', type: 'success' });
    },
    onError: () => {
      setToast({ message: 'Failed to update book', type: 'error' });
    },
  });

  // Delete book
  const deleteBookMutation = useMutation({
    mutationFn: (id) => axios.delete(`${API_URL}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      setToast({ message: 'Book deleted successfully', type: 'success' });
    },
    onError: () => {
      setToast({ message: 'Failed to delete book', type: 'error' });
    },
  });

  return {
    books: data?.books || [],
    totalPages: data?.totalPages || 1,
    isLoading,
    handleAddBook: addBookMutation.mutate,
    handleUpdateBook: (id, updatedBook) => updateBookMutation.mutate({ id, updatedBook }),
    handleDelete: deleteBookMutation.mutate,
  };
};