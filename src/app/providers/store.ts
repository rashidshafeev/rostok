import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import userReducer from '@/features/auth/model/userSlice';
import cartReducer from '@/features/cart/model/cartSlice';
import comparisonReducer from '@/redux/slices/comparisonSlice';
import favoriteReducer from '@/redux/slices/favoriteSlice';
import organizationsReducer from '@/redux/slices/organizationsSlice';
import recentItemsReducer from '@/features/recent-items/model/recentItemsSlice';
import { api } from '@/shared/api/api';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  favorite: favoriteReducer,
  comparison: comparisonReducer,
  organizations: organizationsReducer,
  recentItems: recentItemsReducer,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
