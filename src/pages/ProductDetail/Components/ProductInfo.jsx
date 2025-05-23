import { message } from 'antd'
import React, { useState } from 'react'
import { FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { useProductStore } from '../../Products/ProductStore'

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1)
  const { addCart } = useProductStore()
  const { isAuthenticated } = useAuth()
  const [shipping] = useState(20000)
  const navigate = useNavigate()
  
  const increaseQuantity = () => setQuantity(prev => prev + 1)
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1))
  
  const handleAddToCart = () => {
    try {
      if (isAuthenticated) {
        addCart(product.id, quantity)
        navigate('/gio-hang')
      } else {
        message.error('Vui lòng đăng nhập để mua sản phẩm')
      }
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng:', error)
    }
  }

  // FIX: Sử dụng giá đúng từ product
  const currentPrice = product.discountPercentage > 0 ? product.priceActive : product.priceDefault
  const subtotal = currentPrice * quantity
  const total = subtotal + shipping

  // Get dimensions from the product if available
  const dimensions =
    product.dimensions && product.dimensions.length > 0
      ? product.dimensions[0]
      : null

  // FIX: Tạo buyNow object với dữ liệu đúng
  const buyNow = {
    items: [
      {
        productId: product.id,
        quantity: quantity,
        price: currentPrice,
        name: product.name, // Thêm tên sản phẩm để debug
      },
    ],
    shipping: shipping,
    subtotal: subtotal,
    total: total,
  }

  // FIX: Thêm function để handle buy now
  const handleBuyNow = () => {
    if (!isAuthenticated) {
      message.error('Vui lòng đăng nhập để mua sản phẩm')
      return
    }

    console.log('Buy Now Data:', buyNow) // Debug log
    
    navigate('/thanh-toan', {
      state: {
        order: buyNow,
        buyNow: true,
        // Thêm thông tin sản phẩm để debug
        productInfo: {
          id: product.id,
          name: product.name,
          price: currentPrice,
          quantity: quantity
        }
      },
    })
  }

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='mb-2 text-2xl font-bold text-gray-800 md:text-3xl'>
          {product.name}
        </h1>

        <div className='flex items-center space-x-4'>
          {/* Thông tin khác */}
          <span className='text-gray-500'>Mã SP: {product.sku}</span>
          <span className='text-gray-500'>|</span>
          <span className='text-gray-500'>Kho: {product.stockQuantity}</span>
        </div>
      </div>

      <div className='rounded-lg bg-gray-50 p-4'>
        {product.discountPercentage > 0 ? (
          <div className='flex items-center'>
            <span className='text-3xl font-bold text-blue-600'>
              {product.priceActive.toLocaleString()} đ
            </span>
            <span className='ml-2 text-lg text-gray-400 line-through'>
              {product.priceDefault.toLocaleString()} đ
            </span>
            <span className='ml-2 rounded-md bg-red-100 px-2 py-1 text-sm font-medium text-red-600'>
              -{Math.round(product.discountPercentage)}%
            </span>
          </div>
        ) : (
          <span className='text-3xl font-bold text-gray-800'>
            {product.priceDefault.toLocaleString()} đ
          </span>
        )}
      </div>

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

      {/* FIX: Debug info - có thể xóa sau khi fix xong */}
      <div className='rounded border bg-yellow-50 p-2 text-xs'>
        <strong>Debug Info:</strong>
        <br />
        Current Price: {currentPrice?.toLocaleString()} đ
        <br />
        Subtotal: {subtotal?.toLocaleString()} đ
        <br />
        Total: {total?.toLocaleString()} đ
      </div>

      <div className='mt-12 flex flex-wrap gap-4'>
        <button
          className='flex flex-1 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700'
          onClick={handleAddToCart}
        >
          <FiShoppingCart className='mr-2' /> Thêm vào giỏ hàng
        </button>
        <button
          onClick={handleBuyNow}
          className='flex flex-1 items-center justify-center rounded-lg bg-orange-500 px-6 py-3 font-medium text-white hover:bg-orange-600'
        >
          Mua ngay
        </button>
      </div>
    </div>
  )
}

export default ProductInfo