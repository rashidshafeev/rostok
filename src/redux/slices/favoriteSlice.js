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
    toggleFavorite: (state, action) => {
      console.log(action.payload)
      console.log(state.favorite.find((item) => item.id === action.payload.id))

      const product = state.favorite.find((item) => item.id === action.payload.id)

      if (product) {
        state.favorite = state.favorite.filter((product) => product.id !== action.payload.id);
      } else {
        state.favorite.push({ ...action.payload})
      }

    }
  },
});

export const {
 toggleFavorite
} = favoriteSlice.actions;
export default favoriteSlice.reducer;