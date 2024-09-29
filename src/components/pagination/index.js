import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Pagination({ totalPages, currentPage, limit, skip, onPageChange }) {
  const handlePageChange = (page) => {
    onPageChange((page - 1) * limit);
  };

  const renderPageNumbers = () => {
    const pages = [];
    pages.push(1);

    if (totalPages <= 5) {
      for (let i = 2; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage > 3) {
        pages.push('...');
      }
      if (currentPage > 2) {
        pages.push(currentPage - 1);
      }
      if (currentPage !== 1 && currentPage !== totalPages) {
        pages.push(currentPage);
      }
      if (currentPage < totalPages - 1) {
        pages.push(currentPage + 1);
      }
      if (currentPage === 1) {
        pages.push(3);
      }
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="Pagination">
      {renderPageNumbers().map((page, index) => (
        <button
          key={index}
          className={`Pagination-button ${currentPage === page ? 'active' : ''}`}
          onClick={() => typeof page === 'number' && handlePageChange(page)}
          disabled={typeof page !== 'number'}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  skip: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
