// src/features/comparison/comparisonSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getTokenFromCookies,
  saveToSessionStorage,
} from "@helpers/cookies/cookies";
import { Product } from "@customTypes/Product/Product";
import { ComparisonState } from "@/types/Store/Comparison/ComparisonState";

const initialState: ComparisonState = {
  comparison: [],
};

export const comparisonSlice = createSlice({
  name: "comparison",
  initialState,
  reducers: {
    setComparison: (state, action: PayloadAction<Product[]>) => {
      state.comparison = action.payload || [];
    },
    addToComparison: (state, action: PayloadAction<Product>) => {
      const token = getTokenFromCookies();
      state.comparison.push({ ...action.payload });
      if (!token) {
        saveToSessionStorage("comparison", state.comparison);
      }
    },
    removeFromComparison: (state, action: PayloadAction<Product>) => {
      const token = getTokenFromCookies();
      state.comparison = state.comparison.filter(
        (item) => item.id !== action.payload.id
      );
      if (!token) {
        saveToSessionStorage("comparison", state.comparison);
      }
    },
  },
});

export const { setComparison, addToComparison, removeFromComparison } =
  comparisonSlice.actions;
export default comparisonSlice.reducer;
