import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

const initialState = {
    products: [],
    createdProduct: "",
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: "",
};

export const getProducts = createAsyncThunk("product/get-products", async (thunkAPI) => {
    try {
        return await productService.getProducts();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const createProduct = createAsyncThunk("product/create-product", async (product, thunkAPI) => {
    try {
        return await productService.postProduct(product);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const updateProduct = createAsyncThunk("product/update-product", async (product, thunkAPI) => {
    try {
        return await productService.putProduct(product);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const deleteProduct = createAsyncThunk("product/delete-product", async (id, thunkAPI) => {
    try {
        return await productService.deleteProduct(id);
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
export const resetState = createAction("Reset_all");
const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "Failed to create product";
            })
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdProduct = action.payload;
                toast.success("Thêm sản phẩm thành công");
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedProduct = action.payload;
                toast.success("Xoá sản phẩm thành công");
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedProduct = action.payload;
                toast.success("Cập nhật sản phẩm thành công");
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.productName = action.payload.title;
                state.productBrand = action.payload.brand;
                state.productPrice = action.payload.price;
                state.productDesc = action.payload.description;
                state.productCate = action.payload.category;
                state.productQuantity = action.payload.quantity;
                state.productTags = action.payload.tags;
                state.productColor = action.payload.color;
                state.productImages = action.payload.images;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default productSlice.reducer;
