import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getOrders = async () => {
    const res = await axios.get(`${base_url}order/orders`, config);
    return res.data;
};
const getOrderUserById = async (id) => {
    const res = await axios.get(`${base_url}order/${id}`, config);
    return res.data;
};
const patchOrderStatus = async (data) => {
    const res = await axios.patch(`${base_url}order/${data.id}`, { status: data.status }, config);
    return res.data;
};
const getMonthlyOrders = async () => {
    const res = await axios.get(`${base_url}order/month-income`, config);
    return res.data;
};
const getYearlyOrders = async () => {
    const res = await axios.get(`${base_url}order/year-orders`, config);
    return res.data;
};
const orderService = {
    getOrders,
    getOrderUserById,
    patchOrderStatus,
    getMonthlyOrders,
    getYearlyOrders,
};

export default orderService;
