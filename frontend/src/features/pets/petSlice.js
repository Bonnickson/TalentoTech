import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import petService from "./petService";
import axios from "axios";
const API_URL = "http://localhost:5000/api/pets";

const initialState = {
    pets: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const createPet = createAsyncThunk(
    "pets/create",
    async (petData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await petService.createPet(petData, token);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const getPets = createAsyncThunk("getAll", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await petService.getPets(token);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const deletePet = createAsyncThunk(
    "pets/delete",
    async (petId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.delete(`${API_URL}/${petId}`, config);
            return petId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

const petSlice = createSlice({
    name: "pets",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPet.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPet.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.pets.push(action.payload);
            })
            .addCase(createPet.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getPets.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.pets = action.payload;
            })
            .addCase(getPets.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deletePet.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.pets = state.pets.filter(
                    (pet) => pet._id !== action.payload // Elimina la mascota que coincide con el ID
                );
            })
            .addCase(deletePet.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = petSlice.actions;
export default petSlice.reducer;
