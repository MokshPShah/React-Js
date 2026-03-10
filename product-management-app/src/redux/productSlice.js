import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:3001/products";

export const fetchProducts = createAsyncThunk("products/fetch", async (_, { rejectWithValue }) => {
    try {
        const userData = localStorage.getItem("user");
        if (!userData) return rejectWithValue("No user found in storage");

        const user = JSON.parse(userData);
        const res = await axios.get(`${API}?userId=${user.id}`);

        console.log("Fetched Products:", res.data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const addProduct = createAsyncThunk("products/add", async (product) => {
    const res = await axios.post(API, product);
    return res.data;
});

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
    await axios.delete(`${API}/${id}`);
    return id;
});

export const updateProduct = createAsyncThunk("products/update", async (product) => {
    const res = await axios.put(`${API}/${product.id}`, product);
    return res.data;
});

const productSlice = createSlice({
    name: "products",
    initialState: { items: [], loading: false, error: null },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })

            .addCase(fetchProducts.rejected, (state) => {
                state.loading = false;
            })

            .addCase(addProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })

            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter(p => p.id !== action.payload);
            })

            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex(p => p.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            });
    }
});

export default productSlice.reducer;