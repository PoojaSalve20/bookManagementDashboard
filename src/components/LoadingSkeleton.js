import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Author</th>
            <th className="py-3 px-6 text-left">Genre</th>
            <th className="py-3 px-6 text-left">Year</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-3 px-6">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </td>
              <td className="py-3 px-6">
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </td>
              <td className="py-3 px-6">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </td>
              <td className="py-3 px-6">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </td>
              <td className="py-3 px-6">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </td>
              <td className="py-3 px-6 text-center">
                <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoadingSkeleton;