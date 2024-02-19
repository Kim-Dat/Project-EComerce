import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getProducts = async (data) => {
   
    const params = {};
    if (data?.brand) params.brand = data.brand;
    if (data?.tag) params.tags = data.tag;
    if (data?.category) params.category = data.category;
    if (data?.minPrice) params["price[gte]"] = data.minPrice;
    if (data?.maxPrice) params["price[lte]"] = data.maxPrice;
    if (data?.sort) params.sort = data.sort;
    if (data?.pagination) params.page = data.pagination;
  
    const res = await axios.get(`${base_url}product`, { params });
    return res.data;
};

const getBodyProducts = async () => {
    const res = await axios.get(`${base_url}product/filter`, config);
    return res.data;
};
const searchProduct = async (keyword) => {
    const res = await axios.post(`${base_url}product/searchProduct`, { keyword }, config);
    return res.data;
};

const addToWishList = async (id) => {
    const res = await axios.patch(`${base_url}product/wishlist`, { prodId: id }, config);
    return res.data;
};

const getProduct = async (id) => {
    const res = await axios.get(`${base_url}product/${id}`);
    return res.data;
};
const rating = async (data) => {
    
    const res = await axios.put(`${base_url}product/rating`, data, config);
    return res.data;
};

const productService = {
    getProducts,
    getBodyProducts,
    addToWishList,
    getProduct,
    rating,
    searchProduct
};

export default productService;
