import React, { createContext, useState, useContext, useEffect } from 'react';
import CookieService from '../services/Cookie/CookieService';
import AuthService from '../services/Auth/AuthServices';

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
                data: response.data
            };
        } catch (error) {
            console.error('Lỗi gửi OTP:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Có lỗi xảy ra khi gửi mã OTP'
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

    const value = {
        currentUser,
        isAuthenticated,
        loading,
        login,
        logout,
        register,
        sendOtp,
        verifyOtpAndRegister,
        updateUserFields
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