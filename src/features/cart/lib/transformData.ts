import type {
  ServerCartState,
  LocalCartState,
} from '@/features/cart/model/types';

export const transformServerCartToLocalCart = (
  serverCart: ServerCartState
): LocalCartState => ({
  cart: serverCart.data,
  total: serverCart.total,
  selected: serverCart.selected,
  currency: serverCart.current_currency,
});
