import { useDispatch, useSelector } from 'react-redux';
import { useSendCartMutation } from '@/features/cart';
import { getTokenFromCookies } from '@/shared/lib';
import type { AppDispatch, RootState } from '@/app/providers/store';
import type { CartProduct, SendCartPayload } from '@/features/cart';
import { selectItem, unselectItem, removeFromCart } from '@/features/cart';

export const useCartSelection = () => {
  const token = getTokenFromCookies();
  const dispatch: AppDispatch = useDispatch();
  const [sendCart] = useSendCartMutation();

  const cart = useSelector((state: RootState) => state.cart);
  const selectedItems = cart?.cart?.filter(
    (item) => item.selected === true || item.selected.toString() === '1'
  );

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
    selectedItems,
    handleSelectionChange,
    handleRemoveItems,
  };
};