import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: {},
  lastChanged: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
    },
    setLastChanged(state, action) {
      state.lastChanged = action.payload;
    },
    resetFilters(state) {
      state.filters = {};
      state.lastChanged = null;
    },
  },
});

export const { setFilters, setLastChanged, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
