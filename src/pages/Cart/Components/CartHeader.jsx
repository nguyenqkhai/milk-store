import React from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CartHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <div className="m-auto bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200 h-44 w-full px-4 py-3 mb-6 shadow-md">
        <div className="flex mt-4 justify-center items-center gap-3">
          <FaShoppingBag className="text-4xl text-blue-800" />
          <h1 className="text-4xl font-bold tracking-wide text-blue-800 drop-shadow-sm uppercase">
            Giỏ hàng của bạn
          </h1>
        </div>
        
        <div className="w-fit mx-auto">
          <div className="mt-5 px-4 py-2 bg-white rounded-full shadow text-sm text-gray-600 flex items-center gap-1">
            <span 
              className="hover:text-blue-20 0 cursor-pointer transition" 
              onClick={() => navigate('/')} // Chuyển đến trang chủ
            >
              Home
            </span>
            <span>→</span>
            <span className="font-medium">Cart</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartHeader;