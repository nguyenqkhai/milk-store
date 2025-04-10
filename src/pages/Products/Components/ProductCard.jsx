import React from 'react'
import { Link } from 'react-router-dom'
import { toSlug } from '../../../utils/slug'
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi'
import { productPageConfig } from '../../../components/products/data'

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${toSlug(product.title)}`}
      state={{ product }}
      className='group block'
    >
      <div className={productPageConfig.cardClasses}>
        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <div className='absolute z-10 rounded-br-lg bg-red-500 px-2 py-1 text-xs font-bold text-white'>
            -{Math.round(product.discountPercentage)}%
          </div>
        )}

        {/* Product Image */}
        <div className='relative overflow-hidden'>
          <img
            src={product.thumbnail}
            alt={product.title}
            className={productPageConfig.imageClasses}
          />

          {/* Overlay with Actions */}
          <div className='absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100'>
            <button className='flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm transition-colors hover:bg-blue-600 hover:text-white'>
              <FiEye className='h-4 w-4' />
            </button>
            <button className='flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm transition-colors hover:bg-blue-600 hover:text-white'>
              <FiHeart className='h-4 w-4' />
            </button>
            <button className='flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm transition-colors hover:bg-blue-600 hover:text-white'>
              <FiShoppingCart className='h-4 w-4' />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className='flex flex-1 flex-col p-4'>
          {/* Category */}
          <p className='mb-1 text-xs font-medium tracking-wider text-blue-600 uppercase'>
            {product.category}
          </p>

          {/* Title */}
          <h2 className={productPageConfig.titleClasses}>{product.title}</h2>

          {/* Ratings */}
          <div className='mb-2 flex items-center'>
            <div className='flex text-yellow-400'>
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  fill={
                    i < Math.round(product.rating) ? 'currentColor' : 'none'
                  }
                  viewBox='0 0 24 24'
                  className='h-4 w-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                  />
                </svg>
              ))}
            </div>
            <span className='ml-1 text-xs text-gray-500'>
              ({product.rating})
            </span>
          </div>

          {/* Price */}
          <div className='mt-auto'>
            {product.discountPercentage > 0 ? (
              <div className='flex items-center'>
                <p
                  className={`${productPageConfig.priceClasses} text-blue-600`}
                >
                  {Math.round(
                    product.price * (1 - product.discountPercentage / 100)
                  ).toLocaleString()}{' '}
                  đ
                </p>
                <p className='ml-2 text-sm text-gray-400 line-through'>
                  {product.price.toLocaleString()} đ
                </p>
              </div>
            ) : (
              <p className={productPageConfig.priceClasses}>
                {product.price.toLocaleString()} đ
              </p>
            )}
          </div>
        </div>

        {/* Buy Button */}
        <div className='cursor-pointer px-4 pb-4'>
          <button className={productPageConfig.buttonClasses}>
            <span className='flex items-center justify-center gap-2'>
              <FiShoppingCart className='h-4 w-4' />
              Mua ngay
            </span>
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
