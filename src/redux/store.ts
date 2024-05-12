
import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice';
import reservationReducer from './reservationSlice';
import requestReducer from './requestSlice';
import menuReducer from './MenuSlice'
import galleryReducer from './gallerySlice';
import favoritesReducer from './favoriteSlice';

const store = configureStore({
  reducer: {
    token: tokenReducer,
    reservation: reservationReducer,
    request: requestReducer,
    menu: menuReducer,
    gallery: galleryReducer,
    favorite: favoritesReducer
  },
});


export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
