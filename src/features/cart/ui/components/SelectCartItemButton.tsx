// src/helpers/SelectCartItemButton/SelectCartItemButton.jsx

import type React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  selectItem,
  unselectItem,
  transformServerCartToLocalCart,
  useGetUserCartQuery,
  useSendCartMutation,
} from '@/features/cart';
import { getTokenFromCookies } from '@/shared/lib';

import type { AppDispatch, RootState } from '@/app/providers/store';
import type { CartProduct, LocalCartState } from '@/features/cart';

interface SelectCartItemButtonProps {
  product: CartProduct;
  children: (props: {
    isLoading: boolean;
    isSelected: boolean;
    handleSelectClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  }) => React.ReactNode;
}

export const SelectCartItemButton: React.FC<SelectCartItemButtonProps> = ({
  product,
  children,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const token = getTokenFromCookies();

  const localCart: LocalCartState = useSelector(
    (state: RootState) => state.cart
  );

  // Fetching cart data from the server if the user is logged in
  const {
    data: serverCart,
    // isLoading,
    isSuccess,
    error,
  } = useGetUserCartQuery(undefined, { skip: !token });

  const cart: LocalCartState =
    token && isSuccess ? transformServerCartToLocalCart(serverCart) : localCart;

  const [sendCart, { isLoading }] = useSendCartMutation();

  const isSelected: boolean = cart?.cart?.some(
    (item) =>
      item.id === product.id &&
      (item.selected.toString() === '1' || item.selected === true)
  );

  const handleSelectClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSelected) {
      if (token) {
        sendCart({ id: product.id, quantity: product.quantity, selected: 0 });
      }
      dispatch(unselectItem(product));
    } else {
      if (token) {
        sendCart({ id: product.id, quantity: product.quantity, selected: 1 });
      }
      dispatch(selectItem(product));
    }
  };

  return children({ isLoading, isSelected, handleSelectClick });
};
