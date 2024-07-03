// src/redux/middleware/listenerMiddleware.js
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchComparison,
  setComparison,
  toggleComparison,
} from './slices/comparisonSlice';
import {
  fetchFavorite,
  setFavorite,
  toggleFavorite,
} from './slices/favoriteSlice';
import {
  addToCart,
  changeQuantity,
  fetchCart,
  removeFromCart,
  selectItem,
  setCart,
} from './slices/cartSlice';
import { api } from './api/api';

export const listenerMiddleware = createListenerMiddleware();

// Utility function to save to session storage
const saveToSession = (key, data) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

// Listener for cart actions
listenerMiddleware.startListening({
  matcher: isAnyOf(addToCart, removeFromCart, changeQuantity, selectItem, setCart),
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    const token = state.user.token;
    if (token) {
      try {
        await listenerApi.dispatch(api.endpoints.sendCart.initiate(state.cart.cart)).unwrap();
        await listenerApi.dispatch(api.util.invalidateTags([{ type: 'Cart', id: 'LIST' }, { type: 'User', id: 'DATA' }]));
      } catch (error) {
        console.error('Error saving cart to server:', error);
      }
    } else {
      saveToSession('cart', state.cart);
    }
  },
});

// Listener for favorite actions
listenerMiddleware.startListening({
  actionCreator: toggleFavorite,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    const token = state.user.token;
    // const favorite = state.favorite.favorite;
    const favorite = await listenerApi.dispatch(api.endpoints.getFavorites.initiate())
    console.log("favorite")
    console.log(favorite)

    if (token) {
      try {
        await listenerApi.dispatch(api.endpoints.sendFavorites.initiate({ id: action.payload.id,  })).unwrap();
        await listenerApi.dispatch(api.util.invalidateTags([{ type: 'Favorite', id: 'LIST' }, { type: 'User', id: 'DATA' }]));
      } catch (error) {
        console.error('Error saving favorite to server:', error);
      }
    } else {
      saveToSession('favorite', favorite);
    }
  },
});

// Listener for comparison actions
listenerMiddleware.startListening({
  actionCreator: toggleComparison,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    const token = state.user.token;
    const comparison = state.comparison.comparison;
    if (token) {
      try {
        await listenerApi.dispatch(api.endpoints.sendComparison.initiate(comparison.map(item => item.id))).unwrap();
        await listenerApi.dispatch(api.util.invalidateTags([{ type: 'Comparison', id: 'LIST' }, { type: 'User', id: 'DATA' }]));
      } catch (error) {
        console.error('Error saving comparison to server:', error);
      }
    } else {
      saveToSession('comparison', comparison);
    }
  },
});

// Listener to fetch data from session storage if no token on first load
listenerMiddleware.startListening({
  matcher: isAnyOf(fetchCart, fetchComparison, fetchFavorite),
  effect: (action, listenerApi) => {
    const token = listenerApi.getState().user.token;

    if (!token) {
      if (action.type === fetchCart.type) {
        const cart = JSON.parse(sessionStorage.getItem('cart'));
        listenerApi.dispatch(setCart(cart ? cart : { cart: [], selected: [], itemsQuantity: 0, selectedQuantity: 0 }));
      } else if (action.type === fetchComparison.type) {
        const comparison = JSON.parse(sessionStorage.getItem('comparison'));
        listenerApi.dispatch(setComparison(comparison ? comparison : []));
      } else if (action.type === fetchFavorite.type) {
        const favorite = JSON.parse(sessionStorage.getItem('favorite'));
        listenerApi.dispatch(setFavorite(favorite ? favorite : []));
      }
    }
  },
});
