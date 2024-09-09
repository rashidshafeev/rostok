import { createSlice } from '@reduxjs/toolkit';
import { getTokenFromCookies, saveToSessionStorage } from '../../helpers/cookies/cookies';

const initialState = {
  cart: [],
  selected: [],
  itemsQuantity: 0,
  selectedQuantity: 0,
};

const updateQuantities = (state) => {
  state.itemsQuantity = state.cart.reduce((acc, item) => acc + item.quantity, 0);
  state.selectedQuantity = state.cart.reduce((acc, item) => (item.selected ? acc + item.quantity : acc), 0);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchCart: (state) => {
    },
    setCart: (state, action) => {
      if (!action.payload) {
        state.cart = [];
        state.selected = [];
        state.itemsQuantity = 0;
        state.selectedQuantity = 0;
      } else {
        state.cart = action.payload.cart;
        state.selected = action.payload.selected;
        state.itemsQuantity = action.payload.itemsQuantity;
        state.selectedQuantity = action.payload.selectedQuantity;
      }
    },
    addToCart: (state, action) => {
      const token = getTokenFromCookies()
      if (!token) {
        const product = state.cart.find((item) => item.id === action.payload.id);
        if (product) {
          product.quantity += 1;
        } else {
          const newProduct = { ...action.payload, quantity: 1, selected: 0 };
          state.cart.push(newProduct);
        }
        updateQuantities(state);
        saveToSessionStorage('cart', state);


      }
    },
    removeFromCart: (state, action) => {
      const token = getTokenFromCookies()
      if (!token) {
        state.cart = state.cart.filter((product) => product.id !== action.payload.id);
        updateQuantities(state);
        saveToSessionStorage('cart', state);

      }
    },
    changeQuantity: (state, action) => {
      console.log("action change")
      console.log(action)
      const token = getTokenFromCookies()
      if (!token) {
        const product = state.cart.find((item) => item.id === action.payload.id);
        if (product.quantity + action.payload.quantity <= 0) {
          state.cart = state.cart.filter((product) => product.id !== action.payload.product.id);
        } else {
          product.quantity = action.payload.quantity;
        }
        updateQuantities(state);
        saveToSessionStorage('cart', state);


      }
    },
    selectItem: (state, action) => {
      const token = getTokenFromCookies()
      if (!token) {
        const product = state.cart.find((item) => item.id === action.payload.id);
        if (product) {
          product.selected = 1;
          updateQuantities(state);
        }
        saveToSessionStorage('cart', state);


      }
    },
    unselectItem: (state, action) => {
      const token = getTokenFromCookies()
      if (!token) {
        const product = state.cart.find((item) => item.id === action.payload.id);
        if (product) {
          product.selected = 0;
          updateQuantities(state);
        }
        saveToSessionStorage('cart', state);

      }
    }
  }
});

export const {
  fetchCart,
  setCart,
  addToCart,
  removeFromCart,
  changeQuantity,
  selectItem,
  unselectItem
} = cartSlice.actions;

export default cartSlice.reducer;