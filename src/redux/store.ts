
import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice';
import reservationReducer from './reservationSlice';
import menuReducer from './MenuSlice'
import galleryReducer from './gallerySlice';
import favoritesReducer from './favoriteSlice';
import adminReducer from './adminSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    token: tokenReducer,
    reservation: reservationReducer,
    menu: menuReducer,
    gallery: galleryReducer,
    favorite: favoritesReducer,
    admin:adminReducer,
    user:userReducer,
  },
});


export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
