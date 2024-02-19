import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getEnquiries = async () => {
    const res = await axios.get(`${base_url}enquiry/`);
    return res.data;
};
const deleteEnquiry = async (id) => {
    const res = await axios.delete(`${base_url}enquiry/${id}`, config);
    return res.data;
};
const putEnquiry = async (enquiry) => {
    const res = await axios.put(
        `${base_url}enquiry/${enquiry.id}`,
        { status: enquiry.status },
        config
    );
    return res.data;
};
const getEnquiry = async (id) => {
    const res = await axios.get(`${base_url}enquiry/${id}`, config);
    return res.data;
};

const enquiryService = {
    getEnquiries,
    deleteEnquiry,
    putEnquiry,
    getEnquiry,
};

export default enquiryService;
