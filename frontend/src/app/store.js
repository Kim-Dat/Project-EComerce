import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import productReducer from "../features/product/productSlice";
import contactReducer from "../features/contact/contactSlice";
import orderReducer from "../features/order/orderSlice";
import couponReducer from "../features/coupon/couponSlice";
import slideReducer from "../features/slide/slideSlice";
import bannerReducer from "../features/banner/bannerSlice";
export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        contact: contactReducer,
        order: orderReducer,
        coupon: couponReducer,
        slide: slideReducer,
        banner: bannerReducer,
    },
});
