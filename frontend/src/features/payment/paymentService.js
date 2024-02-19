import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getConfig = async () => {
    const res = await axios.get(`${base_url}payment/config`, config);
    return res.data;
};

const paymentService = {
    getConfig,
};

export default paymentService;