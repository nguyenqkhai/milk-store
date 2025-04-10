import React from 'react'

const LoadingState = () => {
  return (
    <div className='flex min-h-[500px] items-center justify-center'>
      <div className='flex flex-col items-center gap-3'>
        <div className='h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
        <p className='text-lg font-medium text-gray-700'>Đang tải dữ liệu...</p>
      </div>
    </div>
  )
}

export default LoadingState
