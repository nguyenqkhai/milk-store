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
                    // Cập nhật access token mới vào cookies
                    CookieService.setAccessToken(data.accessToken);
                    return data;
                } else {
                    // Nếu server không trả về token mới
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
}

export default new AuthService();