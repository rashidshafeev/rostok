import { Currency } from "@/types/Product/Currency";
import { CartProduct } from "./CartProduct";

type CartTotals = {
    items_count: number;
    quantity: number;
    price_before_discount: number;
    discount: number;
    price_after_discount: number;
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