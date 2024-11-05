// src/features/favorite/favoriteSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTokenFromCookies, saveToSessionStorage } from '@helpers/cookies/cookies';
import { Product } from '@customTypes/Product/Product';
import { FavoriteState } from '@/types/Store/Favorite/FavoriteState';

const initialState: FavoriteState = {
  favorite: [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setFavorite: (state, action: PayloadAction<Product[]>) => {
      state.favorite = action.payload || [];
    },
    addToFavorite: (state, action: PayloadAction<Product>) => {
      const token = getTokenFromCookies();
        state.favorite.push({ ...action.payload });
      if (!token) {
        
        saveToSessionStorage('favorite', state.favorite);
      }
    },
    removeFromFavorite: (state, action: PayloadAction<Product>) => {
      const token = getTokenFromCookies();
        state.favorite = state.favorite.filter((item) => item.id !== action.payload.id);
        if (!token) {

        saveToSessionStorage('favorite', state.favorite);
      }
    },
  },
});

export const { setFavorite, addToFavorite, removeFromFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;

