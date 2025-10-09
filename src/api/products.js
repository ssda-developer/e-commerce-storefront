import axiosInstance from './axios-instance';

export const getProducts = (params) => {
    return axiosInstance.get('/products', { params });
};

export const getOneProduct = (id) => {
    return axiosInstance.get(`/products/${id}`);
};
