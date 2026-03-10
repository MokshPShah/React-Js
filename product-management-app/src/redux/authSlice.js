import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:3001/users";

export const registerUser = createAsyncThunk(
    "auth/register",
    async (user, { rejectWithValue }) => {
        try {
            const res = await axios.post(API, user);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res = await axios.get(API);

            const user = res.data.find(
                (u) => u.email === email && u.password === password
            );

            console.log("Attempting login for:", email);
            console.log("Found user:", user);

            if (!user) {
                return rejectWithValue("Invalid email or password");
            }

            localStorage.setItem("user", JSON.stringify(user));
            return user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || null,
        error: null,
        loading: false,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.error = null;
            localStorage.removeItem("user");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.error = null;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;