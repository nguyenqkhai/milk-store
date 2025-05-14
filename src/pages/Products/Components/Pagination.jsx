import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
  hasPrevious,
  hasNext
}) => {
  // If there's only one page, don't show pagination
  if (totalPages <= 1) return null;

  // Calculate the range of pages to show
  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on either side of current page
    const pages = [];
    
    let startPage = Math.max(1, currentPage - delta);
    let endPage = Math.min(totalPages, currentPage + delta);
    
    // Ensure we always show at least 5 pages if available
    if (endPage - startPage + 1 < 5) {
      if (startPage === 1) {
        endPage = Math.min(5, totalPages);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, totalPages - 4);
      }
    }
    
    // Generate page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  // Pagination stats
  const start = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center">
      <div className="text-sm text-gray-600 mt-4 md:mt-0">
        Hiển thị <span className="font-medium">{start}-{end}</span> trên{' '}
        <span className="font-medium">{totalItems}</span> sản phẩm
      </div>
      
      <div className="flex items-center justify-center gap-1">
        {/* Previous page button */}
        <button
          onClick={() => hasPrevious && onPageChange(currentPage - 1)}
          disabled={!hasPrevious}
          className={`px-3 py-1 rounded-md ${
            hasPrevious
              ? 'text-gray-700 hover:bg-gray-200'
              : 'text-gray-400 cursor-not-allowed'
          }`}
          aria-label="Trang trước"
        >
          <ChevronLeft size={18} />
        </button>

        {/* First page and ellipsis if needed */}
        {visiblePages[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-1 rounded-md hover:bg-gray-200 text-gray-700"
              aria-label="Trang đầu tiên"
            >
              1
            </button>
            {visiblePages[0] > 2 && (
              <span className="px-2 py-1 text-gray-400">...</span>
            )}
          </>
        )}

        {/* Visible page buttons */}
        {visiblePages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md ${
              currentPage === page
                ? 'bg-blue-600 text-white font-medium'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
            aria-label={`Trang ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        {/* Last page and ellipsis if needed */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="px-2 py-1 text-gray-400">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-1 rounded-md hover:bg-gray-200 text-gray-700"
              aria-label="Trang cuối cùng"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next page button */}
        <button
          onClick={() => hasNext && onPageChange(currentPage + 1)}
          disabled={!hasNext}
          className={`px-3 py-1 rounded-md ${
            hasNext
              ? 'text-gray-700 hover:bg-gray-200'
              : 'text-gray-400 cursor-not-allowed'
          }`}
          aria-label="Trang kế tiếp"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;