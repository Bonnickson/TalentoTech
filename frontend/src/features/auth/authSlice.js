import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users/";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const register = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            return await authService.register(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            return await authService.login(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout();
});

export const getUserProfile = createAsyncThunk(
    "auth/getProfile",
    async (_, thunkAPI) => {
        try {
            const user = thunkAPI.getState().auth.user;
            const token = user?.token;

            if (!token) {
                return thunkAPI.rejectWithValue("No token available");
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get(API_URL + "profile", config);
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                "Error desconocido";

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    "auth/updateProfile",
    async (userData, thunkAPI) => {
        try {
            // Obtener el token del estado actual
            const state = thunkAPI.getState();
            const token = state.auth.user?.token;

            if (!token) {
                return thunkAPI.rejectWithValue("No authentication token");
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

            const response = await axios.put(
                API_URL + "profile",
                userData,
                config
            );
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.user = action.payload;
                state.profile = action.payload;
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
