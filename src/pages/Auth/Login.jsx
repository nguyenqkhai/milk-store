import React, { useState } from 'react';
import { Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import apiConfig from '../../config/apiConfig';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values) => {
        setLoading(true);
        try {
<<<<<<< HEAD
            const result = await login(values.username, values.password);
            if (result.success) {
                messageApi.open({
                    type: 'success',
                    content: 'Đăng nhập thành công!',
                    duration: 4,
                });
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                messageApi.open({
                    type: 'error',
                    content: result.error || 'Đăng nhập thất bại',
                    duration: 3,
                });
            }
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Có lỗi xảy ra khi đăng nhập',
                duration: 3,
            });
=======
            // Gọi API đăng nhập
            const response = await axios.post(
                `${apiConfig.API_BASE_URL}${apiConfig.AUTH.LOGIN}`, 
                {
                    username: values.username,
                    password: values.password
                }
            );
            
            if (response.status === 200 && response.data) {
                // Gọi hàm login từ context để lưu token và cập nhật trạng thái
                const result = login(response.data);
                
                if (result.success) {
                    message.success('Đăng nhập thành công!');
                    navigate('/');
                } else {
                    message.error(result.error || 'Đăng nhập thất bại');
                }
            }
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            
            if (error.response) {
                // Hiển thị thông báo lỗi từ server nếu có
                message.error(error.response.data.message || 'Thông tin đăng nhập không chính xác');
            } else {
                message.error('Không thể kết nối đến máy chủ, vui lòng thử lại sau');
                
                // Tạm thời đăng nhập với thông tin giả nếu đang trong môi trường phát triển
                if (import.meta.env.DEV) {
                    // Fake login cho development
                    const fakeData = {
                        accessToken: 'fake-token',
                        refreshToken: 'fake-refresh-token'
                    };
                    login(fakeData);
                    message.success('Đăng nhập (dev mode) thành công!');
                    navigate('/');
                }
            }
>>>>>>> 36f64d078968078ecf389dfde4b6a89a6420c19b
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
<<<<<<< HEAD
        messageApi.open({
            type: 'warning',
            content: 'Vui lòng kiểm tra lại thông tin đăng nhập',
            duration: 3,
        });
=======
        console.log('Lỗi:', errorInfo);
>>>>>>> 36f64d078968078ecf389dfde4b6a89a6420c19b
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-600 flex items-center justify-center p-4">
            {contextHolder}
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
                            Chào mừng trở lại
                        </motion.h1>
                        
                    </div>

                    <Form
                        name="basic"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className="flex-1"
                    >
                        <Form.Item
                            label={<span className="text-sm font-medium">Tên người dùng</span>}
                            name="username"
                            rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
                            className="mb-3"
                        >
                            <Input 
                                size="middle" 
                                className="rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500"
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-sm font-medium">Mật khẩu</span>}
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                            className="mb-4"
                        >
                            <Input.Password 
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
                                        Đang đăng nhập...
                                    </span>
                                ) : 'Đăng nhập'}
                            </button>
                        </motion.div>
                    </Form>

                    <div className="mt-5 text-center">
                        <p className="text-gray-600 text-sm mb-2">Chưa có tài khoản?</p>
                        <motion.button 
                            onClick={() => navigate('/dang-ky')}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm transition duration-200"
                        >
                            Tạo tài khoản mới
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

export default Login;