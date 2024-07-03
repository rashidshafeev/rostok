import { createSlice } from '@reduxjs/toolkit';

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
      const favorite = JSON.parse(sessionStorage.getItem('favorite'));
      state.favorite = favorite || []
    },
    setFavorite: (state, action) => {
      state.favorite = action.payload;
    },
    toggleFavorite: (state, action) => {
      const product = state.favorite.find(
        (item) => item.id === action.payload.id
      );

      if (product) {
        state.favorite = state.favorite.filter(
          (product) => product.id !== action.payload.id
        );
      } else {
        state.favorite.push({ ...action.payload });
      }
    },
  },
});

export const { fetchFavorite, setFavorite, toggleFavorite } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
