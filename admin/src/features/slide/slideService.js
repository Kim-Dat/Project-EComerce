import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
const getTokenFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const getSlides = async () => {
    const res = await axios.get(`${base_url}slide/`);
    return res.data;
};
const postSlide = async (formData) => {
    console.log(formData)
    try {
        const token = getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : "";

        const headers = {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        };

        const res = await axios.post(`${base_url}slide/`, formData, { headers });
        return res.data;
    } catch (error) {
        console.error("Server error:", error);
        throw error;
    }
};
const deleteSlide = async (id) => {
    const res = await axios.delete(`${base_url}slide/${id}`, config);
    return res.data;
};

const SlideService = {
    getSlides,
    postSlide,
    deleteSlide,
};

export default SlideService;
