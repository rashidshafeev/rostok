// src/features/comparison/comparisonSlice.ts
import { createSlice } from '@reduxjs/toolkit';

import { saveToSessionStorage } from '@/features/storage/lib';
import { getTokenFromCookies } from '@/shared/lib';

import type { ComparisonState } from './types';
import type { ProductListCategoryChain } from '@/entities/category';
import type { Product } from '@/entities/product';
import type { PayloadAction } from '@reduxjs/toolkit';

const parseCategories = (products: Product[]): ProductListCategoryChain[] => {
  if (!products?.length) return [];

  // Create a map to count products per category and prevent duplicates
  const categoryMap = products.reduce((acc, product) => {
    const categoryId = product.category.id;
    if (!acc.has(categoryId)) {
      acc.set(categoryId, {
        category: product.category,
        count: 1,
      });
    } else {
      acc.get(categoryId).count++;
    }
    return acc;
  }, new Map<number, { category: (typeof products)[0]['category']; count: number }>());

  // Convert map to array and format as ProductListCategoryChain
  return Array.from(categoryMap.values()).map(({ category, count }) => ({
    chain: [
      {
        id: category.id,
        name: category.name,
        slug: category.slug || '',
        image: category.image || '',
      },
    ],
    count,
  }));
};

const initialState: ComparisonState = {
  comparison: [],
  categories: [],
};

export const comparisonSlice = createSlice({
  name: 'comparison',
  initialState,
  reducers: {
    setComparison: (state, action: PayloadAction<Product[]>) => {
      state.comparison = action.payload || [];
      state.categories = parseCategories(state.comparison);
    },
    addToComparison: (state, action: PayloadAction<Product>) => {
      const token = getTokenFromCookies();
      state.comparison.push({ ...action.payload });
      state.categories = parseCategories(state.comparison);
      if (!token) {
        saveToSessionStorage('comparison', state.comparison);
      }
    },
    removeFromComparison: (state, action: PayloadAction<Product>) => {
      const token = getTokenFromCookies();
      state.comparison = state.comparison.filter(
        (item) => item.id !== action.payload.id
      );
      state.categories = parseCategories(state.comparison);
      if (!token) {
        saveToSessionStorage('comparison', state.comparison);
      }
    },
  },
});

export const { setComparison, addToComparison, removeFromComparison } =
  comparisonSlice.actions;
export default comparisonSlice.reducer;
