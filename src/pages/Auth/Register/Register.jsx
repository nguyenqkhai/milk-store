import React, { useState } from 'react';
import { Form, message, Steps } from 'antd';
import { useNavigate } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import OtpModal from './components/OtpModal';
import { useAuth } from '../../../context/AuthContext';
import { motion } from 'framer-motion';

function Register() {
  const { register, sendOtp } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [canResendOtp, setCanResendOtp] = useState(true);
  const [resendCountdown, setResendCountdown] = useState(0);

  const handleSendOtp = async (emailToSend = null) => {
    const emailAddress = emailToSend || email;

    if (!emailAddress) {
      message.error('Vui lòng nhập email!');
      return false;
    }

    setLoading(true);
    try {
      const response = await sendOtp(emailAddress);

      if (response.success) {
        message.success('Mã OTP đã được gửi đến email của bạn!');
        setEmail(emailAddress);
        setOtpModalVisible(true);
        setCurrentStep(1);

        setCanResendOtp(false);
        setResendCountdown(60);

        const timer = setInterval(() => {
          setResendCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              setCanResendOtp(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return true;
      }
      return false;
    } catch (error) {
      console.error('Lỗi gửi OTP:', error);
      if (error.response) {
        console.log('Error response data:', error.response.data);

        if (error.response?.data?.message) {
          message.error(error.response.data.message);
        } else {
          message.error('Không thể gửi mã OTP, vui lòng thử lại sau');
        }
      } else if (error.request) {
        message.error('Không nhận được phản hồi từ server');
      } else {
        message.error('Lỗi khi thiết lập yêu cầu');
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Xác thực OTP
  const handleVerifyOtp = async () => {
    if (!otp || !email || !formData) {
      message.error('Vui lòng nhập mã OTP');
      return;
    }

    setLoading(true);
    try {
      // Dữ liệu gửi đi để xác thực OTP
      const requestData = {
        username: formData.username,
        password: formData.password,
        confirmPassword: formData.password,
        email: email,
        otp: otp,
        surname: formData.lastName,
        middlename: formData.middleName || "",
        firstname: formData.firstName,
        phoneNumber: formData.phone,
        address: formData.address || "",
        avatar: "",
        dob: new Date().toISOString(),
        gender: formData.gender || "Nam"
      };

      console.log("Verifying OTP with data:", requestData);

      const response = await register(requestData);

      if (response.success) {
        message.success('Đăng ký thành công!');
        setOtpModalVisible(false);
        navigate('/dang-nhap');
      }
    } catch (error) {
      console.error('Lỗi xác thực OTP:', error);
      // Log thêm chi tiết lỗi
      if (error.response) {
        console.log('Error response data:', error.response.data);

        if (error.response?.data?.message) {
          message.error(error.response.data.message);
        } else if (error.response?.data?.errors) {
          // Xử lý lỗi validation từ ASP.NET
          const errorMessages = Object.values(error.response.data.errors)
            .flat()
            .join(', ');
          message.error(errorMessages);
        } else {
          message.error('Mã OTP không hợp lệ');
        }
      } else {
        message.error('Xác thực OTP thất bại, vui lòng thử lại sau');
      }
    } finally {
      setLoading(false);
    }
  };

  // Xử lý submit form
  const onFinish = async (values) => {
    // Kiểm tra mật khẩu khớp
    if (values.password !== values.confirmPassword) {
      message.error('Mật khẩu không khớp!');
      return;
    }

    // Kiểm tra đồng ý điều khoản
    if (!values.agreement) {
      message.error('Vui lòng chấp nhận điều khoản sử dụng');
      return;
    }

    // Chuẩn bị dữ liệu
    const userData = {
      username: values.username,
      email: values.email,
      password: values.password,
      lastName: values.lastName,
      middleName: values.middleName || "",
      firstName: values.firstName,
      phone: values.phone,
      address: values.address || "",
      gender: values.gender || "Nam"
    };

    setFormData(userData);

    // Gửi OTP đến email
    await handleSendOtp(values.email);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Vui lòng kiểm tra lại thông tin đăng ký');
  };

  // Hiệu ứng animation
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
      {/* Background animations */}
      <div className="absolute inset-0 overflow-hidden">
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

        {/* Các motion.div khác cho hiệu ứng nền... */}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-4xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row relative z-10 border border-white/20 mt-16"
      >
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
          <div className="mb-6">
            <Steps
              current={currentStep}
              items={[
                {
                  title: 'Thông tin',
                  description: 'Nhập thông tin cá nhân',
                },
                {
                  title: 'Xác thực',
                  description: 'Xác thực OTP',
                },
              ]}
            />
          </div>

          <RegisterForm
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            loading={loading}
          />

          {/* Login link */}
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

      {/* OTP Modal */}
      <OtpModal
        visible={otpModalVisible}
        onCancel={() => {
          setOtpModalVisible(false);
          setCurrentStep(0);
        }}
        onOk={handleVerifyOtp}
        email={email}
        otp={otp}
        setOtp={setOtp}
        canResendOtp={canResendOtp}
        resendCountdown={resendCountdown}
        onResendOtp={() => handleSendOtp()}
        loading={loading}
      />
    </div>
  );
}

export default Register;