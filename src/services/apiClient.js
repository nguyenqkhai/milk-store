import axios from "axios";
import CookieService from "./Cookie/CookieService";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 30000, // timeout 30 giây
});

apiClient.interceptors.request.use(
    (config) => {
        if (config.auth !== false) {
            const token = CookieService.getAccessToken();
            if (token) {
                config.headers.Authorization = token;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// xử lý khi token hết hạn
const handleExpiredToken = () => {
    CookieService.removeAuthTokens();
    const logoutEvent = new Event('auth:logout');
    window.dispatchEvent(logoutEvent);
};

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Xử lý lỗi
        if (error.response) {
            console.error('Server Error:', error.response.status, error.response.data);
            if (error.response.status === 401 || error.response.status === 400) {
                handleExpiredToken();
            }
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Request Error:', error.message);
        }

        return Promise.reject(error);
    }
);

// Kiểm tra xem có token hợp lệ không trước khi gọi API
const validateToken = () => {
    if (!CookieService.hasAuthTokens()) {
        return false;
    }
    return true;
};

const api = {
    get: (url, params = {}, headers = {}) => {
        if (!validateToken()) {
            return Promise.reject();
        }
        return apiClient.get(url, { params, headers });
    },

    post: (url, data = {}, headers = {}) => {
        if (!validateToken()) {
            return Promise.reject();
        }
        return apiClient.post(url, data, { headers });
    },

    put: (url, data = {}, headers = {}) => {
        if (!validateToken()) {
            return Promise.reject();
        }
        return apiClient.put(url, data, { headers });
    },

    patch: (url, data = {}, headers = {}) => {
        if (!validateToken()) {
            return Promise.reject();
        }
        return apiClient.patch(url, data, { headers });
    },

    delete: (url, headers = {}) => {
        if (!validateToken()) {
            return Promise.reject();
        }
        return apiClient.delete(url, { headers });
    },

    jsonPatch: (url, operations = [], headers = {}) => {
        if (!validateToken()) {
            return Promise.reject();
        }
        return apiClient.patch(url, operations, {
            headers: {
                ...headers,
                'Content-Type': 'application/json-patch+json'
            }
        });
    },

    public: {
        get: (url, params = {}, headers = {}) => {
            return apiClient.get(url, {
                params,
                headers,
                auth: false
            });
        },

        post: (url, data = {}, headers = {}) => {
            return apiClient.post(url, data, {
                headers,
                auth: false
            });
        },

        put: (url, data = {}, headers = {}) => {
            return apiClient.put(url, data, {
                headers,
                auth: false
            });
        },

        patch: (url, data = {}, headers = {}) => {
            return apiClient.patch(url, data, {
                headers,
                auth: false
            });
        },

        delete: (url, headers = {}) => {
            return apiClient.delete(url, {
                headers,
                auth: false
            });
        },

        jsonPatch: (url, operations = [], headers = {}) => {
            return apiClient.patch(url, operations, {
                headers: {
                    ...headers,
                    'Content-Type': 'application/json-patch+json'
                },
                auth: false
            });
        }
    }
};

export default api;