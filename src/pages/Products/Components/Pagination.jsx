import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, totalItems }) => {
  // Nếu không có trang nào, không hiển thị phân trang
  if (totalPages <= 0) return null;

  // Tạo mảng số trang từ 1 đến totalPages
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Tính toán số lượng hiển thị
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col items-center space-y-4 mt-8">
      <div className="flex items-center justify-center space-x-2">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-600'
          }`}
        >
          Trước
        </button>

        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded-lg ${
                page === currentPage
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-blue-50 border'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-600'
          }`}
        >
          Sau
        </button>
      </div>

      {/* Showing results text */}
      <div className="text-sm text-gray-600">
        Hiển thị {startItem}-{endItem} trong tổng số {totalItems} sản phẩm
      </div>
    </div>
  );
};

export default Pagination;