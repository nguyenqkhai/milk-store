import { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa6'
import { FaCreditCard, FaMoneyBillWave, FaCashRegister } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'

const Checkout = () => {
  const navigate = useNavigate()
  const [onPayOS, setOnPayOS] = useState(true)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    state: '',
    city: '',
    zipCode: '',
  })
  const location = useLocation()
  const order = location.state?.order || {}
  const buyNow = location.state?.buyNow || false

  const handleCheckout = () => {
    navigate('/xac-nhan-thanh-toan', {
      state: {
        order: order,
        formData,
        paymentMethod: onPayOS ? 'payos' : 'cash',
        buyNow: buyNow,
      },
    })
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='flex min-h-screen flex-col justify-center bg-gray-50 pb-10'
    >
      {/* Checkout Header Banner - Softer Colors */}
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
                <FaCashRegister className='text-3xl text-blue-600' />
              </div>
              <h1 className='text-5xl font-bold tracking-wide text-gray-700'>
                TIẾN HÀNH THANH TOÁN
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
                <span className='flex items-center gap-1 font-semibold text-blue-600'>
                  <span>💳</span>
                  <span>Thanh toán</span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>

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
      <div className='mx-auto w-full max-w-4xl px-4'>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='rounded-xl bg-white shadow-lg md:p-8'
        >
          {/* Billing Information */}
          <h2 className='mb-4 text-2xl font-semibold text-gray-800'>
            Thông tin thanh toán
          </h2>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Họ
                </label>
                <input
                  type='text'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className='w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-1 focus:outline-none'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className='w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-1 focus:outline-none'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Thành phố
                </label>
                <input
                  type='text'
                  name='city'
                  value={formData.city}
                  onChange={handleInputChange}
                  className='w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-1 focus:outline-none'
                />
              </div>
            </div>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Tên
                </label>
                <input
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className='w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-1 focus:outline-none'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Tỉnh
                </label>
                <input
                  type='text'
                  name='state'
                  value={formData.state}
                  onChange={handleInputChange}
                  className='w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-1 focus:outline-none'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Mã bưu chính
                </label>
                <input
                  type='text'
                  name='zipCode'
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className='w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-1 focus:outline-none'
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className='mt-6'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-800'>
              Phương thức thanh toán
            </h2>
            <div className='space-y-4'>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                  onPayOS
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setOnPayOS(true)}
              >
                <div className='flex items-center space-x-3'>
                  <FaCreditCard
                    className={`text-xl ${onPayOS ? 'text-blue-500' : 'text-gray-400'}`}
                  />
                  <span className='font-medium'>PayOS</span>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                  !onPayOS
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setOnPayOS(false)}
              >
                <div className='flex items-center space-x-3'>
                  <FaMoneyBillWave
                    className={`text-xl ${!onPayOS ? 'text-blue-500' : 'text-gray-400'}`}
                  />
                  <span className='font-medium'>Thanh toán khi nhận hàng</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Checkout Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCheckout}
            className='mt-4 flex w-full items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-500'
          >
            <span>Hoàn tất thanh toán</span>
            <FaArrowRight />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Checkout
