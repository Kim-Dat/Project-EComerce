import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
const getTokenFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const getSlides = async () => {
    const res = await axios.get(`${base_url}slide/`);
    return res.data;
};

const SlideService = {
    getSlides,
};

export default SlideService;
