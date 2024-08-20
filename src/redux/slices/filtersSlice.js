import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

export const fetchFilters = createAsyncThunk('filters/fetchFilters', async () => {
  const response = await fetch('/api/filters'); // Replace with your actual API endpoint
  return response.json();
});

const filtersSlice = createSlice({
  name: 'filters',
  initialState: [],
  reducers: {
    
    updateFilterState: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { updateFilterState } = filtersSlice.actions;

export const selectFilters = createSelector(
  (state) => state.filters,
  (filters) => filters
);

export default filtersSlice.reducer;
