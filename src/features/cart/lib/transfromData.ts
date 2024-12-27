import type {
  ServerCartState,
  LocalCartState,
} from '@/types/Store/Cart/CartState';

export const transformServerCartToLocalCart = (
  serverCart: ServerCartState
): LocalCartState => ({
  cart: serverCart.data,
  total: serverCart.total,
  selected: serverCart.selected,
  currency: serverCart.current_currency,
});
