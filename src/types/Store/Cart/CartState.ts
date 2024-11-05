import { Product } from "@customTypes/Product/Product";
import { Currency } from "@customTypes/Product/Currency";

export interface CartProduct extends Product {
    quantity: number;
    selected: boolean;
}

type CartTotals = {
    count: number;
    amount: number;
    quantity: number;
    discount: number;
  };

export interface LocalCartState  {
    cart: CartProduct[];
    total: CartTotals;
    selected: CartTotals;
    currency: Currency;
  };

export interface ServerCartState {
  data: CartProduct[];
    total: CartTotals;
    selected: CartTotals;
    current_currency: Currency;
}