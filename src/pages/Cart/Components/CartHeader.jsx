import React from 'react'
import { FaShoppingBag } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const CartHeader = () => {
  const navigate = useNavigate()

  return (
    <div className='text-center'>
      {/* Header Banner - Softer Colors */}
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
              <div className='rounded-full bg-white/60 p-3 shadow-lg backdrop-blur-sm border border-white/40'>
                <FaShoppingBag className='text-3xl text-blue-600' />
              </div>
              <h1 className='text-5xl font-bold tracking-wide text-gray-700'>
                GIỎ HÀNG CỦA BẠN
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
                  onClick={() => navigate('/')}
                >
                  <span>🏠</span>
                  <span>Trang chủ</span>
                </span>
                <span className='text-gray-400'>→</span>
                <span className='flex items-center gap-1 font-semibold text-blue-600'>
                  <span>🛒</span>
                  <span>Giỏ hàng</span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Wave Effect - Softer */}
        <div className='absolute bottom-0 left-0 right-0'>
          <svg viewBox='0 0 1200 120' preserveAspectRatio='none' className='h-8 w-full fill-gray-50'>
            <path d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'></path>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default CartHeader