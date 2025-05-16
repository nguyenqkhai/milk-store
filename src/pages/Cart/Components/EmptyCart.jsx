import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">Giỏ hàng của bạn đang trống</h2>
      <Link to="/san-pham" className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2">
        <span>←</span> Tiếp tục mua sắm
      </Link>
    </div>
  );
};

export default EmptyCart;