import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
const getTokenFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const getBanners = async () => {
    const res = await axios.get(`${base_url}banner/`);
    return res.data;
};
const postBanner = async (formData) => {
    try {
        const token = getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : "";

        const headers = {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        };

        const res = await axios.post(`${base_url}banner/`, formData, { headers });
        return res.data;
    } catch (error) {
        console.error("Server error:", error);
        throw error;
    }
};
const deleteBanner = async (id) => {
    const res = await axios.delete(`${base_url}banner/${id}`, config);
    return res.data;
};

const BannerService = {
    getBanners,
    postBanner,
    deleteBanner,
};

export default BannerService;
