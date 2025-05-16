import React, { useState } from 'react'
import {
  FiShoppingCart,
  FiHeart,
  FiShare2,
  FiMinus,
  FiPlus,
} from 'react-icons/fi'
import { useProductStore } from '../../Products/ProductStore';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1)
  const { addCart } = useProductStore();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const increaseQuantity = () => setQuantity(prev => prev + 1)
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1))
  const handleAddToCart = () => {

    try {
      if (isAuthenticated) {
        addCart(product.id, quantity);
        navigate('/gio-hang');
      }
      else {
        message.error("Vui lòng đăng nhập để mua sản phẩm");
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };
  const discountedPrice = product.discountPercentage
    ? Math.round(product.price * (1 - product.discountPercentage / 100))
    : product.price

  // Get dimensions from the product if available
  const dimensions = product.dimensions && product.dimensions.length > 0 ? product.dimensions[0] : null

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='mb-2 text-2xl font-bold text-gray-800 md:text-3xl'>
          {product.name}
        </h1>

        <div className='flex items-center space-x-4'>
          {/* Sao đánh giá */}
          <div className='flex items-center'>
            <div className='flex text-yellow-400'>
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  fill={
                    i < Math.round(product.rating) ? 'currentColor' : 'none'
                  }
                  viewBox='0 0 24 24'
                  className='h-5 w-5'
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
            <span className='ml-1 text-gray-500'>({product.rating})</span>
          </div>

          {/* Thông tin khác */}
          <span className='text-gray-500'>|</span>
          <span className='text-gray-500'>Mã SP: {product.sku}</span>
          <span className='text-gray-500'>|</span>
          <span className='text-gray-500'>Kho: {product.stockQuantity}</span>
        </div>
      </div>

      <div className='rounded-lg bg-gray-50 p-4'>
        {product.discountPercentage > 0 ? (
          <div className='flex items-center'>
            <span className='text-3xl font-bold text-blue-600'>
              {discountedPrice.toLocaleString()} đ
            </span>
            <span className='ml-2 text-lg text-gray-400 line-through'>
              {product.price.toLocaleString()} đ
            </span>
            <span className='ml-2 rounded-md bg-red-100 px-2 py-1 text-sm font-medium text-red-600'>
              -{Math.round(product.discountPercentage)}%
            </span>
          </div>
        ) : (
          <span className='text-3xl font-bold text-gray-800'>
            {product.price.toLocaleString()} đ
          </span>
        )}
      </div>

      <p className='text-gray-600'>{product.description}</p>

      <div className='flex items-center'>
        <span className='mr-4 font-medium text-gray-700'>Số lượng:</span>
        <div className='flex items-center overflow-hidden rounded-lg border border-gray-300'>
          <button
            onClick={decreaseQuantity}
            className='flex items-center justify-center bg-gray-100 px-3 py-2 text-gray-600 hover:bg-gray-200'
          >
            <FiMinus />
          </button>
          <input
            type='text'
            value={quantity}
            readOnly
            className='w-12 border-none text-center focus:outline-none'
          />
          <button
            onClick={increaseQuantity}
            className='flex items-center justify-center bg-gray-100 px-3 py-2 text-gray-600 hover:bg-gray-200'
          >
            <FiPlus />
          </button>
        </div>
      </div>

      <div className='flex flex-wrap gap-4'>
        <button className='flex flex-1 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700' onClick={handleAddToCart}>
          <FiShoppingCart className='mr-2' /> Thêm vào giỏ hàng
        </button>
        <button className='flex flex-1 items-center justify-center rounded-lg bg-orange-500 px-6 py-3 font-medium text-white hover:bg-orange-600'>
          Mua ngay
        </button>
        <button className='flex h-12 w-12 items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100'>
          <FiHeart />
        </button>
        <button className='flex h-12 w-12 items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100'>
          <FiShare2 />
        </button>
      </div>
    </div>
  )
}

export default ProductInfo