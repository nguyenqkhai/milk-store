import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  
  // Tạo mảng các số trang để hiển thị
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; // Số lượng nút số trang tối đa hiển thị
    
    if (totalPages <= maxPagesToShow) {
      // Hiển thị tất cả các trang nếu tổng số trang ít hơn maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Trường hợp có nhiều trang, hiển thị một số trang đầu, cuối và gần trang hiện tại
      let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
      let endPage = startPage + maxPagesToShow - 1;
      
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(endPage - maxPagesToShow + 1, 1);
      }
      
      // Thêm trang đầu tiên
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push('...');
        }
      }
      
      // Thêm các trang ở giữa
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Thêm trang cuối cùng
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }
    
    return pages;
  };
  
  const pageNumbers = getPageNumbers();

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        {/* Thông tin về số lượng sản phẩm hiển thị */}
        <div className="text-sm text-gray-600 mb-4 sm:mb-0">
          Hiển thị <span className="font-medium">{startItem}-{endItem}</span> trên <span className="font-medium">{totalItems}</span> sản phẩm
        </div>
        
        {/* Nút phân trang */}
        <div className="flex items-center space-x-1">
          {/* Nút Previous */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center justify-center w-9 h-9 rounded-md ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
            }`}
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>
          
          {/* Các nút số trang */}
          {pageNumbers.map((pageNumber, index) => (
            pageNumber === '...' ? (
              <span key={`ellipsis-${index}`} className="flex items-center justify-center w-9 h-9 text-gray-600">
                ...
              </span>
            ) : (
              <button
                key={`page-${pageNumber}`}
                onClick={() => onPageChange(pageNumber)}
                className={`w-9 h-9 rounded-md text-sm font-medium ${
                  currentPage === pageNumber
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                } transition-colors`}
              >
                {pageNumber}
              </button>
            )
          ))}
          
          {/* Nút Next */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center w-9 h-9 rounded-md ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
            }`}
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;