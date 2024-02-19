import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getCoupons = async () => {
    const res = await axios.get(`${base_url}coupon`, config);
    return res.data;
};


const couponService = {
    getCoupons
};

export default couponService;