import { createSlice } from '@reduxjs/toolkit';
import { getTokenFromCookies } from '../../helpers/cookies/cookies';

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
    toggleFavorite: (state, action) => {
      const token = getTokenFromCookies();
      if (!token) {
        console.log('fired')
        const product = state.favorite.find((item) => item.id === action.payload.id);
        if (product) {
          state.favorite = state.favorite.filter((item) => item.id !== action.payload.id);
        } else {
          state.favorite.push({ ...action.payload });
        }
      }
    },
  },
});

export const { fetchFavorite, setFavorite, toggleFavorite } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
