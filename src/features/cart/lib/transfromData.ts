import { ServerCartState } from "@customTypes/Store/Cart/CartState";
import { LocalCartState } from "@customTypes/Store/Cart/CartState";

export const transformServerCartToLocalCart = (serverCart: ServerCartState): LocalCartState => ({
  cart: serverCart.data,
  total: serverCart.total,
  selected: serverCart.selected,
  currency: serverCart.current_currency,
});