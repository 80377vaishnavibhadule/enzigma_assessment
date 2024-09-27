// src/components/Pagination.js
import React from 'react';

const Pagination = ({ total, limit, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(total / limit);

  const handleClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div>
      <button 
        disabled={currentPage === 1} 
        onClick={() => handleClick(currentPage - 1)}
      >
        Previous
      </button>
      <span>{` Page ${currentPage} of ${totalPages} `}</span>
      <button 
        disabled={currentPage === totalPages} 
        onClick={() => handleClick(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
