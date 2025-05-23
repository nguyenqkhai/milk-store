import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaCheckCircle, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
import OrderSummary from './components/OrderSummary'
import VoucherBox from './components/VoucherBox'
import OrderService from '@services/Order/OrderService'
import CartService from '@services/Cart/CartService'
import PaymentService from '@services/Payment/PaymentService'
import { message } from 'antd'

const Payment = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [voucher, setVoucher] = useState(null)
  const [discountValue, setDiscountValue] = useState(0)

  // Get form data from location state
  const formData = location.state?.formData || {}
  const paymentMethod = location.state?.paymentMethod || 'cash'
  const order = location.state?.order || {}
  const buyNow = location.state?.buyNow || false

  // const discountValue = order?.total * (voucher?.discount || 0) / 100 || 0;

  useEffect(() => {
    if (voucher) {
      if (order?.total < voucher.minOrder) {
        setVoucher(null)
        message.error(
          `Đơn hàng tối thiểu để áp dụng mã giảm giá là ${formatPrice(voucher?.minOrder || 0)}`
        )
        return
      }
      const calculatedDiscount =
        (order?.subtotal * (voucher.discount || 0)) / 100
      if (voucher.maxDiscount && calculatedDiscount > voucher.maxDiscount) {
        setDiscountValue(voucher.maxDiscount)
      } else {
        setDiscountValue(calculatedDiscount)
      }
    } else {
      setDiscountValue(0)
    }
  }, [voucher])

  const formatPrice = price => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price)
  }

  const handleProcessPayment = () => {
    setIsProcessing(true)
    const orderData = {
      shippingAddress: formData.state + ', ' + formData.city,
      shippingFee: order.shipping,
      paymentMethod: paymentMethod.toUpperCase(),
      notes: '',
      voucherCodes: voucher?.code ? [voucher.code] : [],
      orderDetails: order.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    }
    // Call OrderService to create order
    OrderService.createOrder(orderData)
      .then(async response => {
        if (response) {
          if (paymentMethod.toUpperCase() === 'PAYOS') {
            const payosRes = await PaymentService.createPaymentPayos({
              orderId: response.data.orderId,
            })
            if (payosRes && payosRes.data.paymentLinkId && payosRes.data.checkoutUrl && payosRes.data.expiredAt) {
              window.location.href = payosRes.data.checkoutUrl;
              return;
            } else {
              setIsProcessing(false);
              setIsSuccess(false);
              message.error('Không tạo được link thanh toán PayOS!');
              return;
            }
          }
          if (!buyNow) {
            for (const item of order.items) {
              try {
                await CartService.deleteCartItem(item.cartItemId || item.id)
              } catch (err) {
                console.error('Error deleting cart item:', err)
              }
            }
          }
          setIsProcessing(false)
          setIsSuccess(true)
          setTimeout(() => {
            navigate('/don-hang')
          }, 2000)
        } else {
          setIsProcessing(false)
          setIsSuccess(false)
          message.error('Payment failed. Please try again.')
        }
      })
      .catch(error => {
        console.error('Error processing payment:', error)
        setIsProcessing(false)
        setIsSuccess(false)
        alert('Payment failed. Please try again.')
      })
  }

  const handleApplyVoucher = voucherObj => {
    setVoucher(voucherObj)
  }

  return (
    <div className='min-h-screen bg-gray-50 pb-10'>
      {/* Header */}
      {/* Payment Header Banner - Softer Colors */}
      <div className='relative overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100'>
        {/* Background Pattern */}
        <div className='absolute inset-0 bg-gradient-to-r from-blue-200/30 to-indigo-200/30'></div>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), 
                         radial-gradient(circle at 75% 75%, rgba(99, 102, 241, 0.08) 0%, transparent 50%)`,
          }}
        ></div>

        {/* Content Container */}
        <div className='relative px-4 py-12'>
          {/* Main Title Section */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='mb-8 text-center'
          >
            <div className='mb-4 flex items-center justify-center gap-4'>
              <div className='rounded-full border border-white/40 bg-white/60 p-3 shadow-lg backdrop-blur-sm'>
                <FaCreditCard className='text-3xl text-blue-600' />
              </div>
              <h1 className='text-5xl font-bold tracking-wide text-gray-700'>
                THANH TOÁN
              </h1>
            </div>
            <div className='mx-auto h-1 w-24 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent'></div>
          </motion.div>

          {/* Breadcrumb Navigation */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='flex justify-center'
          >
            <div className='rounded-full border border-white/60 bg-white/40 px-6 py-3 shadow-lg backdrop-blur-md'>
              <div className='flex items-center gap-3 text-sm font-medium text-gray-600'>
                <span
                  className='flex cursor-pointer items-center gap-1 transition-colors duration-300 hover:text-blue-600'
                  onClick={() => navigate('/trang-chu')}
                >
                  <span>🏠</span>
                  <span>Trang chủ</span>
                </span>
                <span className='text-gray-400'>→</span>
                <span
                  className='flex cursor-pointer items-center gap-1 transition-colors duration-300 hover:text-blue-600'
                  onClick={() => navigate('/gio-hang')}
                >
                  <span>🛒</span>
                  <span>Giỏ hàng</span>
                </span>
                <span className='text-gray-400'>→</span>
                <span
                  className='flex cursor-pointer items-center gap-1 transition-colors duration-300 hover:text-blue-600'
                  onClick={() => navigate('/thanh-toan')}
                >
                  <span>💳</span>
                  <span>Thanh toán</span>
                </span>
                <span className='text-gray-400'>→</span>
                <span className='flex items-center gap-1 font-semibold text-blue-600'>
                  <span>✅</span>
                  <span>Xác nhận thanh toán</span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Wave Effect */}
        <div className='absolute right-0 bottom-0 left-0'>
          <svg
            viewBox='0 0 1200 120'
            preserveAspectRatio='none'
            className='h-8 w-full fill-gray-50'
          >
            <path d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className='mx-auto max-w-4xl px-8'>
        <div className='grid gap-6 md:grid-cols-2'>
          <OrderSummary formData={formData} paymentMethod={paymentMethod} />
          <VoucherBox onApply={handleApplyVoucher} />
        </div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='rounded-xl bg-white shadow-lg md:p-6'
        >
          {/* Payment Status */}
          <div className='text-center'>
            {!isProcessing && !isSuccess && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleProcessPayment}
                className='w-full max-w-md rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-500'
              >
                Xác nhận thanh toán
              </motion.button>
            )}

            {isProcessing && (
              <div className='space-y-4'>
                <div className='mx-auto h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
                <p className='text-lg text-gray-600'>
                  Quá trình thanh toán đang được xử lý...
                </p>
              </div>
            )}

            {isSuccess && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className='space-y-4'
              >
                <FaCheckCircle className='mx-auto h-16 w-16 text-green-500' />
                <p className='text-lg text-gray-600'>Thanh toán thành công</p>
                <p className='text-sm text-gray-500'>
                  Đang chuyển hướng tới trang đơn hàng...
                </p>
              </motion.div>
            )}
          </div>

          {/* Order Details */}
          <div className='mt-4 border-t pt-2'>
            <h3 className='mb-2 text-lg font-semibold'>📦 Chi tiết đơn hàng</h3>
            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>Tạm tính</span>
                <span className='font-medium'>
                  {formatPrice(order?.subtotal || 0)}
                </span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>Phí vận chuyển</span>
                <span className='font-medium'>
                  {formatPrice(order.shipping || 0)}
                </span>
              </div>
              <div className='flex justify-between border-t pt-2 text-sm'>
                <span className='text-gray-600'>Voucher:</span>
                <span className='font-medium'>
                  -{formatPrice(discountValue)}
                </span>
              </div>
              <div className='flex justify-between border-t pt-4'>
                <span className='font-semibold'>Tổng cộng</span>
                <span className='text-lg font-bold'>
                  {formatPrice(order?.total - discountValue || 0)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Payment
