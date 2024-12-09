// src/features/favorite/favoriteSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTokenFromCookies, saveToSessionStorage } from '@helpers/cookies/cookies';
import { Product } from '@customTypes/Product/Product';
import { FavoriteState } from '@/types/Store/Favorite/FavoriteState';
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

const initialState: FavoriteState = {
  favorite: [],
  categories: [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setFavorite: (state, action: PayloadAction<Product[]>) => {
      state.favorite = action.payload || [];
      state.categories = parseCategories(state.favorite);
    },
    addToFavorite: (state, action: PayloadAction<Product>) => {
      const token = getTokenFromCookies();
      state.favorite.push({ ...action.payload });
      state.categories = parseCategories(state.favorite);
      if (!token) {
        saveToSessionStorage('favorite', state.favorite);
      }
    },
    removeFromFavorite: (state, action: PayloadAction<Product>) => {
      const token = getTokenFromCookies();
      state.favorite = state.favorite.filter((item) => item.id !== action.payload.id);
      state.categories = parseCategories(state.favorite);
      if (!token) {
        saveToSessionStorage('favorite', state.favorite);
      }
    },
  },
});

export const { setFavorite, addToFavorite, removeFromFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
