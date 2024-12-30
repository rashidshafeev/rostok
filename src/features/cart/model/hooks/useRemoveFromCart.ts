import { useDispatch } from 'react-redux';

import { useSendCartMutation } from '@/features/cart';
import { useModal } from '@/features/modals/model/context';
import { getTokenFromCookies } from '@/shared/lib';

import { removeFromCart } from '../';

import type { Product } from '@/entities/product';

interface UseRemoveFromCartOptions {
  withConfirmation?: boolean;
}

export const useRemoveFromCart = (
  product: Product,
  options: UseRemoveFromCartOptions = {}
) => {
  const { withConfirmation = false } = options;
  const { showModal } = useModal();
  const token = getTokenFromCookies();
  const dispatch = useDispatch();

  const [sendCart, { isLoading }] = useSendCartMutation();

  const remove = async () => {
    if (token) {
      await sendCart({ id: product.id, quantity: 0, selected: 0 });
    }
    dispatch(removeFromCart(product));
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();

    if (withConfirmation) {
      showModal({
        type: 'confirmation',
        title: 'Удаление',
        text: 'Удалить товар из корзины?',
        action: () => remove(),
        product,
      });
      return;
    }

    remove();
  };

  return {
    handleRemove,
    isLoading,
  };
};
