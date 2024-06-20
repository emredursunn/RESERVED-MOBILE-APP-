import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlaceCardProps } from '../components/PlaceCard';
import { BASE_URL } from '../utils/utils';
import axios from 'axios';

interface favoriteState {
    favorites: number[]
}

const initialState: favoriteState = {
    favorites: []
}

export const addToFavoriteAsync = createAsyncThunk(
    'add-favorite',
    async ({ restaurantId, token }: { restaurantId: number, token: string }) => {
        try {
            const response = await axios.put(`${BASE_URL}/api/reservation/favorite/add`, {
                'favorites': restaurantId
            },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            console.log(response.data)
            return restaurantId
        } catch (error) {
            console.log("add fav", error)
            throw error
        }
    }
)

export const getFavoritesAsync = createAsyncThunk(
    'get-favorites',
    async ({ token }: { token: string }) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/reservation/favorite/list`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            let data = response.data.data;
            // Gelen veriyi kontrol et ve listeye dönüştür
            if (typeof data === 'object' && !Array.isArray(data)) {
                data = Object.values(data)
            }
            return data;
        } catch (error) {
            console.log("get fav", error);
            throw error;
        }
    }
);

export const deleteFavoriteAsync = createAsyncThunk(
    'delete-favorite',
    async ({ restaurantId, token }: { restaurantId: number, token: string }) => {
        try {
            const response = await axios.put(`${BASE_URL}/api/reservation/favorite/delete`, {
                'favorites': restaurantId
            },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            console.log(response.data)
            return restaurantId
        } catch (error) {
            console.log("delete fav", error)
            throw error
        }
    }
)

const favoriteslice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        clearFavorites: (state) => {
            state.favorites.splice(0, state.favorites.length)
        }
    },
    extraReducers(builder) {
        builder
            .addCase(addToFavoriteAsync.fulfilled, (state, action: PayloadAction<number>) => {
                const id = action.payload
                state.favorites.push(id)
            })
            .addCase(getFavoritesAsync.fulfilled, (state, action) => {
                const favoritesList = action.payload
                state.favorites = favoritesList
            })
            .addCase(deleteFavoriteAsync.fulfilled, (state, action: PayloadAction<number>) => {
                const id = action.payload;
                state.favorites = state.favorites.filter((p) => p !== id);
            })
    },
});

export const  { clearFavorites } = favoriteslice.actions
export default favoriteslice.reducer;
