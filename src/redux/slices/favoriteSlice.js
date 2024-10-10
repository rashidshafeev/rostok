// src/features/favorite/favoriteSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { getTokenFromCookies, saveToSessionStorage } from '../../helpers/cookies/cookies';

const initialState = {
  favorite: [],
  loading: false,
  error: null,
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    fetchFavorite: (state) => {
      // No need to handle token here, as it's for initial fetch
    },
    setFavorite: (state, action) => {
      state.favorite = action.payload || [];
    },
    addToFavorite: (state, action) => {
      const token = getTokenFromCookies();
        state.favorite.push({ ...action.payload });
      if (!token) {
        
        saveToSessionStorage('favorite', state.favorite);
      }
    },
    removeFromFavorite: (state, action) => {
      const token = getTokenFromCookies();
        state.favorite = state.favorite.filter((item) => item.id !== action.payload.id);
        if (!token) {

        saveToSessionStorage('favorite', state.favorite);
      }
    },
  },
});

export const { fetchFavorite, setFavorite, addToFavorite, removeFromFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;

