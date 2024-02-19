import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    return !!!getTokenFromLocalStorage?.token ? children : <Navigate to="/admin" replace={true} />;
};

export default PublicRoutes;
