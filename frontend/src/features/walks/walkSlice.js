import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import walkService from "./walkService";

const initialState = {
    walks: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const createWalk = createAsyncThunk(
    "walks/create",
    async (walkData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            console.log("Enviando datos a createWalk:", walkData);
            return await walkService.createWalk(walkData, token);
        } catch (error) {
            console.error(
                "Error en createWalk:",
                error.response?.data || error.message
            );
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Error desconocido"
            );
        }
    }
);

export const getWalks = createAsyncThunk(
    "walks/getAll",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await walkService.getWalks(token);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

const walkSlice = createSlice({
    name: "walks",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createWalk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createWalk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.walks.push(action.payload);
            })
            .addCase(createWalk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getWalks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getWalks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.walks = action.payload;
            })
            .addCase(getWalks.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = walkSlice.actions;
export default walkSlice.reducer;
