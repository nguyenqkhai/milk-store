import api from "@services/apiClient";
import CookieService from '../Cookie/CookieService';

// Biến lưu trữ Promise của request refresh token đang chạy (để tránh nhiều request cùng lúc)
let refreshTokenPromise = null;

class AuthService {
    /**
     * Lấy thông tin người dùng hiện tại
     * @returns {Promise} Promise với thông tin người dùng
     */
    async info() {
        try {
            const response = await api.get('/Customer/info');
            return response;
        } catch (error) {
            console.error('Error fetching user info:', error);
            throw error;
        }
    }

    /**
     * Thay đổi thông tin người dùng
     * @param {Array} updateFields - Mảng các trường cần cập nhật
     * @param {Array} updateValues - Mảng các giá trị tương ứng
     * @returns {Promise} - Kết quả từ API
     */
    async updateInfo(updateFields) {
        try {
            const response = await api.patch('/Customer/update', updateFields);
            return response;
        } catch (error) {
            console.error('Error updating user info:', error);
            throw error;
        }
    }

    /**
     * Đăng nhập người dùng
     * @param {string} username - Tên đăng nhập
     * @param {string} password - Mật khẩu
     * @returns {Promise} Promise với kết quả đăng nhập
     */
    async login(username, password) {
        try {
            const response = await api.public.post(
                '/Auth/customer/login',
                {
                    userName: username,
                    password: password
                },
                {
                    'Content-Type': 'application/json-patch+json'
                }
            );
            return response;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }

    /**
     * Gửi OTP đến email người dùng
     * @param {string} email - Email của người dùng
     * @returns {Promise} Promise với kết quả gửi OTP
     */
    async sendOtp(email) {
        try {
            const response = await api.public.post(
                `/Auth/send-otp?email=${encodeURIComponent(email)}`,
                {}
            );
            return response;
        } catch (error) {
            console.error('Error sending OTP:', error);
            throw error;
        }
    }

    /**
     * Xác thực OTP và đăng ký người dùng
     * @param {Object} registrationData - Dữ liệu đăng ký bao gồm OTP
     * @returns {Promise} Promise với kết quả xác thực và đăng ký
     */
    async verifyOtpAndRegister(registrationData) {
        try {
            const response = await api.public.post(
                '/Auth/verify-otp',
                registrationData
            );
            return response;
        } catch (error) {
            console.error('Error verifying OTP and registering:', error);
            throw error;
        }
    }

    /**
     * Làm mới access token bằng refresh token
     * @returns {Promise<{accessToken: string, success: boolean}>} Access token mới
     */
    async refreshToken() {
        // Nếu đã có một request refresh đang chạy, trả về Promise đó
        if (refreshTokenPromise) {
            return refreshTokenPromise;
        }

        const refreshToken = CookieService.getRefreshToken();

        if (!refreshToken) {
            this.logout();
            return Promise.reject(new Error('Không có refresh token'));
        }

        // Tạo một promise mới cho request refresh token (sử dụng api.public để tránh vòng lặp)
        refreshTokenPromise = api.public.post(
            `/Auth/refresh-token?refreshToken=${refreshToken}`,
            {}
        )
            .then(response => {
                const data = response.data;

                if (data.success && data.accessToken) {
                    CookieService.setAccessToken(data.accessToken);
                    return data;
                } else {
                    this.logout();
                    throw new Error('Refresh token không hợp lệ');
                }
            })
            .catch(error => {
                // Nếu refresh token cũng hết hạn hoặc không hợp lệ
                this.logout();
                throw error;
            })
            .finally(() => {
                // Reset promise để lần sau có thể refresh lại
                refreshTokenPromise = null;
            });

        return refreshTokenPromise;
    }

    /**
     * Check token có hợp lệ không (chỉ kiểm tra format, không gửi request)
     * @param {string} token - Token cần kiểm tra
     * @returns {boolean} true nếu token có format đúng và chưa hết hạn
     */
    isTokenValid(token) {
        if (!token) return false;

        try {
            // Decode JWT payload để lấy thời gian hết hạn
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expirationTime = payload.exp * 1000; // Convert to milliseconds
            const currentTime = Date.now();

            // Kiểm tra token còn thời hạn
            return expirationTime > currentTime;
        } catch (e) {
            return false;
        }
    }

    async logout() {
        let response = null;
        try {
            response = await api.post('/Auth/logout');
            CookieService.removeAuthTokens();
            window.dispatchEvent(new CustomEvent('auth:logout'));
            return response;
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    }

    /**
     * Đổi mật khẩu người dùng đã đăng nhập
     * @param {string} currentPassword - Mật khẩu hiện tại
     * @param {string} newPassword - Mật khẩu mới
     * @param {string} confirmNewPassword - Xác nhận mật khẩu mới
     * @returns {Promise} Promise với kết quả đổi mật khẩu
     */
    async changePassword(currentPassword, newPassword, confirmNewPassword) {
        try {
            const response = await api.post(
                '/Auth/change-password',
                {
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                    confirmNewPassword: confirmNewPassword
                },
                {
                    'Content-Type': 'application/json-patch+json'
                }
            );
            return response;
        } catch (error) {
            console.error('Error changing password:', error);
            throw error;
        }
    }

    /**
     * Gửi yêu cầu đặt lại mật khẩu
     * @param {string} email - Email của người dùng
     * @returns {Promise} Promise với kết quả gửi yêu cầu
     */
    async forgotPassword(email) {
        try {
            const response = await api.public.post(
                '/Auth/forgot-password',
                { email: email },
                {
                    'Content-Type': 'application/json'
                }
            );
            return response;
        } catch (error) {
            console.error('Error requesting password reset:', error);
            throw error;
        }
    }

    /**
     * Đặt lại mật khẩu với token
     * @param {string} token - Token xác thực từ email
     * @param {string} newPassword - Mật khẩu mới
     * @param {string} confirmPassword - Xác nhận mật khẩu mới
     * @returns {Promise} Promise với kết quả đặt lại mật khẩu
     */
    async resetPassword(token, newPassword, confirmPassword) {
        try {
            console.log("Sending reset password request with token:", token);
            const response = await api.public.post(
                '/Auth/reset-password',
                {
                    token: token,
                    newPassword: newPassword,
                    confirmPassword: confirmPassword
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("Reset password response:", response);
            return response;
        } catch (error) {
            console.error('Error resetting password:', error);
            throw error;
        }
    }
}

export default new AuthService();