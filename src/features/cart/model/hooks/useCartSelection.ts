import { useDispatch } from 'react-redux';
import { useSendCartMutation } from '@/features/cart';
import { getTokenFromCookies } from '@/shared/lib';
import type { AppDispatch } from '@/app/providers/store';
import type { CartProduct, SendCartPayload } from '@/features/cart';

export const useCartSelection = () => {
  const token = getTokenFromCookies();
  const dispatch: AppDispatch = useDispatch();
  const [sendCart] = useSendCartMutation();

  const handleSelectionChange = async (
    items: CartProduct[],
    selected: boolean
  ) => {
    const payload: SendCartPayload[] = items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      selected,
    }));

    if (token) {
      await sendCart({ items: payload });
    } else {
      items.forEach((item) =>
        dispatch(selected ? selectItem(item) : unselectItem(item))
      );
    }
  };

  const handleRemoveItems = async (items: CartProduct[]) => {
    const payload = items.map((item) => ({
      id: item.id,
      quantity: 0,
      selected: 0,
    }));

    if (token) {
      await sendCart({ items: payload });
    }
    items.forEach((item) => dispatch(removeFromCart(item)));
  };

  return {
    handleSelectionChange,
    handleRemoveItems,
  };
};