import React from 'react';
import { Star } from 'lucide-react';
import { useProductStore } from '../ProductStore';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { message } from 'antd';

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  }).format(price * 1000);
};

const calculateDiscountedPrice = (price, discountPercentage) => {
  return price * (1 - discountPercentage / 100);
};

const ProductCard = ({ product }) => {
  const { isAuthenticated } = useAuth();
  const {
    addCart,
    cartLoading
  } = useProductStore();
  const navigate = useNavigate();

  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 >= 0.5;

  const handleProductClick = () => {
    navigate(`/product/${product.id}`, {
      state: { product }
    });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    try {
      if (isAuthenticated) {
        addCart(product.id, 1);
      }
      else {
        message.error("Vui lòng đăng nhập để mua sản phẩm");
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  return (
    <div
      className="group relative h-full bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer border border-gray-100"
      onClick={handleProductClick} // Add onClick to the entire card
    >
      {/* Badge giảm giá */}
      {product.discountPercentage > 0 && (
        <div className="absolute top-3 right-3 z-10 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-sm">
          -{product.discountPercentage}%
        </div>
      )}

      {/* Badge thương hiệu */}
      {product.brand && (
        <div className="absolute top-3 left-3 z-10 bg-white/80 backdrop-blur-sm text-gray-800 text-xs px-2 py-1 rounded-sm border border-gray-200">
          {product.brand}
        </div>
      )}

      <div className="relative overflow-hidden h-32 md:h-48 lg:h-60">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Overlay khi hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Quick actions */}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-center space-x-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 rounded-full p-2 shadow-sm transition-colors"
            onClick={(e) => e.stopPropagation()} // Prevent navigation
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
              <path d="M3 6h18"></path>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </button>
          <button
            className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 rounded-full p-2 shadow-sm transition-colors"
            onClick={(e) => e.stopPropagation()} // Prevent navigation
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <button
            className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 rounded-full p-2 shadow-sm transition-colors"
            onClick={(e) => e.stopPropagation()} // Prevent navigation
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Nội dung */}
      <div className="p-4">
        {/* Danh mục */}
        <div className="text-xs text-blue-600 mb-1.5">{product.category}</div>

        {/* Tên sản phẩm */}
        <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 h-10 group-hover:text-blue-700 transition-colors">
          {product.title}
        </h3>

        {/* Đánh giá */}
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400 mr-1.5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="text-gray-300">
                {i < fullStars ? (
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                ) : i === fullStars && hasHalfStar ? (
                  <div className="relative">
                    <Star size={14} className="text-gray-300" />
                    <div className="absolute top-0 left-0 overflow-hidden w-1/2">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    </div>
                  </div>
                ) : (
                  <Star size={14} />
                )}
              </div>
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.rating})</span>
        </div>

        {/* Giá */}
        <div className="flex items-baseline">
          {product.discountPercentage > 0 ? (
            <>
              <span className="text-red-600 font-bold text-lg">
                {formatPrice(calculateDiscountedPrice(product.price, product.discountPercentage))}
              </span>
              <span className="text-gray-400 text-xs line-through ml-2">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-gray-800 font-bold text-lg">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>

      {/* Nút mua hàng */}
      <div className="px-4 pb-4 pt-0 mt-1">
        <button
          className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium rounded-md transition-colors flex items-center justify-center transform transition-all"
          onClick={handleAddToCart}
          disabled={cartLoading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
            <path d="M3 6h18"></path>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          {'Thêm vào giỏ'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;