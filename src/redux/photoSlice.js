import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCuratedPhotos } from '../services/pexelsService';

export const fetchPhotos = createAsyncThunk('photos/fetchPhotos', async () => {
    const photos = await getCuratedPhotos();
    return photos;
});

const photoSlice = createSlice({
    name: 'photos',
    initialState: {
        photos: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPhotos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPhotos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.photos = action.payload;
            })
            .addCase(fetchPhotos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default photoSlice.reducer;
