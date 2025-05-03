import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Kiểm tra xem người dùng đã đăng nhập chưa (từ localStorage)
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            // Ở đây bạn thường sẽ gọi API đến backend
            // Tạm thời giả lập đăng nhập thành công
            // Trong thực tế, bạn sẽ xác thực với server

            // Giả sử thông tin đăng nhập đúng là admin/admin123
            if (username === 'admin' && password === 'admin123') {
                const userData = {
                    id: 1,
                    username,
                    name: 'Người quản trị',
                    email: 'admin@example.com'
                };
                
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                return { success: true };
            } else {
                return { success: false, error: 'Thông tin đăng nhập không chính xác' };
            }
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            return { success: false, error: 'Có lỗi xảy ra khi đăng nhập' };
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
        navigate('/dang-nhap');
    };

    // Kiểm tra người dùng đã đăng nhập chưa
    const isAuthenticated = () => {
        return !!user;
    };

    if (loading) {
        return <div>Loading...</div>; // Hoặc spinner hoặc loading component khác
    }

    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            logout, 
            register, 
            isAuthenticated 
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