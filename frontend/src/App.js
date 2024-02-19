import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Store from "./pages/Store";
import WishList from "./pages/WishList";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermAndConditions from "./pages/TermAndConditions";
import RefundPolicy from "./pages/RefundPolicy";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoutes  from "./routing/PrivateRouter";
import PublicRoutes from "./routing/PublicRouter";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="about" element={<About />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="store" element={<Store />} />
                        <Route path="product/:id" element={<SingleProduct />} />
                        <Route path="cart" element={<PrivateRoutes><Cart /></PrivateRoutes>}/>
                        <Route path="my-orders" element={<PrivateRoutes><Orders/></PrivateRoutes>}/>
                        <Route path="my-profile" element={<PrivateRoutes><Profile/></PrivateRoutes>}/>
                        <Route path="checkout" element={<PrivateRoutes><Checkout /></PrivateRoutes>}/>
                        <Route path="wishlist" element={<PrivateRoutes><WishList /></PrivateRoutes>}/>
                        <Route path="login" element={<PublicRoutes><Login /></PublicRoutes>}/>
                        <Route path="signup" element={<Signup />} />
                        <Route path="forgot-password" element={<ForgotPassword />}/>
                        <Route path="reset-password/:token" element={<ResetPassword />}/>
                        <Route path="privacy-policy" element={<PrivacyPolicy />}/>
                        <Route path="shipping-policy" element={<ShippingPolicy />}/>
                        <Route path="term-conditions" element={<TermAndConditions />}/>
                        <Route path="refund-policy" element={<RefundPolicy />}/>
                        <Route path="search" element={<Search />}/>
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
