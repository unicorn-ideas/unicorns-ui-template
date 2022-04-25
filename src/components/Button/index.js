import React from 'react';
import '../../index.css';

export default ({ onClick, children }) => (
  <button
    className="rounded py-1 px-2 bg-primary-900 text-primary-100"
    onClick={onClick}
  >
    {children}
  </button>
);
