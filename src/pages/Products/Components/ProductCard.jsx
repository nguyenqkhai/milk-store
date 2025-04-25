import React from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi'
import { toSlug } from '../../../utils/slug'
import { productPageConfig } from '../../../components/products/data'

const ProductCard = ({ product, onAddToCart, allProducts }) => {
  return (
    <div className="group relative">
      <Link
        to={`/product/${product.id}`}
        state={{ product, allProducts }}
        className="block"
      >
        <div className="relative overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
          {/* Discount Badge */}
          {product.discountPercentage > 0 && (
            <div className="absolute top-0 right-0 z-10 rounded-bl-lg bg-red-500 px-2 py-1 text-xs font-bold text-white">
              -{Math.round(product.discountPercentage)}%
            </div>
          )}

          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-10"></div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-blue-600">
              {product.category}
            </p>
            <h2 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-1">
              {product.title}
            </h2>
            <div className="mb-2 flex items-center">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    fill={i < Math.round(product.rating) ? 'currentColor' : 'none'}
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                ))}
              </div>
              <span className="ml-1 text-xs text-gray-500">({product.rating})</span>
            </div>
            <div className="flex items-center justify-between">
              {product.discountPercentage > 0 ? (
                <div className="flex items-center">
                  <p className="text-lg font-bold text-blue-600">
                    {Math.round(
                      product.price * (1 - product.discountPercentage / 100)
                    ).toLocaleString()}{' '}
                    đ
                  </p>
                  <p className="ml-2 text-sm text-gray-400 line-through">
                    {product.price.toLocaleString()} đ
                  </p>
                </div>
              ) : (
                <p className="text-lg font-bold text-gray-900">
                  {product.price.toLocaleString()} đ
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <button 
          className="rounded-full bg-white p-2 text-gray-700 shadow-md hover:bg-blue-600 hover:text-white"
          onClick={(e) => {
            e.preventDefault();
            onAddToCart(product);
          }}
        >
          <FiShoppingCart className="h-5 w-5" />
        </button>
        <button className="rounded-full bg-white p-2 text-gray-700 shadow-md hover:bg-blue-600 hover:text-white">
          <FiHeart className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

export default ProductCard
