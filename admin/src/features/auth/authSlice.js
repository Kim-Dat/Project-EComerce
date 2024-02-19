import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const getUserFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
const initialState = {
    user: getUserFromLocalStorage,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};
export const login = createAsyncThunk("auth/admin-login", async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getMonthlyOrders = createAsyncThunk("order/get-month-orders", async (thunkAPI) => {
    try {
        return await authService.getMonthlyOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const getYearlyOrders = createAsyncThunk("order/get-year-orders", async (thunkAPI) => {
    try {
        return await authService.getYearlyOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const isBlockCustomer = createAsyncThunk("order/isBlock-customer", async (data, thunkAPI) => {
    try {
        return await authService.isBlockCustomer(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const getBlocks = createAsyncThunk("order/get-blogs", async (thunkAPI) => {
    try {
        return await authService.getBlocks();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.user = null;
                state.message = "rejected";
            })
            .addCase(getMonthlyOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMonthlyOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.monthOrders = action.payload;
            })
            .addCase(getMonthlyOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.user = null;
                state.message = action.error;
            })
            .addCase(getYearlyOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getYearlyOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.yearOrders = action.payload;
            })
            .addCase(getYearlyOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.user = null;
                state.message = action.error;
            })
            .addCase(isBlockCustomer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(isBlockCustomer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isBlocked = action.payload;
            })
            .addCase(isBlockCustomer.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.user = null;
                state.message = action.error;
            })
            .addCase(getBlocks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlocks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.blocks = action.payload;
            })
            .addCase(getBlocks.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.user = null;
                state.message = action.error;
            });
    },
});

export default authSlice.reducer;
