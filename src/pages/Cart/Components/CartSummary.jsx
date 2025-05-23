import React from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

const CartSummary = ({ subTotal, shipping, grandTotal, checkedItems }) => {
  const formatPrice = price => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price)
  }

  const order = {
    items: checkedItems,
    subtotal: subTotal,
    total: grandTotal,
    shipping: shipping,
  }

  const navigate = useNavigate()

  const handleCheckout = () => {
    if (!checkedItems || checkedItems.length === 0) {
      // message.error('Bạn phải chọn đơn hàng để tiến hành thanh toán');
      return
    }
    navigate('/thanh-toan', { state: { order } })
  }
  return (
    <div className='h-full rounded-lg bg-white p-6 shadow'>
      <h2 className='mb-6 text-xl font-semibold'>Tóm tắt đơn hàng</h2>
      <div className='mb-4 text-sm'>
        <span className='text-gray-600'>Sản phẩm đã chọn: </span>
        <span className='font-medium'>{checkedItems?.length || 0}</span>
      </div>

      <div className='border-t border-gray-100 pt-4'>
        <h3 className='mb-4 font-medium'>Chi tiết giá:</h3>

        <div className='mb-4 space-y-3'>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Tạm tính</span>
            <span className='font-medium'>{formatPrice(subTotal)}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Phí vận chuyển</span>
            <span className='font-medium'>{formatPrice(shipping)}</span>
          </div>
        </div>

        <div className='mb-6 border-t border-gray-100 pt-4'>
          <div className='flex justify-between'>
            <span className='text-lg font-semibold'>Tổng cộng</span>
            <span className='text-black-500 text-lg font-semibold'>
              {formatPrice(grandTotal)}
            </span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-medium shadow-md transition duration-300 ${
            checkedItems?.length > 0
              ? 'cursor-pointer bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 hover:shadow-lg'
              : 'cursor-not-allowed bg-gray-300 text-gray-500'
          }`}
        >
          Tiến hành thanh toán <span>→</span>
        </button>

        <div className='mt-6 text-center text-xs text-gray-500'>
          <p>Thanh toán an toàn. Dễ dàng đổi trả.</p>
          <p>100% sản phẩm chính hãng</p>
        </div>
      </div>
    </div>
  )
}

export default CartSummary
