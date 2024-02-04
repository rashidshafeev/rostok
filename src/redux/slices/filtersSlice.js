import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: null,
  loading: false,
  error: null,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    fetchFiltersStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchFiltersSuccess: (state, action) => {
      state.loading = false;
      state.filters = action.payload;
      state.error = false;
    },
    fetchFiltersFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logOut: (state) => {
      state.filters = null;
    },
  },
});

export const {
  fetchFiltersStart,
  fetchFiltersSuccess,
  fetchFiltersFailure,
  logOut,
} = filtersSlice.actions;
export default filtersSlice.reducer;
