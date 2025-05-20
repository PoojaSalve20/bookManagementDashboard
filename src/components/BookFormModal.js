import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BookContext } from '../context/BookContext';
import { GENRES, STATUSES } from '../constants';

const BookFormModal = () => {
  const { isModalOpen, setIsModalOpen, selectedBook, handleAddBook, handleUpdateBook } = useContext(BookContext);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      author: '',
      genre: '',
      publishedYear: '',
      status: 'Available',
    },
  });

  // Reset form with selectedBook values when it changes
  useEffect(() => {
    if (selectedBook) {
      reset({
        title: selectedBook.title || '',
        author: selectedBook.author || '',
        genre: selectedBook.genre || '',
        publishedYear: selectedBook.publishedYear || '',
        status: selectedBook.status || 'Available',
      });
    } else {
      reset({
        title: '',
        author: '',
        genre: '',
        publishedYear: '',
        status: 'Available',
      });
    }
  }, [selectedBook, reset]);

  const onSubmit = (data) => {
    // Ensure all fields are strings and valid
    const sanitizedData = {
      title: data.title || '',
      author: data.author || '',
      genre: data.genre || '',
      publishedYear: data.publishedYear ? parseInt(data.publishedYear, 10) : '',
      status: data.status || 'Available',
    };

    if (selectedBook) {
      handleUpdateBook(selectedBook._id, sanitizedData);
    } else {
      handleAddBook(sanitizedData);
    }
    reset();
    setIsModalOpen(false);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{selectedBook ? 'Edit Book' : 'Add Book'}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              className="w-full p-2 border rounded"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Author</label>
            <input
              type="text"
              {...register('author', { required: 'Author is required' })}
              className="w-full p-2 border rounded"
            />
            {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Genre</label>
            <select {...register('genre', { required: 'Genre is required' })} className="w-full p-2 border rounded">
              <option value="">Select Genre</option>
              {GENRES.map((genre) => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            {errors.genre && <p className="text-red-500 text-sm">{errors.genre.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Published Year</label>
            <input
              type="number"
              {...register('publishedYear', {
                required: 'Published Year is required',
                min: { value: 1800, message: 'Year must be after 1800' },
                max: { value: new Date().getFullYear(), message: 'Year cannot be in the future' },
              })}
              className="w-full p-2 border rounded"
            />
            {errors.publishedYear && <p className="text-red-500 text-sm">{errors.publishedYear.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <select {...register('status')} className="w-full p-2 border rounded">
              {STATUSES.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                reset();
                setIsModalOpen(false);
              }}
              className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              {selectedBook ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookFormModal;
