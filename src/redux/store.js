import { combineReducers, configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/userSlice';
import cartReducer, { addToCart, removeFromCart } from './slices/cartSlice';
import productsReducer from './slices/productsSlice';
import { api  } from './api/api';
import favoriteReducer, { toggleFavorite } from './slices/favoriteSlice';
import comparisonReducer, { toggleComparison } from './slices/comparisonSlice';
import organizationsReducer, { addOrganization } from './slices/organizationsSlice';
import { listenerMiddleware } from './listeners';



const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  product: productsReducer,
  cart: cartReducer,
  favorite: favoriteReducer,
  comparison: comparisonReducer,
  organizations: organizationsReducer,
  [api.reducerPath]: api.reducer,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  // reducer: persistedReducer,
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
    .prepend(listenerMiddleware.middleware)
    .concat(api.middleware),
});

export default store;

// export const persistor = persistStore(store);
