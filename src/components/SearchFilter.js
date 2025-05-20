import React, { useContext } from 'react';
import { BookContext } from '../context/BookContext';
import { GENRES, STATUSES } from '../constants';

const SearchFilter = () => {
  const { setSearchTerm, setGenreFilter, setStatusFilter } = useContext(BookContext);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Search by title or author"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded w-full md:w-1/3"
      />
      <select
        onChange={(e) => setGenreFilter(e.target.value)}
        className="p-2 border rounded w-full md:w-1/3"
      >
        <option value="">All Genres</option>
        {GENRES.map((genre) => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>
      <select
        onChange={(e) => setStatusFilter(e.target.value)}
        className="p-2 border rounded w-full md:w-1/3"
      >
        <option value="">All Statuses</option>
        {STATUSES.map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilter;