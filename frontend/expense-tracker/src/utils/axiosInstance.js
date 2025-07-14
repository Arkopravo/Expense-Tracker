import { BASE_URL } from "./apiPaths";
import axios from "axios";


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});


// request interceptor to add token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if(error.response.status === 401) {
                // redirect to login or show unauthorized message
                window.location.href = "/login";
            } else if (error.response.status === 500) {
                // handle server error
                console.error("Server error:", error.response.data);
            } else if (error.code === "ECONNABORTED") {
                // handle request timeout
                console.error("Request timed out:", error.message);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;