// src/features/comparison/comparisonSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { getTokenFromCookies, saveToSessionStorage } from '../../helpers/cookies/cookies';

const initialState = {
  comparison: [],
  loading: false,
  error: null,
};

export const comparisonSlice = createSlice({
  name: 'comparison',
  initialState,
  reducers: {
    fetchComparison: (state) => {
      // No need to handle token here, as it's for initial fetch
    },
    setComparison: (state, action) => {
      state.comparison = action.payload || [];
    },
    addToComparison: (state, action) => {
      const token = getTokenFromCookies();
        state.comparison.push({ ...action.payload });
      if (!token) {

        saveToSessionStorage('comparison', state.comparison);
      }
    },
    removeFromComparison: (state, action) => {
      const token = getTokenFromCookies();
        state.comparison = state.comparison.filter((item) => item.id !== action.payload.id);
      if (!token) {

        saveToSessionStorage('comparison', state.comparison);
      }
    },
  },
});

export const { fetchComparison, setComparison, addToComparison, removeFromComparison } = comparisonSlice.actions;
export default comparisonSlice.reducer;
