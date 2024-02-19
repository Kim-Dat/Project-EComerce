import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import CouponService from "./CouponService";
const initialState = {
    coupons: [],
    createdCoupon: "",
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: "",
};

export const getCoupons = createAsyncThunk(
    "coupon/get-coupons",
    async (thunkAPI) => {
        try {
            return await CouponService.getCoupons();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const createCoupon = createAsyncThunk(
    "coupon/create-coupon",
    async (coupon, thunkAPI) => {
        try {
            return await CouponService.postCoupon(coupon);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateCoupon = createAsyncThunk(
    "coupon/updateCoupon",
    async (coupon, thunkAPI) => {
        try {
            return await CouponService.putCoupon(coupon);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const deleteCoupon = createAsyncThunk(
    "coupon/deleteCoupon",
    async (id, thunkAPI) => {
        try {
            return await CouponService.deleteCoupon(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const getCoupon = createAsyncThunk(
    "coupon/getCoupon",
    async (id, thunkAPI) => {
        try {
            return await CouponService.getCoupon(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const resetState = createAction("Reset-all");

const CouponSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCoupons.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCoupons.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getCoupons.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.coupons = action.payload;
            })
            .addCase(createCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createCoupon.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.createdCoupon = action.payload;
            })
            .addCase(updateCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateCoupon.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.updatedCoupon = action.payload;
            })
            .addCase(deleteCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteCoupon.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.deletedCoupon = action.payload;
            })
            .addCase(getCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getCoupon.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.couponName = action.payload.name;
                state.couponExpiry = action.payload.expiry;
                state.couponDiscount = action.payload.discount;
            })
            .addCase(resetState, () => initialState);
    },
});

export default CouponSlice.reducer;
