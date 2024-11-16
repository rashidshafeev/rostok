import { Currency } from "@customTypes/Product/Currency";
import { CartProduct } from "./CartProduct";

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