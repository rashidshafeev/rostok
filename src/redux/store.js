import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/userSlice';
import categoryTreeReducer from './slices/categoryTreeSlice';
import filtersReducer from './slices/filtersSlice';
import cartReducer from './slices/cartSlice';
import createSagaMiddleware from '@redux-saga/core'
import rootSaga from './sagas/rootSaga';
import productsReducer from './slices/productsSlice';
import { api } from './api/api';
import { createLogger } from 'redux-logger';
import favoriteReducer from './slices/favoriteSlice';
import comparisonReducer from './slices/comparisonSlice';

const saga = createSagaMiddleware()

const logger = createLogger({collapsed: true,
 duration: true,
 diff: true,
 colors: {
   title: () => '#000',
   prevState: () => '#9E9E9E',
   action: () => '#000',
   nextState: () => '#000',
   error: () => '#FF0000',
 },
});

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
  [api.reducerPath]: api.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });


export const store = configureStore({
  // reducer: {
  //   user: userReducer,
  // catalog: catalogReducer,
  // filters: filtersReducer,
  // cart: cartReducer,
  // },
  reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware({
  //           serializableCheck: false,
  //         }).concat(saga)
  // },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
                serializableCheck: false,
              }).concat(api.middleware),
});

// saga.run(rootSaga)

export default store

export const persistor = persistStore(store);


