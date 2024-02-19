import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bannerService from "./bannerService";
import { toast } from "react-toastify";

const initialState = {
    banners: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: "",
};

export const getBanners = createAsyncThunk("banner/get-banners ", async (thunkAPI) => {
    try {
        return await bannerService.getBanners();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
const SlideSlice = createSlice({
    name: "banners ",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBanners.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBanners.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.banners = action.payload;
            })
            .addCase(getBanners.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "Không có sản phẩm nào";
            });
    },
});

export default SlideSlice.reducer;
