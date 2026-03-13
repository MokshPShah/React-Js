import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ref as dbRef, push, set, get, remove, update } from 'firebase/database';
import { db } from '../../firbase/firebase';

const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const fetchFiles = createAsyncThunk('files/fetchFiles', async (_, { rejectWithValue }) => {
  try {
    const filesRef = dbRef(db, 'documents');
    const snapshot = await get(filesRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
    }
    return []; 
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const uploadFile = createAsyncThunk('files/uploadFile', async ({ file, metadata }, { rejectWithValue }) => {
  try {
    const base64Data = await convertFileToBase64(file);
    
    const fileData = {
      name: file.name,
      type: file.type,
      size: file.size,
      uploadDate: new Date().toISOString(),
      url: base64Data,
      ...metadata
    };

    const newDocRef = push(dbRef(db, 'documents'));
    await set(newDocRef, fileData);

    return { id: newDocRef.key, ...fileData };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteFile = createAsyncThunk('files/deleteFile', async (id, { rejectWithValue }) => {
  try {
    const docDbRef = dbRef(db, `documents/${id}`);
    await remove(docDbRef);
    return id; 
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// 4. Update File Metadata
export const updateFileMetadata = createAsyncThunk('files/updateFileMetadata', async ({ id, updatedData }, { rejectWithValue }) => {
  try {
    const docDbRef = dbRef(db, `documents/${id}`);
    await update(docDbRef, updatedData);
    return { id, updatedData };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const fileSlice = createSlice({
  name: 'files',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      .addCase(uploadFile.pending, (state) => { state.status = 'loading'; })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload); 
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(deleteFile.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })

      .addCase(updateFileMetadata.fulfilled, (state, action) => {
        const { id, updatedData } = action.payload;
        const existingFile = state.items.find(item => item.id === id);
        if (existingFile) Object.assign(existingFile, updatedData); 
      });
  }
});

export default fileSlice.reducer;