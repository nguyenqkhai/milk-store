import React from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const CartSummary = ({ subTotal, shipping, grandTotal, checkedItems }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const order = {
      items: checkedItems,
      subtotal: subTotal,
      total: grandTotal,
      shipping: shipping
    };

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!checkedItems || checkedItems.length === 0) {
      // message.error('Bạn phải chọn đơn hàng để tiến hành thanh toán');
      return;
    }
    navigate('/thanh-toan', { state: { order } });
  };
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Tóm tắt đơn hàng</h2>
      <div className="mb-4 text-sm">
        <span className="text-gray-600">Sản phẩm đã chọn: </span>
        <span className="font-medium">{checkedItems?.length || 0}</span>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <h3 className="font-medium mb-4">Chi tiết giá:</h3>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Tạm tính</span>
            <span className="font-medium">{formatPrice(subTotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Phí vận chuyển</span>
            <span className="font-medium">{formatPrice(shipping)}</span>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 mb-6">
          <div className="flex justify-between">
            <span className="text-lg font-semibold">Tổng cộng</span>
            <span className="text-lg font-semibold text-black-500">{formatPrice(grandTotal)}</span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className={`w-full px-4 py-2.5 rounded-lg font-medium shadow-md transition duration-300 flex items-center justify-center gap-2 ${
            checkedItems?.length > 0
              ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:shadow-lg hover:from-blue-600 hover:to-blue-800 cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Tiến hành thanh toán <span>→</span>
        </button>

        <div className="mt-6 text-xs text-center text-gray-500">
          <p>Thanh toán an toàn. Dễ dàng đổi trả.</p>
          <p>100% sản phẩm chính hãng</p>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;