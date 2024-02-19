import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const login = async (userData) => {
    const res = await axios.post(`${base_url}user/admin-login`, userData);
    if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
};

const getMonthlyOrders = async () => {
    const res = await axios.get(`${base_url}user/month-income`, config);
    return res.data;
};
const getYearlyOrders = async () => {
    const res = await axios.get(`${base_url}user/year-orders`, config);
    return res.data;
};

const isBlockCustomer = async (id) => {
    const res = await axios.patch(`${base_url}user/block-user`, { userId: id }, config);
    return res.data;
};
const getBlocks = async (id) => {
    const res = await axios.get(`${base_url}user/blocks`, config);
    return res.data;
};
const authService = {
    login,
    getMonthlyOrders,
    getYearlyOrders,
    isBlockCustomer,
    getBlocks,
};

export default authService;
