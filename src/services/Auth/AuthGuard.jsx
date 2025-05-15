import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useAuth } from '../../context/AuthContext'
import CookieService from '../Cookie/CookieService';

/**
 * AuthGuard component để bảo vệ các route yêu cầu xác thực
 * Nếu người dùng bị đăng xuất tự động (do token hết hạn), sẽ chuyển hướng đến trang đăng nhập
 */
const AuthGuard = ({ children }) => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    useEffect(() => {
        // Lắng nghe sự kiện logout để chuyển hướng người dùng
        const handleLogout = () => {
            if (isAuthenticated) {
                logout();
                message.error('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
                navigate('/dang-nhap');
            }
        };

        window.addEventListener('auth:logout', handleLogout);

        return () => {
            window.removeEventListener('auth:logout', handleLogout);
        };
    }, [navigate, isAuthenticated, logout]);

    // Kiểm tra nếu không có token và người dùng cho là đã đăng nhập
    useEffect(() => {
        if (isAuthenticated && !CookieService.hasAuthTokens()) {
            logout();
            message.error('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
            navigate('/dang-nhap');
        }
    }, [isAuthenticated, navigate, logout]);

    return <>{children}</>;
};

export default AuthGuard;