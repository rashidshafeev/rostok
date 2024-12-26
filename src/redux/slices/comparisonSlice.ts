// src/features/comparison/comparisonSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTokenFromCookies } from '@/features/auth/lib';
import { saveToSessionStorage } from '@/features/storage/lib';
import { Product } from '@/types/Product/Product';
import { ComparisonState } from '@/types/Store/Comparison/ComparisonState';
import { ProductListCategoryChain } from '@/types/Category/ProductListCategoryChain';

const parseCategories = (products: Product[]): ProductListCategoryChain[] => {
  if (!products?.length) return [];
  
  // Create a map to count products per category and prevent duplicates
  const categoryMap = products.reduce((acc, product) => {
    const categoryId = product.category.id;
    if (!acc.has(categoryId)) {
      acc.set(categoryId, {
        category: product.category,
        count: 1
      });
    } else {
      acc.get(categoryId)!.count++;
    }
    return acc;
  }, new Map<number, { category: typeof products[0]['category'], count: number }>());

  // Convert map to array and format as ProductListCategoryChain
  return Array.from(categoryMap.values()).map(({ category, count }) => ({
    chain: [{
      id: category.id,
      name: category.name,
      slug: category.slug || '',
      image: category.image || '',
    }],
    count
  }));
};

const initialState: ComparisonState = {
  comparison: [],
  categories: [],
};

export const comparisonSlice = createSlice({
  name: "comparison",
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
        saveToSessionStorage("comparison", state.comparison);
      }
    },
    removeFromComparison: (state, action: PayloadAction<Product>) => {
      const token = getTokenFromCookies();
      state.comparison = state.comparison.filter(
        (item) => item.id !== action.payload.id
      );
      state.categories = parseCategories(state.comparison);
      if (!token) {
        saveToSessionStorage("comparison", state.comparison);
      }
    },
  },
});

export const { setComparison, addToComparison, removeFromComparison } =
  comparisonSlice.actions;
export default comparisonSlice.reducer;
