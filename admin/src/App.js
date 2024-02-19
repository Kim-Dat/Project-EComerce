import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import ListProduct from "./pages/ListProduct";
import AddProduct from "./pages/AddProduct";
import AddCoupon from "./pages/AddCoupon";
import ListCoupon from "./pages/ListCoupon";
import ViewEnquiry from "./pages/ViewEnquiry";
import ViewOrder from "./pages/ViewOrder";
import PrivateRoutes from "./routing/PrivateRouter";
import PublicRoutes from "./routing/PublicRouter";
import BlockCustomer from "./pages/BlockCustomer";
import Slide from "./pages/Slide";
import Slides from "./pages/ListSlide";
import Banner from "./pages/Banner";
import Banners from "./pages/ListBanner";

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PublicRoutes>
                            <Login />
                        </PublicRoutes>
                    }
                ></Route>
                <Route
                    path="/admin"
                    element={
                        <PrivateRoutes>
                            <MainLayout />
                        </PrivateRoutes>
                    }
                >
                    <Route index element={<Dashboard />}></Route>
                    <Route path="enquiries" element={<Enquiries />}></Route>
                    <Route path="enquiry/:id" element={<ViewEnquiry />}></Route>
                    <Route path="coupon" element={<AddCoupon />}></Route>
                    <Route path="coupon/:id" element={<AddCoupon />}></Route>
                    <Route path="coupon-list" element={<ListCoupon />}></Route>
                    <Route path="orders" element={<Orders />}></Route>
                    <Route path="order/:id" element={<ViewOrder />}></Route>
                    <Route path="customers" element={<Customers />}></Route>
                    <Route path="blocked-customers" element={<BlockCustomer />}></Route>
                    <Route path="product" element={<AddProduct />}></Route>
                    <Route path="product/:id" element={<AddProduct />}></Route>
                    <Route path="product-list" element={<ListProduct />}></Route>
                    <Route path="slide" element={<Slide />}></Route>
                    <Route path="slides" element={<Slides />}></Route>
                    <Route path="banner" element={<Banner />}></Route>
                    <Route path="banners" element={<Banners />}></Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
