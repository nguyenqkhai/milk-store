// src/components/OtpModal.jsx

import React from 'react';
import { Modal, Input } from 'antd';

const OtpModal = ({ 
  visible, 
  onCancel, 
  onOk, 
  email, 
  otp, 
  setOtp, 
  canResendOtp, 
  resendCountdown, 
  onResendOtp, 
  loading 
}) => {
  return (
    <Modal
      title="Xác thực tài khoản"
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText="Xác nhận"
      cancelText="Đóng"
      confirmLoading={loading}
      centered
    >
      <div className="py-4">
        <p className="mb-4">
          Mã xác thực đã được gửi đến email <strong>{email}</strong>
        </p>
        
        <Input
          placeholder="Nhập mã xác thực"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          className="w-full mb-4"
          size="large"
          maxLength={6}
        />
        
        <div className="text-center">
          {!canResendOtp ? (
            <span className="text-gray-500">
              Gửi lại mã sau {resendCountdown}s
            </span>
          ) : (
            <button
              onClick={onResendOtp}
              disabled={loading}
              className="text-blue-600 hover:text-blue-800"
            >
              Gửi lại mã xác thực
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default OtpModal;