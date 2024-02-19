import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import couponReducer from "../features/coupon/CouponSlice";
import orderReducer from "../features/order/orderSlice";
import slideReducer from "../features/slide/slideSlice";
import bannerReducer from "../features/banner/bannerSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        customer: customerReducer,
        product: productReducer,
        enquiry: enquiryReducer,
        coupon: couponReducer,
        order: orderReducer,
        slide: slideReducer,
        banner: bannerReducer,
    },
});
