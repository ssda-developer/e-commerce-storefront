import { BASE_URL } from "@/constants";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || "Something went wrong";

        console.error("API Error:", message);

        return Promise.reject(error);
    }
);

export default axiosInstance;
