import axios from "axios";

const BASE_URL = "https://dummyjson.com";

export const getProducts = (params) => {
    return axios.get(`${BASE_URL}/products`, { params });
};
