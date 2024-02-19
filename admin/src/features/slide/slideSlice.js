import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import slideService from "./slideService";
import { toast } from "react-toastify";

const initialState = {
    slides: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: "",
};

export const getSlides = createAsyncThunk("slide/get-slides", async (thunkAPI) => {
    try {
        return await slideService.getSlides();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const createSlide = createAsyncThunk("slide/create-slide", async (slide, thunkAPI) => {
    try {
        return await slideService.postSlide(slide);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const deleteSlide = createAsyncThunk("slide/delete-slide", async (id, thunkAPI) => {
    try {
        return await slideService.deleteSlide(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
const SlideSlice = createSlice({
    name: "slides",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSlides.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSlides.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.slides = action.payload;
            })
            .addCase(getSlides.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "Không có sản phẩm nào";
            })
            .addCase(createSlide.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createSlide.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdSlide = action.payload;
                toast.success("Thêm Slide thành công");
            })
            .addCase(createSlide.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteSlide.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteSlide.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedSlide = action.payload;
                toast.success("Xoá Slide thành công");
            })
            .addCase(deleteSlide.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
    },
});

export default SlideSlice.reducer;
