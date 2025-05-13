import React from 'react'

const ProductNotFound = () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Không tìm thấy sản phẩm</h1>
        <p className="text-gray-600 mb-6">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <Link
          to="/san-pham"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Quay về trang sản phẩm
        </Link>
      </div>
    </div>
  )

export default ProductNotFound
