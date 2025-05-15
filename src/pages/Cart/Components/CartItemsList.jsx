import React from 'react';
import { Link } from 'react-router-dom';

const CartItemsList = ({ items, itemCount, handleUpdateQuantity, handleRemoveItem }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Giỏ hàng ({itemCount} sản phẩm)</h2>
      
      <div className="grid grid-cols-12 gap-4 text-sm text-gray-600 mb-4 border-b pb-3">
        <div className="col-span-6">Chi tiết sản phẩm</div>
        <div className="col-span-2 text-center">Giá</div>
        <div className="col-span-2 text-center">Số lượng</div>
        <div className="col-span-2 text-center">Tổng</div>
      </div>
      
      {items.map((item) => (
        <div key={item.id} className="grid grid-cols-12 gap-4 py-4 border-b border-gray-100 items-center relative group">
          <div className="col-span-6">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">Kích thước: {item.size}</p>
              </div>
            </div>
          </div>
          {/* <div className="col-span-2 text-center text-gray-800">{formatPrice(item.price)}</div> */}
          <div className="col-span-2 text-center text-gray-800">
            <div>{formatPrice(item.price)}</div>
            {item.price !== item.priceDefault && (
              <div className="text-sm text-red-500 line-through">{formatPrice(item.priceDefault)}</div>
            )}
          </div>
          <div className="col-span-2">
            <div className="flex items-center justify-center">
              <button
                className={`w-8 h-8 border border-gray-300 rounded-l flex items-center justify-center hover:bg-gray-100 transition-colors ${item.quantity <= 1 ? 'cursor-not-allowed' : ''}`}
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <input
                type="text"
                className="w-12 h-8 border-y border-gray-300 text-center text-gray-800"
                value={item.quantity}
                readOnly
              />
              <button
                className={`w-8 h-8 border border-gray-300 rounded-r flex items-center justify-center hover:bg-gray-100 transition-colors ${item.quantity >= item.available ? 'cursor-not-allowed' : ''}`}
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                disabled={item.quantity >= item.available}
              >
                +
              </button>
            </div>
          </div>
          <div className="col-span-2 text-center text-gray-800">
            <div>{formatPrice(item.price * item.quantity)}</div>
            {item.price !== item.priceDefault && (
              <div className="text-sm text-red-500 line-through">{formatPrice(item.priceDefault * item.quantity)}</div>
            )}
          </div>
          <button 
            onClick={() => handleRemoveItem(item.id)}
            className="absolute right-0 text-gray-400 hover:text-red-500 text-xl opacity-0 group-hover:opacity-100 transition-opacity"
          >
            ×
          </button>
        </div>
      ))}
      
      <div className="mt-6">
        <Link to="/product" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
          <span>←</span> Tiếp tục mua sắm
        </Link>
      </div>
    </div>
  );
};

export default CartItemsList;
