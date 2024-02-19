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
                state.message = "Không có Slide nào";
            })
    },
});

export default SlideSlice.reducer;
