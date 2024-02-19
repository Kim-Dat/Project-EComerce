import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
const getTokenFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
const getProducts = async () => {
    const res = await axios.get(`${base_url}product/`);
    return res.data;
};
const getProduct = async (id) => {
    const res = await axios.get(`${base_url}product/${id}`);
    return res.data;
};
const postProduct = async (formData) => {
    try {
        const token = getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : "";

        const headers = {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        };

        const res = await axios.post(`${base_url}product/create`, formData, { headers });
        return res.data;
    } catch (error) {
        console.error("Server error:", error);
        throw error;
    }
};
const putProduct = async (product) => {
    const token = getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : "";

    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
    };

    const res = await axios.put(`${base_url}product/${product.id}`, product.productData, { headers });
    return res.data;
};

const deleteProduct = async (id) => {
    const res = await axios.delete(`${base_url}product/${id}`, config);
    return res.data;
};

const productService = {
    getProducts,
    postProduct,
    putProduct,
    deleteProduct,
    getProduct,
};

export default productService;
