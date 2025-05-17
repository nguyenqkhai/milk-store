const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const apiConfig = {
  API_BASE_URL,
  AUTH: {
    SEND_OTP: '/Auth/send-otp',
    VERIFY_OTP: '/Auth/verify-otp',
    CUSTOMER_LOGIN: '/Auth/customer/login',
    REFRESH_TOKEN: '/Auth/refresh-token'
  }
};

export default apiConfig;