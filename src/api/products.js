import axiosInstance from "./axios-instance";

export const getProducts = (params) => {
    return axiosInstance.get("/products", { params });
};

export const getProductById = (id) => {
    return axiosInstance.get(`/products/${id}`);
};
