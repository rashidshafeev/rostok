import { LocalCartState } from "@customTypes/Store/Cart/CartState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getTokenFromCookies,
  saveToSessionStorage,
} from "@helpers/cookies/cookies";
import { Product } from "@customTypes/Product/Product";
import { PriceType } from "@customTypes/Product/PriceType";

const initialState: LocalCartState = {
  cart: [],
  total: {
    items_count: 0,
    quantity: 0,
    price_before_discount: 0,
    discount: 0,
    price_after_discount: 0,
  },
  selected: {
    items_count: 0,
    quantity: 0,
    price_before_discount: 0,
    discount: 0,
    price_after_discount: 0,
  },
  currency: {
    code: "RUB",
    title: "Рубль",
    symbol: "₽",
  },
};

const updateTotals = (state: LocalCartState) => {
  let totalItemsCount = 0;
  let totalQuantity = 0;
  let totalPriceBeforeDiscount = 0;
  let totalDiscount = 0;
  let selectedItemsCount = 0;
  let selectedQuantity = 0;
  let selectedPriceBeforeDiscount = 0;
  let selectedDiscount = 0;

  state?.cart?.forEach((product) => {
    const quantity = Number(product.quantity);
    const priceBeforeDiscount = product.price.base * quantity;
    const discount = product.price.discount
      ? product.price.discount.discount_amount * quantity
      : 0;

    totalItemsCount += 1;
    totalQuantity += quantity;
    totalPriceBeforeDiscount += priceBeforeDiscount;
    totalDiscount += discount;

    if (product.selected) {
      selectedItemsCount += 1;
      selectedQuantity += quantity;
      selectedPriceBeforeDiscount += priceBeforeDiscount;
      selectedDiscount += discount;
    }
  });

  state.total = {
    items_count: totalItemsCount,
    quantity: totalQuantity,
    price_before_discount: totalPriceBeforeDiscount,
    discount: totalDiscount,
    price_after_discount: totalPriceBeforeDiscount - totalDiscount,
  };

  state.selected = {
    items_count: selectedItemsCount,
    quantity: selectedQuantity,
    price_before_discount: selectedPriceBeforeDiscount,
    discount: selectedDiscount,
    price_after_discount: selectedPriceBeforeDiscount - selectedDiscount,
  };
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<LocalCartState>) => {
      if (!action.payload) {
        // Reset state to initial state
        state.cart = [];
        state.total = initialState.total;
        state.selected = initialState.selected;
        state.currency = initialState.currency;
      } else {
        // Update state with the payload
        state.cart = action.payload.cart;
        state.total = action.payload.total;
        state.selected = action.payload.selected;
        state.currency = action.payload.currency;
      }

      updateTotals(state);
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const token = getTokenFromCookies();
      const product = state.cart.find((item) => item.id === action.payload.id);
      if (product) {
        product.quantity += 1;
      } else {
        const newProduct = { ...action.payload, quantity: 1, selected: false };
        state.cart.push(newProduct);
      }
      updateTotals(state);

      if (!token) {
        saveToSessionStorage("cart", state);
      }
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      const token = getTokenFromCookies();
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload.id
      );
      updateTotals(state);

      if (!token) {
        saveToSessionStorage("cart", state);
      }
    },
    changeQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number; price: PriceType }>
    ) => {
      const token = getTokenFromCookies();
      const product = state.cart.find((item) => item.id === action.payload.id);
      console.log('action.payload.quantity', action.payload.quantity);
      
      if (product) {
        if (action.payload.quantity <= 0) {
          // Remove product if quantity is 0 or negative
          state.cart = state.cart.filter(
            (item) => item.id !== action.payload.id
          );
        } else {
          // Update quantity and price
          product.quantity = action.payload.quantity;
          product.price = action.payload.price;
        }
        
        updateTotals(state);

        if (!token) {
          saveToSessionStorage("cart", state);
        }
      }
    },
    selectItem: (state, action: PayloadAction<Product>) => {
      const token = getTokenFromCookies();

      const product = state.cart.find((item) => item.id === action.payload.id);
      if (product) {
        product.selected = true;
        updateTotals(state);
      }

      if (!token) {
        saveToSessionStorage("cart", state);
      }
    },
    unselectItem: (state, action: PayloadAction<Product>) => {
      const token = getTokenFromCookies();

      const product = state.cart.find((item) => item.id === action.payload.id);
      if (product) {
        product.selected = false;
        updateTotals(state);
      }

      if (!token) {
        saveToSessionStorage("cart", state);
      }
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  changeQuantity,
  selectItem,
  unselectItem,
} = cartSlice.actions;

export default cartSlice.reducer;
