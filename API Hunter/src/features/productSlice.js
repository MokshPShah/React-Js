import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'http://localhost:5000/products'; // we can put this in .env file this is placed here for demo purpose 

// View Product
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const res = await axios.get(API_URL);
    return res.data;
})

// Add Product
export const addProduct = createAsyncThunk('products/addProducts', async (product) => {
    const res = await axios.post(API_URL, product);
    return res.data;
})

// Update Product 
export const updateProduct = createAsyncThunk('products/updateProducts', async (product) => {
    const res = await axios.put(`${API_URL}/${product.id}`, product);
    return res.data;
})

// Delete Product
export const deleteProduct = createAsyncThunk('products/deleteProducts', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
})

const initialState = {
    items: [],
    loading: false,
    error: null
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const idx = state.items.findIndex((p) => p.id === action.payload.id)
                if (idx !== -1) state.items[idx] = action.payload
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter((p) => p.id !== action.payload)
            })
    }
})

export default productSlice.reducer;