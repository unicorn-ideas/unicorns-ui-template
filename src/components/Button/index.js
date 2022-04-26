import React from 'react';
import '../../index.css';

export default ({ onClick, children }) => (
  <button
    className="rounded py-1 px-2 bg-primary-500 text-primary-900 shadow-md hover:bg-secondary-500 hover:text-secondary-100 focus:outline-none focus:shadow-outline"
    onClick={onClick}
  >
    {children}
  </button>
);
