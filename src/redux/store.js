import { configureStore } from '@reduxjs/toolkit';
import photoReducer from './photoSlice';
import favoriteSlice from './favoriteSlice';

const store = configureStore({
    reducer: {
        photos: photoReducer,
        favorites: favoriteSlice
    },
});

export default store;
