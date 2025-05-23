import React, { createContext, useState, useContext, useEffect } from 'react';
import CookieService from '../services/Cookie/CookieService';
import AuthService from '../services/Auth/AuthServices';
import { message } from 'antd';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const accessToken = CookieService.getAccessToken();

        if (accessToken) {
            fetchUserInfo();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUserInfo = async () => {
        try {
            const response = await AuthService.info();
            if (response.status === 200) {
                setCurrentUser(response.data);
                setIsAuthenticated(true);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                logout();
            }
        } finally {
            setLoading(false);
        }
    };

    const updateUserFields = async (updateFields, updateValues) => {
        try {
            if (!updateFields || !updateValues || !Array.isArray(updateFields) || !Array.isArray(updateValues)) {
                console.error('Invalid parameters for updateUserFields:', { updateFields, updateValues });
                return {
                    success: false,
                    error: 'Invalid parameters for update operation'
                };
            }

            if (updateFields.length === 0) {
                return { success: true, data: { message: 'No fields to update' } };
            }

            if (updateFields.length !== updateValues.length) {
                console.error('Mismatched arrays length:', {
                    fieldsLength: updateFields.length,
                    valuesLength: updateValues.length
                });
                return {
                    success: false,
                    error: 'Mismatch between fields and values'
                };
            }

            const patchData = updateFields.map((field, index) => {
                if (field === undefined || field === null) {
                    console.error('Undefined field at index', index);
                    return null;
                }
                return {
                    op: 'replace',
                    path: '/' + field,
                    value: updateValues[index]
                };
            }).filter(item => item !== null); // Remove any nulls

            if (patchData.length === 0) {
                return { success: true, data: { message: 'No valid fields to update' } };
            }

            const response = await AuthService.updateInfo(patchData);

            if (response.status === 200) {
                await fetchUserInfo();
                return { success: true, data: response.data };
            }

            return {
                success: false,
                error: response.data?.message || 'Cập nhật thông tin thất bại'
            };
        } catch (error) {
            console.error('Error updating user info:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật thông tin'
            };
        }
    };

    const login = async (username, password) => {
        try {
            const response = await AuthService.login(username, password);
            if (response) {
                CookieService.setAuthTokens(
                    response.data.accessToken,
                    response.data.refreshToken
                );

                await fetchUserInfo();

                return { success: true };
            }

            return {
                success: false,
                error: response.data?.message || 'Đăng nhập thất bại'
            };
        } catch (error) {
            console.error('Lỗi khi đăng nhập:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Đăng nhập thất bại'
            };
        }
    };

    const logout = async () => {
        try {
            setCurrentUser(null);
            setIsAuthenticated(false);
            const response = await AuthService.logout();
            if (response.status === 200) {
                return { success: true };
            }
            return {
                success: false,
                error: response.data?.message || 'Đăng xuất thất bại'
            };
        } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Đăng xuất thất bại'
            };
        }
    };

    const register = async (registrationData) => {
        try {
            const response = await AuthService.verifyOtpAndRegister(registrationData);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Đăng ký thất bại:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Có lỗi xảy ra khi đăng ký'
            };
        }
    };

    const sendOtp = async (email) => {
        try {
            const response = await AuthService.sendOtp(email);
            return {
                success: true,
                data: response.data,
                statusId: response.statusCode,
                message: response.data?.message || 'Mã OTP đã được gửi thành công'
            };
        } catch (error) {
            console.error('Lỗi gửi OTP:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Có lỗi xảy ra khi gửi mã OTP',
                statusId: error.response?.statusCode,
            };
        }
    };

    const verifyOtpAndRegister = async (registrationData) => {
        try {
            const response = await AuthService.verifyOtpAndRegister(registrationData);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Lỗi xác thực OTP và đăng ký:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Có lỗi xảy ra khi xác thực mã OTP'
            };
        }
    };



    useEffect(() => {
        if (!CookieService.hasAuthTokens()) return;

        const handleAuthTokenExpire = () => {
            AuthService.refreshToken();
        };

        window.addEventListener('auth:tokenExpire', handleAuthTokenExpire);

        return () => {
            window.removeEventListener('auth:tokenExpire', handleAuthTokenExpire);
        };
    }, []);

    useEffect(() => {
        if (!CookieService.hasAuthTokens()) return;

         const handleAuthLogout = () => {
            setCurrentUser(null);
            setIsAuthenticated(false);
            AuthService.logout();
        };

        window.addEventListener('auth:logout', handleAuthLogout);

        return () => {
            window.removeEventListener('auth:logout', handleAuthLogout);
        };
    }, []);

    const changePassword = async (currentPassword, newPassword) => {
        try {
            const response = await AuthService.changePassword(currentPassword, newPassword);
            if (response.status === 200) {
                message.success('Đổi mật khẩu thành công');
                return { success: true };
            }
            message.error(response.data?.message);
            return {
                success: false,
                error: response.data?.message
            }
        } catch (error) {
            console.error('Lỗi khi đổi mật khẩu:', error);
            message.error(error.response?.data?.message);
            return {
                success: false,
                error: error.response?.data?.message
            };
        }
    }

    const forgotPassword = async (email) => {
        try {
            const response = await AuthService.forgotPassword(email);
            if (response.status === 200) {
                return {
                    success: true,
                    message: response.data?.message || 'Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn'
                };
            }
            return {
                success: false,
                error: response.data?.message || 'Có lỗi xảy ra khi gửi yêu cầu đặt lại mật khẩu'
            };
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu đặt lại mật khẩu:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Có lỗi xảy ra khi gửi yêu cầu đặt lại mật khẩu'
            };
        }
    }

    const resetPassword = async (token, newPassword, confirmPassword) => {
        try {
            console.log("AuthContext resetPassword called with token:", token);
            const response = await AuthService.resetPassword(token, newPassword, confirmPassword);
            console.log("AuthContext resetPassword response:", response);

            if (response.status === 200) {
                return {
                    success: true,
                    message: response.data?.message || 'Đặt lại mật khẩu thành công'
                };
            }
            return {
                success: false,
                error: response.data?.message || 'Có lỗi xảy ra khi đặt lại mật khẩu'
            };
        } catch (error) {
            console.error('Lỗi khi đặt lại mật khẩu:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Có lỗi xảy ra khi đặt lại mật khẩu'
            };
        }
    }

    const value = {
        currentUser,
        isAuthenticated,
        loading,
        login,
        logout,
        register,
        sendOtp,
        verifyOtpAndRegister,
        updateUserFields,
        changePassword,
        forgotPassword,
        resetPassword,
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