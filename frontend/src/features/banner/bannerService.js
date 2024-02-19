import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
const getTokenFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const getBanners = async () => {
    const res = await axios.get(`${base_url}banner/`);
    return res.data;
};

const BannerService = {
    getBanners,
};

export default BannerService;
