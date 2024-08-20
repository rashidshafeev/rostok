import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (filters) => {
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters),
  }); // Replace with your actual API endpoint
  return response.json();
});

const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectProducts = createSelector(
  (state) => state.products,
  (products) => products
);

export default productsSlice.reducer;
