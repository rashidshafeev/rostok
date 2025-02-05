// // src/app/providers/InitializationProvider/lib/utils.ts
// import { setCart } from '@/features/cart';
// import { setComparison } from '@/features/comparison';
// import { setFavorite } from '@/features/favorite';
// import { setRecentItems } from '@/features/recent-items';

// import type { AppDispatch } from '@/app/providers/store';
// import type { Product } from '@/entities/product';
// import type { LocalCartState } from '@/features/cart';
// import type { RecentItemsProduct } from '@/features/recent-items';

// const getStorageItem = <T>(key: string, fallback: T): T => {
//   try {
//     const item = sessionStorage.getItem(key);
//     if (!item) return fallback;

//     return JSON.parse(item) as T;
//   } catch (error) {
//     console.error(`Error parsing ${key} from sessionStorage:`, error);
//     return fallback;
//   }
// };

// export const syncLocalStorageWithState = (dispatch: AppDispatch): void => {
//   const comparison = getStorageItem<Product[]>('comparison', []);
//   const favorite = getStorageItem<Product[]>('favorite', []);
//   const recentItems = getStorageItem<RecentItemsProduct[]>('recentItems', []);
//   const cart = getStorageItem<LocalCartState | null>('cart', null);

//   dispatch(setComparison(comparison));
//   dispatch(setFavorite(favorite));
//   dispatch(setRecentItems(recentItems));
//   dispatch(setCart(cart));
// };

// src/app/providers/InitializationProvider/lib/utils.ts
import { setCart } from '@/features/cart';
import { setComparison } from '@/features/comparison';
import { setFavorite } from '@/features/favorite';
import { setRecentItems } from '@/features/recent-items';

import type { AppDispatch } from '@/app/providers/store';

export const syncLocalStorageWithState = (dispatch: AppDispatch) => {
  const comparison = JSON.parse(sessionStorage.getItem('comparison') ?? '[]');
  const favorite = JSON.parse(sessionStorage.getItem('favorite') ?? '[]');
  const recentItems = JSON.parse(sessionStorage.getItem('recentItems') ?? '[]');
  const cart = JSON.parse(sessionStorage.getItem('cart') ?? 'null');

  dispatch(setComparison(comparison));
  dispatch(setFavorite(favorite));
  dispatch(setRecentItems(recentItems));
  dispatch(setCart(cart));
};