import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to add the token
apiClient.interceptors.request.use(
    (config) => {
        const user_token = localStorage.getItem("user_token");
        if (user_token) {
            config.headers.Authorization = `Token ${user_token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Unified API Service
 * Handles all HTTP request scenarios and returns a consistent response format.
 * 
 * @param {string} method - HTTP method (get, post, put, delete, patch)
 * @param {string} path - API endpoint path
 * @param {object|null} data - Request payload (optional)
 * @returns {Promise<{data: any} | {message: string}>} 
 *          Success: { data: <response_data> }
 *          Error: { message: <error_message> }
 */
const apiService = async (method, path, data = null) => {
    try {
        const response = await apiClient({
            method,
            url: path,
            data,
            timeout: 30000, // 30 seconds timeout
        });

        // Success response
        return { data: response.data };
    } catch (error) {
        // Comprehensive error handling
        let message = "An unknown error occurred";

        // 1. Network errors (no response from server)
        if (!error.response) {
            if (error.code === 'ECONNABORTED') {
                message = "Request timeout. Please check your connection and try again.";
            } else if (error.code === 'ERR_NETWORK') {
                message = "Network error. Please check your internet connection.";
            } else if (error.message) {
                message = `Connection error: ${error.message}`;
            } else {
                message = "Unable to connect to the server. Please check your internet connection.";
            }
        }
        // 2. HTTP errors (server responded with error status)
        else {
            const status = error.response.status;
            const responseData = error.response.data;

            // Try to extract error message from various possible locations
            if (responseData) {
                // Check common error message fields
                message = 
                    responseData.message ||
                    responseData.error ||
                    responseData.detail ||
                    (responseData.non_field_errors && responseData.non_field_errors[0]) ||
                    (responseData.errors && JSON.stringify(responseData.errors)) ||
                    message;
            }

            // Provide specific messages for common HTTP status codes
            if (status === 400 && message === "An unknown error occurred") {
                message = "Invalid request. Please check your input and try again.";
            } else if (status === 401) {
                message = message === "An unknown error occurred" 
                    ? "Authentication required. Please log in again." 
                    : message;
            } else if (status === 403) {
                message = message === "An unknown error occurred"
                    ? "You don't have permission to perform this action."
                    : message;
            } else if (status === 404) {
                message = message === "An unknown error occurred"
                    ? "The requested resource was not found. Please check the URL."
                    : message;
            } else if (status === 422) {
                message = message === "An unknown error occurred"
                    ? "Validation error. Please check your input."
                    : message;
            } else if (status === 429) {
                message = "Too many requests. Please wait a moment and try again.";
            } else if (status >= 500) {
                message = message === "An unknown error occurred"
                    ? "Server error. Please try again later."
                    : `Server error: ${message}`;
            }
        }

        // Return error in consistent format
        return { message };
    }
};

export default apiService;
