import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: null,
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchCartStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchCartSuccess: (state, action) => {
      state.loading = false;
      state.catalog = action.payload;
      state.error = false;
    },
    fetchCartFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logOut: (state) => {
      state.catalog = null;
    },
  },
});

export const {
  fetchCartStart,
  fetchCartSuccess,
  fetchCartFailure,
  logOut,
} = cartSlice.actions;
export default cartSlice.reducer;
