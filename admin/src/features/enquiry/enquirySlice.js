import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";

const initialState = {
    enquiries: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
    enquiryStatus: ""
};

export const getEnquiries = createAsyncThunk(
    "enquiry/get-enquiries",
    async (thunkAPI) => {
        try {
            return await enquiryService.getEnquiries();
        } catch (error) {
            thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteEnquiry = createAsyncThunk(
    "enquiry/delete-enquiry",
    async (id, thunkAPI) => {
        try {
            return await enquiryService.deleteEnquiry(id);
        } catch (error) {
            thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateEnquiry = createAsyncThunk(
    "enquiry/update-enquiry",
    async (enquiry, thunkAPI) => {
        try {
            return await enquiryService.putEnquiry(enquiry);
        } catch (error) {
            thunkAPI.rejectWithValue(error);
        }
    }
);
export const getEnquiry = createAsyncThunk(
    "enquiry/get-enquiry",
    async (id, thunkAPI) => {
        try {
            return await enquiryService.getEnquiry(id);
        } catch (error) {
            thunkAPI.rejectWithValue(error);
        }
    }
);

export const resetState = createAction("Reset-all");

const enquirySlice = createSlice({
    name: "enquiries",
    initialState,
    reducers: {
        resetEnquiryStatus : (state, action) => {
            state.enquiryStatus = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEnquiries.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEnquiries.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getEnquiries.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.enquiries = action.payload;
            })
            .addCase(deleteEnquiry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteEnquiry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteEnquiry.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.deletedEnquiry = action.payload;
            })
            .addCase(updateEnquiry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateEnquiry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateEnquiry.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.updatedEnquiry = action.payload;
            })
            .addCase(getEnquiry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEnquiry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getEnquiry.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.enquiryName = action.payload.name;
                state.enquiryEmail = action.payload.email;
                state.enquiryMobile = action.payload.mobile;
                state.enquiryComment = action.payload.comment;
                state.enquiryStatus = action.payload.status;
            })
            .addCase(resetState, () => initialState);
    },
});
export const { resetEnquiryStatus } = enquirySlice.actions;
export default enquirySlice.reducer;
