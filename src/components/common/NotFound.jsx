import React from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from '../DarkModeToggle';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <DarkModeToggle />
      </div>
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page Not Found</p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;