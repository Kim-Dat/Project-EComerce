import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import userService from "./userService";
import { toast } from "react-toastify";

const getCustomerFromLocalStorage = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")) : null;

const initialState = {
    user: getCustomerFromLocalStorage,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const registerUser = createAsyncThunk("user/register", async (user, thunkAPI) => {
    try {
        return await userService.registerUser(user);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const loginUser = createAsyncThunk("user/login", async (user, thunkAPI) => {
    try {
        return await userService.loginUser(user);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const getWishList = createAsyncThunk("user/get-wishlist", async (thunkAPI) => {
    try {
        return await userService.getWishList();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const addToCart = createAsyncThunk("user/add-cart", async (cartData, thunkAPI) => {
    try {
        return await userService.addToCart(cartData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const getUserCart = createAsyncThunk("user/get-cart", async (thunkAPI) => {
    try {
        return await userService.getCart();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const emptyCart = createAsyncThunk("user/empty-cart", async (thunkAPI) => {
    try {
        return await userService.emptyCart();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const updateUser = createAsyncThunk("user/update-user", async (data, thunkAPI) => {
    try {
        return await userService.updateUser(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const removeProductFromCart = createAsyncThunk("user/delete-product-cart", async (id, thunkAPI) => {
    try {
        return await userService.removeProductFromCart(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const forgotPasswordToken = createAsyncThunk("user/forgot-pass-token", async (data, thunkAPI) => {
    try {
        return await userService.forgotPasswordToken(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const resetPassword = createAsyncThunk("user/reset-password", async (data, thunkAPI) => {
    try {
        return await userService.resetPassword(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const deleteAUser = createAsyncThunk("user/delete-user", async (id, thunkAPI) => {
    try {
        return await userService.deleteAUser(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction("Reset-all");
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.user = null;
                state.message = "rejected";
                if (state.isError) {
                    toast.error(action.payload.response.data.message, {
                        autoClose: 500,
                    });
                }
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.createUser = action.payload;
                if (state.isSuccess) {
                    toast.success("User Create Successfully", {
                        autoClose: 500,
                    });
                }
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.user = null;
                if (state.isError) {
                    toast.error(action.payload.response.data.message, {
                        autoClose: 500,
                    });
                }
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.user = action.payload;
                if (state.isSuccess) {
                    toast.success("Login Successfully!!!", {
                        autoClose: 300,
                    });
                }
            })
            .addCase(getWishList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getWishList.rejected, (state) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.user = null;
                state.message = "rejected";
            })
            .addCase(getWishList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.wishlist = action.payload;
            })
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                state.productInCart = action.payload;
                if (state.isSuccess) {
                    toast.success("Add to cart successfully", {
                        autoClose: 1000,
                    });
                }
            })
            .addCase(getUserCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserCart.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getUserCart.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                state.cartProducts = action.payload;
            })
            .addCase(removeProductFromCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeProductFromCart.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.error("Something Went Wrong !!!", {
                        autoClose: 1000,
                    });
                }
            })
            .addCase(removeProductFromCart.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                state.removeProductFromCart = action.payload;
                if (state.isSuccess) {
                    toast.success("Delete product in the cart successfully", {
                        autoClose: 500,
                    });
                }
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.error("Something Went Wrong !!!", {
                        autoClose: 1000,
                    });
                }
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                state.updatedUser = action.payload;
                if (state.isSuccess) {
                    let currentUserData = JSON.parse(localStorage.getItem("customer"));
                    console.log("currentUserData :", currentUserData);
                    let newUserData = {
                        ...currentUserData,
                        firstName: action.payload.firstName,
                        lastName: action.payload.lastName,
                        email: action.payload.email,
                        mobile: action.payload.mobile,
                    };
                    console.log("newUserData:", newUserData);
                    localStorage.setItem("customer", JSON.stringify(newUserData));
                    toast.success("Profile Updated successfully", {
                        autoClose: 1000,
                    });
                }
            })
            .addCase(forgotPasswordToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(forgotPasswordToken.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.error("Something Went Wrong !!!", {
                        autoClose: 1000,
                    });
                }
            })
            .addCase(forgotPasswordToken.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                state.passToken = action.payload;
                if (state.isSuccess) {
                    toast.success("Forgot Password Email Sent Successfully", {
                        autoClose: 1000,
                    });
                }
            })
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.error("Something Went Wrong !!!", {
                        autoClose: 1000,
                    });
                }
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                state.newPass = action.payload;
                if (state.isSuccess) {
                    toast.success("Change Password Successfully", {
                        autoClose: 1000,
                    });
                }
            })
            .addCase(emptyCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(emptyCart.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(emptyCart.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                state.emptyCart = action.payload;
            })
            .addCase(deleteAUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAUser.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteAUser.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
                state.deletedUser = action.payload;
                if (state.isSuccess) {
                    toast.success("Delete account Successfully", {
                        autoClose: 300,
                    });
                    localStorage.clear();
                    window.location.reload();
                }
            })
            .addCase(resetState, () => initialState);
    },
});

export default userSlice.reducer;
