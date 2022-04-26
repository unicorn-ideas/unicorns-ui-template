import React from 'react';
import '../../index.css';

export default ({ onClick, children }) => (
  <textarea className="rounded py-1 px-2 border-2 border-primary-500 w-full">
    {children}
  </textarea>
);
