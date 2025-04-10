import React from 'react'

const NotFoundProduct = ({ searchText, onReset }) => {
  return (
    <div className='flex min-h-[400px] flex-col items-center justify-center rounded-xl bg-gray-50 p-8'>
      <svg
        className='mb-4 h-16 w-16 text-gray-400'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        />
      </svg>
      <p className='mb-1 text-xl font-medium text-gray-800'>
        Không tìm thấy sản phẩm
      </p>
      <p className='mb-4 text-center text-gray-500'>
        {searchText ? (
          <>
            Không tìm thấy sản phẩm nào phù hợp với "
            <span className='font-medium'>{searchText}</span>"
          </>
        ) : (
          'Không có sản phẩm nào trong danh mục này'
        )}
      </p>
      <button
        onClick={onReset}
        className='rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none'
      >
        Xem tất cả sản phẩm
      </button>
    </div>
  )
}

export default NotFoundProduct
