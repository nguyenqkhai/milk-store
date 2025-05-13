import React from 'react';
import { Star } from 'lucide-react';

<<<<<<< HEAD
const ProductCard = ({ product, onAddToCart, allProducts, renderLink = true }) => {
  // Card content that will be used in both cases
  const cardContent = (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <div className="absolute top-2 left-2 z-10 rounded-lg bg-red-500 px-2 py-1 text-xs font-bold text-white">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}
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
  );

  return (
    <div className="group relative">
      {renderLink ? (
        <Link
          to={`/product/${product.id}`}
          state={{ product, allProducts }}
          className="block"
        >
          {cardContent}
        </Link>
      ) : (
        // If we're already wrapped in a Link, just render the content
        cardContent
      )}

      {/* Action Buttons */}
      <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          className="rounded-full bg-white p-2 text-gray-700 shadow-md hover:bg-blue-600 hover:text-white"
          onClick={(e) => {
            e.preventDefault();
            if (onAddToCart) onAddToCart(product);
          }}
        >
          <FiShoppingCart className="h-5 w-5" />
        </button>
        <button className="rounded-full bg-white p-2 text-gray-700 shadow-md hover:bg-blue-600 hover:text-white">
          <FiHeart className="h-5 w-5" />
=======
// Format giá tiền thành VND
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  }).format(price * 1000); // Nhân với 1000 vì giá trong dữ liệu đang ở dạng nghìn đồng
};

// Tính giá sau khi giảm giá
const calculateDiscountedPrice = (price, discountPercentage) => {
  return price * (1 - discountPercentage / 100);
};

const ProductCard = ({ product }) => {
  // Tính số sao hiển thị
  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 >= 0.5;
  
  return (
    <div className="group relative h-full bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer border border-gray-100">
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
      
      {/* Ảnh sản phẩm */}
      <div className="relative overflow-hidden h-40 md:h-48">
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
          <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 rounded-full p-2 shadow-sm transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
              <path d="M3 6h18"></path>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </button>
          <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 rounded-full p-2 shadow-sm transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 rounded-full p-2 shadow-sm transition-colors">
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
        <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium rounded-md transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
            <path d="M3 6h18"></path>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          Thêm vào giỏ
>>>>>>> 36f64d078968078ecf389dfde4b6a89a6420c19b
        </button>
      </div>
    </div>
  );
};

export default ProductCard;