import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/userSlice';
import categoryTreeReducer from './slices/categoryTreeSlice';
import filtersReducer from './slices/filtersSlice';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productsSlice';
import { api } from './api/api';
import favoriteReducer from './slices/favoriteSlice';
import comparisonReducer from './slices/comparisonSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  categoryTree: categoryTreeReducer,
  product: productsReducer,
  filters: filtersReducer,
  cart: cartReducer,
  favorite: favoriteReducer,
  comparison: comparisonReducer,
  [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});

export default store;

export const persistor = persistStore(store);
