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
    count: 0,
    amount: 0,
    quantity: 0,
    discount: 0,
  },
  selected: {
    count: 0,
    amount: 0,
    quantity: 0,
    discount: 0,
  },
  currency: {
    code: "RUB",
    title: "Рубль",
    symbol: "₽",
  },
};

const updateTotals = (state: LocalCartState) => {
  let totalCount = 0;
  let totalAmount = 0;
  let totalQuantity = 0;
  let totalDiscount = 0;
  let selectedCount = 0;
  let selectedAmount = 0;
  let selectedQuantity = 0;
  let selectedDiscount = 0;

  state.cart.forEach((product) => {
    const quantity = Number(product.quantity);
    const finalPrice = product.price.final * quantity;
    const discount = product.price.discount
      ? product.price.discount.discount_amount * quantity
      : 0;

    totalCount += 1;
    totalAmount += finalPrice;
    totalQuantity += quantity;
    totalDiscount += discount;

    if (product.selected) {
      selectedCount += 1;
      selectedAmount += finalPrice;
      selectedQuantity += quantity;
      selectedDiscount += discount;
    }
  });

  state.total = {
    count: totalCount,
    amount: totalAmount,
    quantity: totalQuantity,
    discount: totalDiscount,
  };

  state.selected = {
    count: selectedCount,
    amount: selectedAmount,
    quantity: selectedQuantity,
    discount: selectedDiscount,
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
      // if (product.quantity + action.payload.quantity <= 0) {
      //   state.cart = state.cart.filter(
      //     (product) => product.id !== action.payload.id
      //   );
      // } else {
      //   product.quantity = action.payload.quantity;
      //   product.price = action.payload.price;
      // }

      product.quantity = action.payload.quantity;
      product.price = action.payload.price;

      updateTotals(state);

      if (!token) {
        saveToSessionStorage("cart", state);
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
