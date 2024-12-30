import { useSelector } from 'react-redux';

import {
  useGetUserCartQuery,
  transformServerCartToLocalCart,
} from '@/features/cart';
import { getTokenFromCookies } from '@/shared/lib';

import type { RootState } from '@/app/providers/store';
import type { LocalCartState } from '@/features/cart';

export const useCart = () => {
  const token = getTokenFromCookies();
  const localCart = useSelector((state: RootState) => state.cart);

  const {
    data: serverCart,
    isLoading,
    isSuccess,
    error,
  } = useGetUserCartQuery(undefined, { skip: !token });

  const cart: LocalCartState =
    token && isSuccess ? transformServerCartToLocalCart(serverCart) : localCart;

  return {
    cart,
    isLoading,
    isError: !!error,
  };
};
