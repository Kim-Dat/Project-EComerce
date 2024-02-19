import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

const initialState = {
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getProducts = createAsyncThunk("product/get-products", async (data, thunkAPI) => {
    try {
        
        return await productService.getProducts(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const getProduct = createAsyncThunk("product/get-product", async (id, thunkAPI) => {
    try {
        return await productService.getProduct(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const getBodyProducts = createAsyncThunk("product/filter", async (thunkAPI) => {
    try {
        return await productService.getBodyProducts();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const addToWishList = createAsyncThunk("product/add-wishlist", async (id, thunkAPI) => {
    try {
        return await productService.addToWishList(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const rating = createAsyncThunk("product/rating", async (data, thunkAPI) => {
    try {
        return await productService.rating(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const searchProduct = createAsyncThunk("product/search", async (keyword, thunkAPI) => {
    try {
        return await productService.searchProduct(keyword);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.products = action.payload;
            })
            .addCase(getProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.singleProduct = action.payload;
            })
            .addCase(getBodyProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBodyProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(getBodyProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.bodyProduct = action.payload;
            })
            .addCase(addToWishList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToWishList.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(addToWishList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.addedToWishList = action.payload;
            })
            .addCase(rating.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(rating.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(rating.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.rated = action.payload;
                if (state.isSuccess) {
                    toast.success("Add rating to product Successful", {
                        autoClose: 500,
                    });
                }
            })
            .addCase(searchProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(searchProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.searchResult = action.payload;
            });
    },
});

export default productSlice.reducer;
