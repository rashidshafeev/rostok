import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comparison: [],
  loading: false,
  error: null,
};

export const comparisonSlice = createSlice({
  name: 'comparison',
  initialState,
  reducers: {
    toggleComparison: (state, action) => {
      const product = state.comparison.find((item) => item.id === action.payload.id)

      if (product) {
        state.comparison = state.comparison.filter((product) => product.id !== action.payload.id);
      } else {
        state.comparison.push({ ...action.payload })
      }

    }
  },
});

export const {
  toggleComparison,
} = comparisonSlice.actions;
export default comparisonSlice.reducer;