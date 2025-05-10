import React, { useState } from 'react';
import { Form, Input, Checkbox, message } from 'antd';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        if (values.password !== values.confirmPassword) {
            message.error('Mật khẩu không khớp!');
            return;
        }

        if (!values.agreement) {
            message.error('Vui lòng chấp nhận điều khoản sử dụng');
            return;
        }

        setLoading(true);
        try {
            const fullName = `${values.lastName} ${values.middleName} ${values.firstName}`.trim();
            const result = await register(
                values.username,
                values.email,
                values.password,
                fullName,
                values.phone
            );
            
            if (result.success) {
                message.success('Đăng ký thành công!');
                navigate('/dang-nhap');
            } else {
                message.error(result.error || 'Đăng ký thất bại');
            }
        } catch (error) {
            message.error('Có lỗi xảy ra khi đăng ký');
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // Milk animation variants
    const milkVariants = {
        initial: { opacity: 0 },
        animate: { 
            opacity: [0, 0.3, 0],
            transition: {
                duration: 8,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Realistic milk background animation */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Milk splash elements */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white rounded-full"
                        style={{
                            width: `${100 + Math.random() * 200}px`,
                            height: `${100 + Math.random() * 200}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            filter: 'blur(30px)',
                            opacity: 0.2
                        }}
                        variants={milkVariants}
                        initial="initial"
                        animate="animate"
                        transition={{
                            delay: Math.random() * 5,
                            duration: 10 + Math.random() * 10
                        }}
                    />
                ))}

                {/* Flowing milk streams */}
                <motion.div
                    className="absolute bg-white"
                    style={{
                        width: '150%',
                        height: '80px',
                        top: '20%',
                        left: '-50%',
                        filter: 'blur(20px)',
                        opacity: 0.15,
                        borderRadius: '50%',
                        transform: 'rotate(-5deg)'
                    }}
                    animate={{
                        x: ['0%', '100%', '0%']
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                <motion.div
                    className="absolute bg-white"
                    style={{
                        width: '150%',
                        height: '120px',
                        top: '50%',
                        left: '-50%',
                        filter: 'blur(25px)',
                        opacity: 0.2,
                        borderRadius: '50%',
                        transform: 'rotate(3deg)'
                    }}
                    animate={{
                        x: ['0%', '100%', '0%']
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 5
                    }}
                />

                <motion.div
                    className="absolute bg-white"
                    style={{
                        width: '150%',
                        height: '60px',
                        top: '70%',
                        left: '-50%',
                        filter: 'blur(15px)',
                        opacity: 0.1,
                        borderRadius: '50%',
                        transform: 'rotate(-2deg)'
                    }}
                    animate={{
                        x: ['0%', '100%', '0%']
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 8
                    }}
                />
            </div>

            {/* Register card */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-4xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row relative z-10 border border-white/20 mt-16"
            >
                {/* Left Side - Form */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
                    <Form
                        form={form}
                        name="register"
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className="flex-1"
                        scrollToFirstError
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <Form.Item
                                label={<span className="text-sm font-medium">Họ</span>}
                                name="lastName"
                                rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}
                            >
                                <Input className="rounded-lg" />
                            </Form.Item>

                            <Form.Item
                                label={<span className="text-sm font-medium">Tên đệm</span>}
                                name="middleName"
                            >
                                <Input className="rounded-lg" />
                            </Form.Item>

                            <Form.Item
                                label={<span className="text-sm font-medium">Tên</span>}
                                name="firstName"
                                rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                            >
                                <Input className="rounded-lg" />
                            </Form.Item>
                        </div>

                        <Form.Item
                            label={<span className="text-sm font-medium">Tên đăng nhập</span>}
                            name="username"
                            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                            className="mt-2"
                        >
                            <Input className="rounded-lg" />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-sm font-medium">Email</span>}
                            name="email"
                            rules={[
                                { 
                                    required: true, 
                                    message: 'Vui lòng nhập email!' 
                                },
                                {
                                    type: 'email',
                                    message: 'Email không hợp lệ!',
                                },
                            ]}
                        >
                            <Input className="rounded-lg" />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-sm font-medium">Số điện thoại</span>}
                            name="phone"
                            rules={[
                                { 
                                    required: true, 
                                    message: 'Vui lòng nhập số điện thoại!' 
                                },
                                {
                                    pattern: /^[0-9]{10,11}$/,
                                    message: 'Số điện thoại không hợp lệ!',
                                },
                            ]}
                        >
                            <Input className="rounded-lg" />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-sm font-medium">Mật khẩu</span>}
                            name="password"
                            rules={[
                                { 
                                    required: true, 
                                    message: 'Vui lòng nhập mật khẩu!' 
                                },
                                {
                                    min: 6,
                                    message: 'Mật khẩu phải có ít nhất 6 ký tự!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password className="rounded-lg" />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-sm font-medium">Nhập lại mật khẩu</span>}
                            name="confirmPassword"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập lại mật khẩu!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu không khớp!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password className="rounded-lg" />
                        </Form.Item>

                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject(new Error('Bạn cần chấp nhận điều khoản')),
                                },
                            ]}
                            className="mb-2"
                        >
                            <Checkbox>
                                Tôi đã đọc và chấp nhận <a href="/terms" className="text-blue-600">điều khoản sử dụng</a> và <a href="/privacy" className="text-blue-600">chính sách bảo mật</a>
                            </Checkbox>
                        </Form.Item>

                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#8ecae6] hover:bg-[#219ebc] text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Đang đăng ký...
                                    </span>
                                ) : 'Đăng ký'}
                            </button>
                        </motion.div>
                    </Form>

                    <div className="mt-4 text-center">
                        <span className="text-gray-600 text-sm mr-2">Đã có tài khoản?</span>
                        <motion.button 
                            onClick={() => navigate('/dang-nhap')}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="text-[#219ebc] hover:text-[#023047] font-medium text-sm transition duration-200"
                        >
                            Đăng nhập ngay
                        </motion.button>
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className="hidden md:block w-1/2 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#8ecae6]/30 to-[#219ebc]/30"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                        alt="Milk bottles"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-white text-center p-6"
                        >
                            <h2 className="text-2xl font-bold mb-2 text-shadow">Sản phẩm sữa tươi ngon</h2>
                            <p className="text-shadow">Chất lượng cao, giao hàng tận nơi</p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Register;