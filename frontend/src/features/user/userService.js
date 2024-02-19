import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const registerUser = async (user) => {
    const res = await axios.post(`${base_url}user/register`, user);
    return res.data;
};
const loginUser = async (user) => {
    console.log(user)
    const res = await axios.post(`${base_url}user/login`, user);
    if (res.data) {
        localStorage.setItem("customer", JSON.stringify(res.data));
    }
    return res.data;
};
const getWishList = async () => {
    const res = await axios.get(`${base_url}user/wishlist`, config);
    return res.data;
};
const addToCart = async (cartData) => {
    const res = await axios.post(`${base_url}user/cart`, cartData, config);
    return res.data;
};
const getCart = async () => {
    const res = await axios.get(`${base_url}user/cart`, config);
    return res.data;
};
const emptyCart = async () => {
    const res = await axios.delete(`${base_url}user/empty-cart`, config);
    return res.data;
};
const removeProductFromCart = async (id) => {
    const res = await axios.delete(`${base_url}user/cart/${id}`, config);
    return res.data;
};
const updateUser = async (data) => {
    console.log(data);
    const res = await axios.put(`${base_url}user/edit-user`, data, config);
    return res.data;
};
const forgotPasswordToken = async (data) => {
    const res = await axios.post(`${base_url}user/forgot-password-token`, data);
    return res.data;
};
const resetPassword = async (data) => {
    const res = await axios.patch(`${base_url}user/reset-password/${data.token}`, { password: data.password });
    return res.data;
};
const deleteAUser = async (id) => {
    console.log(id);
    const res = await axios.delete(`${base_url}user/delete-user/${id}`, config);
    return res.data;
};

const userService = {
    registerUser,
    loginUser,
    getWishList,
    addToCart,
    getCart,
    removeProductFromCart,
    updateUser,
    forgotPasswordToken,
    resetPassword,
    emptyCart,
    deleteAUser,
};

export default userService;
