import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4 py-12'>
      <div className='max-w-3xl text-center'>
        {/* Hình ảnh minh họa */}
        <div className='mb-8 flex justify-center'>
          <img 
            src="https://illustrations.popsy.co/amber/crashed-error.svg" 
            alt="Page not found illustration" 
            className='h-64 w-auto animate-bounce-slow'
          />
        </div>
        
        {/* Số 404 lớn */}
        <h1 className='mb-4 text-9xl font-extrabold tracking-tight text-blue-600'>
          404
        </h1>
        
        <h2 className='mb-4 text-3xl font-bold text-gray-800'>
          Ối! Không tìm thấy trang bạn đang tìm kiếm
        </h2>
        
        <p className='mb-8 text-lg text-gray-600'>
          Trang bạn đang tìm kiếm không tồn tại. Có thể nó đã được di chuyển,
          đổi tên hoặc không có sẵn ngay bây giờ.
        </p>
        
        <div className='flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center'>
          <Link 
            to="/" 
            className='rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
          >
            Quay lại trang chủ
          </Link>
          
          <Link 
            to="/san-pham" 
            className='rounded-lg border border-blue-600 bg-white px-6 py-3 text-base font-medium text-blue-600 transition-colors hover:bg-blue-50 hover:-translate-y-1'
          >
            Xem sản phẩm
          </Link>
        </div>
        
      </div>
    </div>
  )
}

const style = document.createElement('style');
style.textContent = `
  @keyframes bounce-slow {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
  }
  .animate-bounce-slow {
    animation: bounce-slow 3s ease-in-out infinite;
  }
`;
document.head.appendChild(style);

export default NotFound