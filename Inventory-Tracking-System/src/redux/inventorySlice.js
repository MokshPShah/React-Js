import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase/firebaseConfig";
import { push, ref, remove, set, update } from "firebase/database";

export const addProduct = createAsyncThunk(
    'inventory/addProduct',
    async (productData, { rejectWithValue }) => {
        try {
            const inventoryRef = ref(db, 'inventory');
            const newProductRef = push(inventoryRef);

            await set(newProductRef, { ...productData, id: newProductRef.key });
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const updateProduct = createAsyncThunk(
    'inventory/updateProduct',
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const productRef = ref(db, `inventory/${id}`);
            await update(productRef, updatedData);
            return { id, updatedData };
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'inventory/deleteProduct',
    async (id, { rejectWithValue }) => {
        try {
            const productRef = ref(db, `inventory/${id}`);
            await remove(productRef);
            return id;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const inventorySlice = createSlice({
    name: 'inventory',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {
        syncInventory: (state, action) => {
            state.items = action.payload;
            state.status = 'succeeded';
        },
        setLoading: (state) => {
            state.status = 'loading';
        },
        setError: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => { state.status = 'loading' })
            .addCase(addProduct.fulfilled, (state) => { state.status = 'succeeded'; state.error = null })
            .addCase(addProduct.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload })

            .addCase(updateProduct.pending, (state) => { state.status = 'loading' })
            .addCase(updateProduct.fulfilled, (state) => { state.status = 'succeeded'; state.error = null })
            .addCase(updateProduct.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload })

            .addCase(deleteProduct.pending, (state) => { state.status = 'loading' })
            .addCase(deleteProduct.fulfilled, (state) => { state.status = 'succeeded'; state.error = null })
            .addCase(deleteProduct.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload })
    }
})

export const { syncInventory, setLoading, setError } = inventorySlice.actions;
export default inventorySlice.reducer;