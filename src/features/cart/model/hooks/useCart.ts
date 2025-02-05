import { useSelector } from 'react-redux';

import { useAuth } from '@/entities/user';
import {
  useGetUserCartQuery,
  transformServerCartToLocalCart,
} from '@/features/cart';
import { getTokenFromCookies } from '@/entities/user';
import type { RootState } from '@/app/providers/store';
import type { LocalCartState } from '@/features/cart';

export const useCart = () => {
  const { isAuthenticated } = useAuth();
  const localCart = useSelector((state: RootState) => state.cart);

  const {
    data: serverCart,
    isLoading,
    isSuccess,
    error,
  } = useGetUserCartQuery(undefined, { skip: !isAuthenticated });

  const cart: LocalCartState =
    isAuthenticated && isSuccess
      ? transformServerCartToLocalCart(serverCart)
      : localCart;

  return {
    cart,
    isLoading,
    isError: !!error,
  };
};
