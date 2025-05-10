import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Kiểm tra xem người dùng đã đăng nhập chưa (từ cookies và localStorage)
        const storedUser = localStorage.getItem('user');
        const token = Cookies.get('token');
        
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
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
        }
    };

    const register = async (username, email, password, fullName, phone) => {
        try {
            // Ở đây bạn sẽ gọi API để đăng ký người dùng
            // Giả lập đăng ký thành công
            console.log('Đăng ký người dùng:', { username, email, password, fullName, phone });
            
            // Trong thực tế, bạn sẽ gửi dữ liệu này đến server và nhận phản hồi
            // Giả sử đăng ký thành công
            return { success: true };
        } catch (error) {
            console.error('Lỗi đăng ký:', error);
            return { success: false, error: 'Đăng ký thất bại' };
        }
    };

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
    }

    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            logout, 
            register, 
            isAuthenticated,
            getToken,
            getRefreshToken
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth phải được sử dụng trong AuthProvider');
    }
    return context;
};