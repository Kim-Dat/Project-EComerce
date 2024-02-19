import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";
import { toast } from "react-toastify";
const initialState = {
    order: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const createOrder = createAsyncThunk("order/create-order", async (orderData, thunkAPI) => {
    try {
        return await orderService.createOrder(orderData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const getOrders = createAsyncThunk("order/get-orders", async (thunkAPI) => {
    try {
        return await orderService.getOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const destroyOrders = createAsyncThunk("order/destroy-orders", async (thunkAPI) => {
    try {
        return await orderService.destroyOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const contactSlide = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrder.rejected, (state) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                if (state.isError) {
                    toast.error("something went wrong !!!", {
                        autoClose: 1000,
                    });
                }
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.order = action.payload;
                if (state.isSuccess) {
                    toast.success("Order Create Successfully", {
                        autoClose: 500,
                    });
                }
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.getOrderedProduct = action.payload;
            })
            .addCase(destroyOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(destroyOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(destroyOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.destroyedOrders = action.payload;
                if (state.isSuccess) {
                    toast.success("Xóa đơn hàng thành công", {
                        autoClose: 500,
                    });
                }
            });
    },
});

export default contactSlide.reducer;
