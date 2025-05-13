import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import apiConfig from '../config/apiConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        
        if (accessToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            fetchUserInfo();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get(`${apiConfig.API_BASE_URL}${apiConfig.CUSTOMER.INFO}`);
            if (response.status === 200) {
                setCurrentUser(response.data);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Lỗi khi lấy thông tin người dùng:', error);
            // Nếu lỗi 401 (Unauthorized), xóa token và yêu cầu đăng nhập lại
            if (error.response && error.response.status === 401) {
                logout();
            }
        } finally {
            setLoading(false);
        }
    };

    const login = (userData) => {
        // Lưu token vào localStorage
        if (userData.accessToken) {
            localStorage.setItem('accessToken', userData.accessToken);
            localStorage.setItem('refreshToken', userData.refreshToken);
            
            // Thiết lập token mặc định cho axios
            axios.defaults.headers.common['Authorization'] = `Bearer ${userData.accessToken}`;
            
            // Lấy thông tin người dùng từ API
            fetchUserInfo();
            
            return { success: true };
        }
        
        return { success: false, error: 'Token không hợp lệ' };
    };

    const logout = async () => {
        try {
            // Gọi API đăng xuất nếu cần
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                await axios.post(`${apiConfig.API_BASE_URL}${apiConfig.AUTH.LOGOUT}`);
            }
        } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
        } finally {
            // Xóa token và thông tin người dùng
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            delete axios.defaults.headers.common['Authorization'];
            setCurrentUser(null);
            setIsAuthenticated(false);
        }
    };

    const register = async (username, email, password, fullname, phone) => {
        try {
            const result = await authService.register(username, email, password, fullname, phone);
            return result;
        } catch (error) {
            console.error('Đăng ký thất bại:', error);
            return {success: false, error: error.response.data.message || 'Có lỗi xảy ra khi đăng ký'};
        }
    }

    const sendOtp = async (email) => {
        try {
            const result = await authService.sendOtp(email);
            return result;
        } catch (error) {
            console.error('Lỗi gửi OTP:', error);
            return { success: false, error: 'Có lỗi xảy ra khi gửi mã OTP' };
        }
    };

    const verifyOtp = async (email, otp) => {
        try {
            const result = await authService.verifyOtp(email, otp);
            return result;
        } catch (error) {
            console.error('Lỗi xác thực OTP:', error);
            return { success: false, error: 'Có lỗi xảy ra khi xác thực mã OTP' };
        }
    }
    // Hàm để làm mới token khi token cũ hết hạn
    const refreshToken = async () => {
        try {
            const refreshTokenValue = localStorage.getItem('refreshToken');
            if (!refreshTokenValue) {
                throw new Error('Không có refresh token');
            }

            const response = await axios.post(`${apiConfig.API_BASE_URL}${apiConfig.AUTH.REFRESH_TOKEN}`, {
                refreshToken: refreshTokenValue
            });

            if (response.status === 200 && response.data) {
                // Cập nhật token mới
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                
                // Cập nhật header cho axios
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
                
                return true;
            }
            return false;
        } catch (error) {
            console.error('Lỗi khi làm mới token:', error);
            logout(); // Đăng xuất nếu không thể làm mới token
            return false;
        }
    };

    // Tạo interceptor để tự động làm mới token khi nhận lỗi 401
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;
                
                // Nếu lỗi 401 và chưa thử làm mới token
                if (error.response && error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    
                    // Thử làm mới token
                    const success = await refreshToken();
                    if (success) {
                        // Thử lại request ban đầu với token mới
                        return axios(originalRequest);
                    }
                }
                
                return Promise.reject(error);
            }
        );
        
        // Cleanup interceptor khi component unmount
        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, []);

    const value = {
        currentUser,
        isAuthenticated,
        loading,
        login,
        logout,
        refreshToken,
        register,
        sendOtp,
        verifyOtp
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};