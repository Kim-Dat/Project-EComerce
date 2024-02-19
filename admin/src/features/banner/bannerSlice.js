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
export const createBanner = createAsyncThunk("banner/create-banner", async (banner, thunkAPI) => {
    try {
        return await bannerService.postBanner(banner);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const deleteBanner = createAsyncThunk("banner/delete-banner", async (id, thunkAPI) => {
    try {
        return await bannerService.deleteBanner(id);
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
            })
            .addCase(createBanner.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBanner.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdBanner = action.payload;
                toast.success("Thêm Banner thành công");
            })
            .addCase(createBanner.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteBanner.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBanner.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedBanner = action.payload;
                toast.success("Xoá Banner thành công");
            })
            .addCase(deleteBanner.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
    },
});

export default SlideSlice.reducer;
