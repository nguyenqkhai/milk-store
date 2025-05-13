import React, { createContext, useState, useContext, useEffect } from 'react';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
=======
import axios from 'axios';
import apiConfig from '../config/apiConfig';
>>>>>>> 36f64d078968078ecf389dfde4b6a89a6420c19b

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
<<<<<<< HEAD
        // Kiểm tra xem người dùng đã đăng nhập chưa (từ cookies và localStorage)
        const storedUser = localStorage.getItem('user');
        const token = Cookies.get('token');
        
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
=======
        const accessToken = localStorage.getItem('accessToken');
        
        if (accessToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            fetchUserInfo();
        } else {
            setLoading(false);
>>>>>>> 36f64d078968078ecf389dfde4b6a89a6420c19b
        }
    }, []);

    const fetchUserInfo = async () => {
        try {
<<<<<<< HEAD
            const response = await fetch('https://localhost:5000/api/Auth/customer/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const data = await response.json();
            console.log('Login response:', data);

            if (response.ok) {
                // Kiểm tra cấu trúc response và lấy token
                let token, refreshToken;
                if (data.token) {
                    token = data.token;
                    refreshToken = data.refreshToken;
                } else if (data.data) {
                    token = data.data.token;
                    refreshToken = data.data.refreshToken;
                } else if (data.accessToken) {
                    token = data.accessToken;
                    refreshToken = data.refreshToken;
                }

                console.log('Extracted tokens:', { token, refreshToken });

                if (!token) {
                    console.error('No token found in response');
                    return { 
                        success: false, 
                        error: 'Không tìm thấy token trong response' 
                    };
                }

                // Lưu tokens vào cookies
                try {
                    // Lưu access token
                    Cookies.set('token', token, {
                        expires: 7, // 7 ngày
                        secure: false,
                        sameSite: 'lax',
                        path: '/'
                    });

                    // Lưu refresh token nếu có
                    if (refreshToken) {
                        Cookies.set('refreshToken', refreshToken, {
                            expires: 30, // 30 ngày cho refresh token
                            secure: false,
                            sameSite: 'lax',
                            path: '/'
                        });
                    }

                    console.log('Tokens saved to cookies');
                } catch (cookieError) {
                    console.error('Error saving tokens to cookies:', cookieError);
                }

                // Lưu user data (không bao gồm tokens)
                const userData = { ...data };
                delete userData.token;
                delete userData.refreshToken;
                delete userData.accessToken;
                if (userData.data) {
                    delete userData.data.token;
                    delete userData.data.refreshToken;
                }

                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
                
                return { success: true };
            } else {
                return { 
                    success: false, 
                    error: data.message || 'Thông tin đăng nhập không chính xác' 
                };
            }
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            return { 
                success: false, 
                error: 'Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại sau.' 
            };
=======
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
>>>>>>> 36f64d078968078ecf389dfde4b6a89a6420c19b
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

<<<<<<< HEAD
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        // Xóa cả hai tokens khi logout
        Cookies.remove('token', { path: '/' });
        Cookies.remove('refreshToken', { path: '/' });
        navigate('/dang-nhap');
    };

    // Hàm lấy token để sử dụng cho các API calls
    const getToken = () => {
        return Cookies.get('token');
    };

    // Hàm lấy refresh token
    const getRefreshToken = () => {
        return Cookies.get('refreshToken');
    };

    // Kiểm tra người dùng đã đăng nhập chưa
    const isAuthenticated = () => {
        return !!user && !!getToken();
    };

    if (loading) {
        return <div>Loading...</div>;
=======
    const register = async (username, email, password, fullname, phone) => {
        try {
            const result = await authService.register(username, email, password, fullname, phone);
            return result;
        } catch (error) {
            console.error('Đăng ký thất bại:', error);
            return {success: false, error: error.response.data.message || 'Có lỗi xảy ra khi đăng ký'};
        }
>>>>>>> 36f64d078968078ecf389dfde4b6a89a6420c19b
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
<<<<<<< HEAD
        <AuthContext.Provider value={{ 
            user, 
            login, 
            logout, 
            register, 
            isAuthenticated,
            getToken,
            getRefreshToken
        }}>
=======
        <AuthContext.Provider value={value}>
>>>>>>> 36f64d078968078ecf389dfde4b6a89a6420c19b
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};