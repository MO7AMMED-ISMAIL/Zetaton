import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, updateDoc,setDoc, getDoc, arrayUnion } from 'firebase/firestore';
import auth,{db} from '../firebase/firebase';



export const addFavorite = createAsyncThunk('favorites/addFavorite', async (photoUrl) => {
    const user = auth.currentUser;
    if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            // Create the document if it doesn't exist
            await setDoc(userDocRef, { favorites: [] });
        }

        await updateDoc(userDocRef, {
            favorites: arrayUnion(photoUrl),
        });

        return photoUrl;
    } else {
        throw new Error('User not authenticated');
    }
});

export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async () => {
    const user = auth.currentUser;
    if (user) {
        const userDoc = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
            return docSnap.data().favorites || [];
        } else {
            throw new Error('No such document!');
        }
    } else {
        throw new Error('User not authenticated');
    }
});

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState: {
        favorites: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addFavorite.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addFavorite.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.favorites.push(action.payload);
            })
            .addCase(addFavorite.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchFavorites.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.favorites = action.payload;
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default favoriteSlice.reducer;
