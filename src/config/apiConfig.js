const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const apiConfig = {
  API_BASE_URL,
  AUTH: {
    SEND_OTP: '/api/Auth/send-otp',
    VERIFY_OTP: '/api/Auth/verify-otp',
    CUSTOMER_LOGIN: '/api/Auth/customer/login',
    REFRESH_TOKEN: '/api/Auth/refresh-token'
  }
};

export default apiConfig;