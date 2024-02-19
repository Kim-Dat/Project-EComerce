import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import couponService from "./couponService";
import { toast } from "react-toastify";
const initialState = {
    coupons: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getCoupons = createAsyncThunk("coupon/get-coupons", async (thunkAPI) => {
    try {
        return await couponService.getCoupons();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const contactSlide = createSlice({
    name: "coupon",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCoupons.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCoupons.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(getCoupons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.coupons = action.payload;
            });
    },
});

export default contactSlide.reducer;
