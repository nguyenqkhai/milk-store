import React from 'react'
import { Link } from 'react-router-dom'

const EmptyCart = () => {
  return (
    <div className='text-center'>
      <h2 className='mb-4 text-2xl font-semibold'>
        Giỏ hàng của bạn đang trống
      </h2>
      <Link
        to='/san-pham'
        className='flex items-center justify-center gap-2 font-medium text-blue-600 hover:text-blue-700'
      >
        <span>←</span> Tiếp tục mua sắm
      </Link>
    </div>
  )
}

export default EmptyCart
