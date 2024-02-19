import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import orderService from "./orderSevice";
const initialState = {
    orders: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: "",
};

export const getOrders = createAsyncThunk("order/get-orders", async (thunkAPI) => {
    try {
        return await orderService.getOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const getOrderUserById = createAsyncThunk("order/get-order-user-id", async (id, thunkAPI) => {
    try {
        return await orderService.getOrderUserById(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const updateOrderStatus = createAsyncThunk("order/update-order-status", async (data, thunkAPI) => {
    try {
        return await orderService.patchOrderStatus(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const getMonthlyOrders = createAsyncThunk("order/get-month-orders", async (thunkAPI) => {
    try {
        return await orderService.getMonthlyOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const getYearlyOrders = createAsyncThunk("order/get-year-orders", async (thunkAPI) => {
    try {
        return await orderService.getYearlyOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "rejected";
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.orders = action.payload;
            })
            .addCase(getOrderUserById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderUserById.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "rejected";
            })
            .addCase(getOrderUserById.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.orderUserId = action.payload;
            })
            .addCase(updateOrderStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateOrderStatus.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "rejected";
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.updatedOrderStatus = action.payload;
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
            });
    },
});

export default orderSlice.reducer;
