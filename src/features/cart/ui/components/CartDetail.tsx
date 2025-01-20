import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useWindowSize } from 'react-use';
import { toast } from 'sonner';

import {
  removeFromCart,
  selectItem,
  unselectItem,
  useSendCartMutation,
  SendCartRequest,
} from '@/features/cart';
import { useModal } from '@/features/modals/model/context';
import docIcon from '@/shared/assets/icons/download-pdf.svg';
import shareIcon from '@/shared/assets/icons/share.svg';
import { getTokenFromCookies } from '@/shared/lib';
import { CCheckBoxField } from '@/shared/ui';
import {
  ProductCardLineSkeleton,
  ProductCardLineSmallSkeleton,
} from '@/widgets/product-card';

import { CartItem } from './CartItem';
import { CartItemLine } from './CartItemLine';
import { MobileCartItem } from './MobileCartItem';

import type { AppDispatch } from '@/app/providers/store';
import type {
  SendCartPayload,
  CartProduct,
  LocalCartState,
} from '@/features/cart';

type CartDetail = {
  cart: LocalCartState;
  isLoading: boolean;
  filteredCart: CartProduct[];
  selected: CartProduct[];
};

export const CartDetail: React.FC<CartDetail> = ({
  cart,
  isLoading,
  filteredCart,
  selected,
}) => {
  const token = getTokenFromCookies();

  const [sendCart, { isLoading: sendCartIsLoading }] = useSendCartMutation();

  const [itemType, setItemType] = useState('lineBig');

  const { width, height } = useWindowSize();

  const dispatch: AppDispatch = useDispatch();

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;

    if (!isChecked) {
      const payload: SendCartPayload[] = selected.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        selected: false,
      }));

      token
        ? sendCart({ items: payload })
        : selected.forEach((item) => dispatch(unselectItem(item)));
    } else {
      const unselectedItems = cart?.cart?.filter((item) => !item.selected);

      const payload: SendCartPayload[] = unselectedItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        selected: true,
      }));

      token
        ? sendCart({ items: payload })
        : unselectedItems.forEach((item) => dispatch(selectItem(item)));
    }
  };

  const handleRemoveSelected = () => {
    const payload = selected.map((item) => ({
      id: item.id,
      quantity: 0,
      selected: 0,
    }));

    if (token) {
      sendCart({ items: payload });
    }
    selected.forEach((item) => dispatch(removeFromCart(item)));
  };

  const [containerHeight, setContainerHeight] = useState('auto');
  const containerRef = useRef(null);
  const previousCartLengthRef = useRef(cart?.cart?.length || 0);

  useEffect(() => {
    if (containerRef.current) {
      const itemHeight = 138; // Height of each item
      const heightChange =
        (cart?.cart?.length - previousCartLengthRef.current) * itemHeight;
      const newHeight = containerRef.current.scrollHeight + heightChange;
      setContainerHeight(`${newHeight}px`);
      window.scroll({
        top:
          window.scrollY +
          (cart?.cart?.length - previousCartLengthRef.current) * itemHeight,
        behavior: 'smooth',
      });
      previousCartLengthRef.current = cart?.cart?.length; // Update the previous cart length
    }
  }, [cart]);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight('auto');
    }
  }, []);

  const { showModal } = useModal();
  return (
    <>
      <div className="flex justify-between items-center pb-2">
        <div className="flex items-center">
          <div className="pb-[3px]">
            <CCheckBoxField
              label="Выбрать всё"
              onChange={handleSelectAllChange}
              checked={
                cart?.cart?.length > 0
                  ? cart?.cart?.length === selected?.length
                  : null
              }
              styles="text-colBlack font-medium text-sm"
            />
          </div>
          {selected?.length !== 0 ? (
            <button
              onClick={handleRemoveSelected}
              className="text-colDarkGray font-medium text-sm ml-4"
            >
              Удалить выбранные
            </button>
          ) : null}
        </div>
        <div className="block lg:hidden">
          <img
            className="w-6 h-6"
            src={shareIcon}
            alt=""
            onClick={() => {
              if (selected.length === 0) {
                toast('Выберите товары, которыми хотите поделиться');
                return;
              }
              showModal({ type: 'shareCart', showLink: true });
            }}
          />
        </div>
        <div className="hidden lg:flex justify-end items-center space-x-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="cursor-pointer"
            onClick={() => setItemType('lineBig')}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.33301 2.6665C1.78072 2.6665 1.33301 3.11422 1.33301 3.6665V5.6665C1.33301 6.21879 1.78072 6.6665 2.33301 6.6665H4.33301C4.88529 6.6665 5.33301 6.21879 5.33301 5.6665V3.6665C5.33301 3.11422 4.88529 2.6665 4.33301 2.6665H2.33301ZM2.33301 7.99984C1.78072 7.99984 1.33301 8.44755 1.33301 8.99984V10.9998C1.33301 11.5521 1.78072 11.9998 2.33301 11.9998H4.33301C4.88529 11.9998 5.33301 11.5521 5.33301 10.9998V8.99984C5.33301 8.44755 4.88529 7.99984 4.33301 7.99984H2.33301ZM1.33301 14.3332C1.33301 13.7809 1.78072 13.3332 2.33301 13.3332H4.33301C4.88529 13.3332 5.33301 13.7809 5.33301 14.3332V16.3332C5.33301 16.8855 4.88529 17.3332 4.33301 17.3332H2.33301C1.78072 17.3332 1.33301 16.8855 1.33301 16.3332V14.3332ZM9 2.6665C8.44772 2.6665 8 3.11422 8 3.6665V5.6665C8 6.21879 8.44772 6.6665 9 6.6665H17.6667C18.219 6.6665 18.6667 6.21879 18.6667 5.6665V3.6665C18.6667 3.11422 18.219 2.6665 17.6667 2.6665H9ZM8 9C8 8.44772 8.44772 8 9 8H17.6667C18.219 8 18.6667 8.44772 18.6667 9V11C18.6667 11.5523 18.219 12 17.6667 12H9C8.44772 12 8 11.5523 8 11V9ZM9 13.333C8.44772 13.333 8 13.7807 8 14.333V16.333C8 16.8853 8.44772 17.333 9 17.333H17.6667C18.219 17.333 18.6667 16.8853 18.6667 16.333V14.333C18.6667 13.7807 18.219 13.333 17.6667 13.333H9Z"
              fill={`${itemType === 'lineSmall' ? '#B5B5B5' : '#15765B'}`}
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="cursor-pointer"
            onClick={() => setItemType('lineSmall')}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.33301 3.6665C1.33301 3.11422 1.78072 2.6665 2.33301 2.6665H17.6663C18.2186 2.6665 18.6663 3.11422 18.6663 3.6665V5.6665C18.6663 6.21879 18.2186 6.6665 17.6663 6.6665H2.33301C1.78072 6.6665 1.33301 6.21879 1.33301 5.6665V3.6665ZM1.33301 8.99984C1.33301 8.44755 1.78072 7.99984 2.33301 7.99984H17.6663C18.2186 7.99984 18.6663 8.44755 18.6663 8.99984V10.9998C18.6663 11.5521 18.2186 11.9998 17.6663 11.9998H2.33301C1.78072 11.9998 1.33301 11.5521 1.33301 10.9998V8.99984ZM2.33301 13.3332C1.78072 13.3332 1.33301 13.7809 1.33301 14.3332V16.3332C1.33301 16.8855 1.78072 17.3332 2.33301 17.3332H17.6663C18.2186 17.3332 18.6663 16.8855 18.6663 16.3332V14.3332C18.6663 13.7809 18.2186 13.3332 17.6663 13.3332H2.33301Z"
              fill={`${itemType === 'lineBig' ? '#B5B5B5' : '#15765B'}`}
            />
          </svg>
        </div>
      </div>
      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardLineSkeleton key={index} />
          ))}
        </div>
      ) : null}
      {/* <div  className='transition-all duration-700'> */}
      <div
        ref={containerRef}
        style={{ height: containerHeight }}
        className="transition-all duration-700"
      >
        {itemType === 'lineBig' && width > 991 && !isLoading ? (
          <CartItem cart={filteredCart} selectedItems={selected} />
        ) : itemType === 'lineSmall' && width > 991 && !isLoading ? (
          <CartItemLine cart={filteredCart} selectedItems={selected} />
        ) : (
          <MobileCartItem cart={filteredCart} selectedItems={selected} />
        )}
      </div>
    </>
  );
};
