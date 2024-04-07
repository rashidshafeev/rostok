import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  itemsQuantity: 0,
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(action.payload)
      console.log(state.cart.find((item) => item.id === action.payload.id))

      const product = state.cart.find((item) => item.id === action.payload.id)

      if (product) {
        product.quantity += 1
      } else {
        console.log("!product")
        const newProduct = { ...action.payload, quantity: 1 }
        state.cart.push(newProduct)
      }

      const itemsQuantity = state.cart.reduce((accumulator, item) => { 
        accumulator += item.quantity
        return accumulator
      }, 0)
      state.itemsQuantity = itemsQuantity
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((product) => product.id !== action.payload.id);

      const itemsQuantity = state.cart.reduce((accumulator, item) => { 
        accumulator += item.quantity
        return accumulator
      }, 0)
      state.itemsQuantity = itemsQuantity
    },
    changeQuantity: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload.product.id)

      if (product.quantity + action.payload.quantity <= 0) {
        state.cart = state.cart.filter((product) => product.id !== action.payload.product.id);
      } else {
        product.quantity = product.quantity + action.payload.quantity
      }

      const itemsQuantity = state.cart.reduce((accumulator, item) => { 
        accumulator += item.quantity
        return accumulator
      }, 0)
      state.itemsQuantity = itemsQuantity

      
    },
    fetchCartStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchCartSuccess: (state, action) => {
      state.loading = false;
      state.catalog = action.payload;
      state.error = false;
    },
    fetchCartFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logOut: (state) => {
      state.catalog = null;
    },
  },
});

export const {
  fetchCartStart,
  fetchCartSuccess,
  fetchCartFailure,
  addToCart,
  removeFromCart,
  changeQuantity,
  addToCartStart,
  addToCartSuccess,
  addToCartFailure,
  removeFromCartStart,
  removeFromCartSuccess,
  removeFromCartFailure,
} = cartSlice.actions;

export default cartSlice.reducer;
