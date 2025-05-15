import axios from 'axios';
import apiConfig from '../../config/apiConfig';
import CookieService from '../Cookie/CookieService';
const API_BASE_URL = apiConfig.API_BASE_URL;

// Tạo một instance riêng không có interceptor để tránh vòng lặp vô hạn
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json'
    }
});

// Biến lưu trữ Promise của request refresh token đang chạy (để tránh nhiều request cùng lúc)
let refreshTokenPromise = null;

class AuthService {

    /**
     * Thong tin ng dùng 
     */
    /**
     * Lấy thông tin người dùng hiện tại
     * @returns {Promise} Promise với thông tin người dùng
     */
    async info() {
        try {
            const accessToken = CookieService.getAccessToken();
            const response = await axiosInstance.get(
                `${API_BASE_URL}/Customer/info`,
                {
                    headers: {
                        'accept': '*/*',
                        'Authorization': accessToken ? `${accessToken}` : ''
                    }
                }
            );
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
            const response = await axiosInstance.post(
                `${API_BASE_URL}/Auth/customer/login`,
                {
                    userName: username,
                    password: password
                },
                {
                    headers: {
                        'accept': 'text/plain',
                        'Content-Type': 'application/json-patch+json'
                    }
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
            const response = await axiosInstance.post(
                `${API_BASE_URL}/Auth/send-otp?email=${encodeURIComponent(email)}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
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
            const response = await axiosInstance.post(
                `${API_BASE_URL}/Auth/verify-otp`,
                registrationData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
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

        // Tạo một promise mới cho request refresh token
        refreshTokenPromise = axiosInstance.post(
            `${API_BASE_URL}/Auth/refresh-token?refreshToken=${refreshToken}`,
            {},
            {
                headers: {
                    'accept': 'text/plain'
                }
            }
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

    /**
     * Đăng xuất người dùng
     */
    logout() {
        // Xóa tokens khỏi cookies
        CookieService.removeAuthTokens();
        
        // Trigger event để các component khác có thể phản ứng (optional)
        window.dispatchEvent(new CustomEvent('auth:logout'));
    }

    /**
     * Tạo axios instance với authentication header và interceptor xử lý token
     * @returns {AxiosInstance} Axios instance với auth header và interceptor refresh token
     */
    getAuthenticatedAxios() {
        const accessToken = CookieService.getAccessToken();
        
        const instance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                'Authorization': accessToken ? `${accessToken}` : '',
                'Content-Type': 'application/json'
            }
        });
        
        // Thêm interceptor để tự động làm mới token
        instance.interceptors.request.use(
            async config => {
                let token = CookieService.getAccessToken();
                
                // Nếu không có token hoặc token không hợp lệ, thử refresh
                if (!this.isTokenValid(token)) {
                    try {
                        const refreshResponse = await this.refreshToken();
                        if (refreshResponse.success) {
                            token = refreshResponse.accessToken;
                        }
                    } catch (error) {
                        // Nếu refresh thất bại, không thêm token vào header
                        console.error('Failed to refresh token:', error);
                        // User đã được logout trong hàm refreshToken
                    }
                }
                
                // Cập nhật token mới vào header
                if (token) {
                    config.headers.Authorization = `${token}`;
                }
                
                return config;
            },
            error => Promise.reject(error)
        );
        
        // Interceptor response để bắt lỗi 401 Unauthorized
        instance.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;
                
                // Nếu lỗi 401 và chưa thử refresh token trước đó
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    
                    try {
                        // Thử refresh token
                        const refreshResponse = await this.refreshToken();
                        if (refreshResponse.success) {
                            // Cập nhật header với token mới
                            originalRequest.headers.Authorization = `${refreshResponse.accessToken}`;
                            // Thử lại request ban đầu
                            return instance(originalRequest);
                        }
                    } catch (refreshError) {
                        // Nếu refresh token thất bại, user đã được logout
                        console.error('Token refresh failed:', refreshError);
                        return Promise.reject(refreshError);
                    }
                }
                
                return Promise.reject(error);
            }
        );
        
        return instance;
    }
}

export default new AuthService();