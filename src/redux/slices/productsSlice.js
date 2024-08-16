import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  isLoading: false,
  isSuccess: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIsSuccess(state, action) {
      state.isSuccess = action.payload;
    },
  },
});

export const { setProducts, setIsLoading, setIsSuccess } = productsSlice.actions;
export default productsSlice.reducer;
