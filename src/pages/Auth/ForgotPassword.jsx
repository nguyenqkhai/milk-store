import React, { useState } from 'react';
import { Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

function ForgotPassword() {
    const { forgotPassword } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const result = await forgotPassword(values.email);

            if (result.success) {
                message.success(result.message || 'Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn');
                form.resetFields();
            } else {
                message.error(result.error || 'Có lỗi xảy ra, vui lòng thử lại sau');
            }
        } catch (error) {
            console.error('Lỗi gửi yêu cầu đặt lại mật khẩu:', error);
            message.error('Không thể kết nối đến máy chủ, vui lòng thử lại sau');
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Lỗi:', errorInfo);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-600 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row"
            >
                {/* Left Side - Form */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
                    <div className="text-center mb-6">
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl font-bold text-gray-800"
                        >
                            Quên mật khẩu
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-gray-600 mt-2"
                        >
                            Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu
                        </motion.p>
                    </div>

                    <Form
                        form={form}
                        name="forgotPassword"
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className="flex-1"
                    >
                        <Form.Item
                            label={<span className="text-sm font-medium">Email</span>}
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email!' },
                                { type: 'email', message: 'Email không hợp lệ!' }
                            ]}
                            className="mb-4"
                        >
                            <Input
                                size="middle"
                                className="rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500"
                            />
                        </Form.Item>

                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Đang gửi...
                                    </span>
                                ) : 'Gửi yêu cầu'}
                            </button>
                        </motion.div>
                    </Form>

                    <div className="mt-5 text-center">
                        <motion.button
                            onClick={() => navigate('/dang-nhap')}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm transition duration-200"
                        >
                            Quay lại đăng nhập
                        </motion.button>
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className="hidden md:block w-1/2 relative bg-blue-600">
                    <img
                        src={"https://res.cloudinary.com/dwbcqjupj/image/upload/v1745990380/milkstore_qildau.jpg"}
                        alt="Milk Store"
                        className="w-full h-full object-cover opacity-90"
                    />
                </div>
            </motion.div>
        </div>
    );
}

export default ForgotPassword;
