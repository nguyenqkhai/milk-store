import React from 'react'
import { FaCreditCard, FaMoneyBillWave } from 'react-icons/fa'

const OrderSummary = ({ formData, paymentMethod }) => (
  <div className='mb-4 rounded-xl bg-white p-6 shadow'>
    <h2 className='mb-4 text-2xl font-semibold text-gray-800'>
      Tóm tắt đơn hàng
    </h2>
    <div className='rounded-lg bg-gray-50 p-4'>
      <div className='grid grid-cols-2 gap-4 text-sm'>
        <div>
          <p className='text-gray-800'>Tên:</p>
          <p className='font-medium'>
            {formData.firstName} {formData.lastName}
          </p>
        </div>
        <div>
          <p className='text-gray-800'>Email:</p>
          <p className='font-medium'>{formData.email}</p>
        </div>
        <div>
          <p className='text-gray-800'>Địa chỉ giao hàng:</p>
          <p className='font-medium'>
            {formData.city}, {formData.state} {formData.zipCode}
          </p>
        </div>
        <div>
          <p className='text-gray-800'>Phương thức thanh toán:</p>
          <p className='flex items-center gap-2 font-medium'>
            {paymentMethod === 'payos' ? (
              <>
                <FaCreditCard className='text-lg text-blue-500' />
                Thanh toán trước
              </>
            ) : (
              <>
                <FaMoneyBillWave className='text-lg text-green-500' />
                Thanh toán khi nhận hàng
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  </div>
)

export default OrderSummary
