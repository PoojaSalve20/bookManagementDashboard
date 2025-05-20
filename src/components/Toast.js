import React, { useContext, useEffect } from 'react';
import { BookContext } from '../context/BookContext';

const Toast = () => {
  const { toast, setToast } = useContext(BookContext);

  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => {
        setToast({ message: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, setToast]);

  if (!toast.message) return null;

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded shadow-lg text-white ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
      {toast.message}
    </div>
  );
};

export default Toast;