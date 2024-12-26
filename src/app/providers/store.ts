import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from '@/redux/api/api';
import userReducer from '@/redux/slices/userSlice';
import cartReducer from '@/redux/slices/cartSlice';
import favoriteReducer from '@/redux/slices/favoriteSlice';
import comparisonReducer from '@/redux/slices/comparisonSlice';
import organizationsReducer from '@/redux/slices/organizationsSlice';
import recentItemsReducer from '@/redux/slices/recentItemsSlice';
import { useDispatch } from 'react-redux';

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
    })
      .concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default store;
