import axios from "axios";
import { base_url } from "../../utils/base_url";
//lấy ra tất cả users
const getUsers = async () => {
    const res = await axios.get(`${base_url}user/all-users`);
    return res.data;
};
//tạo 1 obj để chứa các service
const customersService = {
    getUsers,
};

export default customersService;
