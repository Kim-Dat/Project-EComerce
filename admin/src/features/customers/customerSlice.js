import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customersService from "./customerService";
//khởi tạo trạng thái
const initialState = {
    customers: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};
/* gọi API lấy data để extraReducers xử lý */
export const getUsers = createAsyncThunk("customer/get-customers", async (thunkAPI) => {
    try {
        return await customersService.getUsers();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const customerSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsers.rejected, (state) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = "rejected";
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                state.customers = action.payload;
            });
    },
}) 

export default customerSlice.reducer;
