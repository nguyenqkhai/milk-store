// src/services/authService.js

import axios from 'axios';
import apiConfig from '../config/apiConfig';

// Service để gửi OTP
export const sendOtp = async (email) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${apiConfig.API_BASE_URL}${apiConfig.AUTH.SEND_OTP}?email=${encodeURIComponent(email)}`,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const verifyOtpAndRegister = async (registrationData) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${apiConfig.API_BASE_URL}${apiConfig.AUTH.VERIFY_OTP}`,
      data: registrationData,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Service để đăng nhập
export const loginCustomer = async (username, password) => {
  try {
    const response = await axios.post(
      `${apiConfig.API_BASE_URL}${apiConfig.AUTH.CUSTOMER_LOGIN}`, 
      { userName: username, password }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post(
      `${apiConfig.API_BASE_URL}${apiConfig.AUTH.REFRESH_TOKEN}?refreshToken=${refreshToken}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};