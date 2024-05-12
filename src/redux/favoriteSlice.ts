import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlaceCardProps } from '../components/PlaceCard';
import { allPlaces } from '../utils/utils';

interface favoriteState {
    favorites: PlaceCardProps[]
}

const initialState: favoriteState = {
    favorites: []
}
const favoriteslice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addToFavorite(state, action: PayloadAction<number>) {
            for (const placeCategory of allPlaces) {
                const foundPlace = placeCategory.find(place => place.id === action.payload);
                if (foundPlace) {
                    state.favorites.push(foundPlace)
                    break
                }
            }
        },
        deleteFromFavorite(state, action: PayloadAction<number>) {
            state.favorites = state.favorites.filter((p) => p.id !== action.payload)
        }
    },
});

export const { addToFavorite, deleteFromFavorite } = favoriteslice.actions;
export default favoriteslice.reducer;
