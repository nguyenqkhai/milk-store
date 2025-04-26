import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorState = ({ error }) => {
  const navigate = useNavigate();

  return (
    <div className='flex min-h-[500px] items-center justify-center'>
      <div className='max-w-md rounded-xl bg-red-50 p-6 text-center shadow-md'>
        <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
          <svg
            className='h-8 w-8 text-red-600'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </div>
        <h3 className='mb-2 text-lg font-semibold text-gray-900'>
          Đã xảy ra lỗi
        </h3>
        <p className='mb-4 text-gray-600'>{error}</p>
        <button
          onClick={() => navigate('/product')}
          className='rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none'
        >
          Thử lại
        </button>
      </div>
    </div>
  )
}

export default ErrorState
