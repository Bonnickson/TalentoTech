import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import petReducer from "./features/pets/petSlice";
import walkReducer from "./features/walks/walkSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        pets: petReducer,
        walks: walkReducer,
    },
});
