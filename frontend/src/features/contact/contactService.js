import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const createEnquiry = async (contactData) => {
    
    const res = await axios.post(`${base_url}enquiry`, contactData, config);
    return res.data;
};

const contactService = {
    createEnquiry,
};

export default contactService;
