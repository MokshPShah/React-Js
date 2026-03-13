import { configureStore } from "@reduxjs/toolkit";
import fileReducer from './slice/fileSlice'

export const store = configureStore({
    reducer: {
        files: fileReducer,
    }
})