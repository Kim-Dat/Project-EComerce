import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import contactService from "./contactService";
import { toast } from "react-toastify";
const initialState = {
    contact: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const createContact = createAsyncThunk("contact/create-contact", async (contactData, thunkAPI) => {
    try {
        return await contactService.createEnquiry(contactData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const contactSlide = createSlice({
    name: "contact",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createContact.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createContact.rejected, (state) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                if (state.isError) {
                    toast.error("something went wrong !!!", {
                        autoClose: 1000,
                    });
                }
            })
            .addCase(createContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.contact = action.payload;
                if (state.isSuccess) {
                    toast.success("Gửi thắc mắc thành công", {
                        autoClose: 500,
                    });
                }
            });
    },
});

export default contactSlide.reducer;
