import React from 'react'
import { Star } from 'lucide-react'
import { useProductStore } from '../ProductStore'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { message } from 'antd'

const formatPrice = price => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(price * 1)
}

const calculateDiscountedPrice = (price, discountPercentage) => {
  return price * (1 - discountPercentage / 100)
}

const ProductCard = ({ product }) => {
  const { isAuthenticated } = useAuth()
  const { addCart, cartLoading } = useProductStore()
  const navigate = useNavigate()

  const fullStars = Math.floor(product.rating)
  const hasHalfStar = product.rating % 1 >= 0.5

  const handleProductClick = () => {
    navigate(`/san-pham/${product.id}`, {
      state: { product },
    })
  }

  const handleAddToCart = e => {
    e.stopPropagation()
    try {
      if (isAuthenticated) {
        addCart(product.id, 1)
        navigate('/gio-hang')
      } else {
        message.error('Vui lòng đăng nhập để mua sản phẩm')
      }
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng:', error)
    }
  }

  return (
    <div
      className='group relative h-full cursor-pointer overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md'
      onClick={handleProductClick} // Add onClick to the entire card
    >
      {/* Badge giảm giá */}
      {product.discountPercentage > 0 && (
        <div className='absolute top-3 right-3 z-10 rounded-sm bg-red-500 px-2 py-1 text-xs font-medium text-white'>
          -{product.discountPercentage}%
        </div>
      )}

      {/* Badge thương hiệu */}
      {product.brand && (
        <div className='absolute top-3 left-3 z-10 rounded-sm border border-gray-200 bg-white/80 px-2 py-1 text-xs text-gray-800 backdrop-blur-sm'>
          {product.brand}
        </div>
      )}

      <div className='relative h-32 overflow-hidden md:h-48 lg:h-60'>
        <img
          src={product.thumbnail}
          alt={product.title}
          className='h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105'
          loading='lazy'
        />

        {/* Overlay khi hover */}
        <div className='absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100'></div>
      </div>

      {/* Nội dung */}
      <div className='p-4'>
        {/* Danh mục */}
        <div className='mb-1.5 text-xs text-blue-600'>{product.category}</div>

        {/* Tên sản phẩm */}
        <h3 className='mb-2 line-clamp-2 h-10 text-sm font-medium text-gray-900 transition-colors group-hover:text-blue-700'>
          {product.title}
        </h3>

        {/* Đánh giá */}
        <div className='mb-3 flex items-center'>
          <div className='mr-1.5 flex text-yellow-400'>
            {[...Array(5)].map((_, i) => (
              <div key={i} className='text-gray-300'>
                {i < fullStars ? (
                  <Star size={14} className='fill-yellow-400 text-yellow-400' />
                ) : i === fullStars && hasHalfStar ? (
                  <div className='relative'>
                    <Star size={14} className='text-gray-300' />
                    <div className='absolute top-0 left-0 w-1/2 overflow-hidden'>
                      <Star
                        size={14}
                        className='fill-yellow-400 text-yellow-400'
                      />
                    </div>
                  </div>
                ) : (
                  <Star size={14} />
                )}
              </div>
            ))}
          </div>
          <span className='text-xs text-gray-500'>({product.rating})</span>
        </div>

        {/* Giá */}
        <div className='flex items-baseline'>
          {product.discountPercentage > 0 ? (
            <>
              <span className='text-lg font-bold text-red-600'>
                {formatPrice(
                  calculateDiscountedPrice(
                    product.price,
                    product.discountPercentage
                  )
                )}
              </span>
              <span className='ml-2 text-xs text-gray-400 line-through'>
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className='text-lg font-bold text-gray-800'>
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>

      {/* Nút mua hàng */}
      <div className='mt-1 px-4 pt-0 pb-4'>
        <button
          className='flex w-full transform items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-blue-700 py-2 text-sm font-medium text-white transition-all transition-colors hover:from-blue-700 hover:to-blue-800'
          onClick={handleAddToCart}
          disabled={cartLoading}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='18'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2'
          >
            <path d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z'></path>
            <path d='M3 6h18'></path>
            <path d='M16 10a4 4 0 0 1-8 0'></path>
          </svg>
          {'Thêm vào giỏ'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard
