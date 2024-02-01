import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  catalog: null,
  loading: false,
  error: null,
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    fetchCatalogStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchCatalogSuccess: (state, action) => {
      state.loading = false;
      state.catalog = action.payload;
      state.error = false;
    },
    fetchCatalogFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logOut: (state) => {
      state.catalog = null;
    },
  },
});

export const {
  fetchCatalogStart,
  fetchCatalogSuccess,
  fetchCatalogFailure,
  logOut,
} = catalogSlice.actions;
export default catalogSlice.reducer;
