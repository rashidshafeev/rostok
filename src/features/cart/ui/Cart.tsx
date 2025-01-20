import React, { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useIntersection } from 'react-use';
import { toast } from 'sonner';

import {
  CartDetail,
  CartOrderInfo,
  MobileToCheckoutBar,
  transformServerCartToLocalCart,
} from '@/features/cart';
import { useGetUserCartQuery } from '@/features/cart/api/cartApi';
import { useModal } from '@/features/modals/model/context';
import { RecentlyVisitedSection } from '@/features/recent-items';
import ErrorEmpty from '@/helpers/Errors/ErrorEmpty';
import docIcon from '@/shared/assets/icons/download-pdf.svg';
import shareIcon from '@/shared/assets/icons/share.svg';
import { getTokenFromCookies } from '@/shared/lib';
import { scrollToTop } from '@/shared/lib/scrollToTop';
import { CSearchField } from '@/shared/ui/inputs/CSearchField';
import { Breadcrumbs } from '@/widgets/breadcrumbs';

import type { RootState } from '@/app/providers/store';
import type { LocalCartState, CartProduct } from '@/features/cart';

export const Cart = (): JSX.Element => {
  const token = getTokenFromCookies();

  const localCart: LocalCartState = useSelector(
    (state: RootState) => state.cart
  );
  const {
    data: serverCart,
    isLoading,
    isSuccess,
    error,
  } = useGetUserCartQuery(undefined, { skip: !token });

  const cart: LocalCartState =
    token && isSuccess ? transformServerCartToLocalCart(serverCart) : localCart;

  const selected: CartProduct[] = cart?.cart?.filter(
    (item) => item.selected === true || item.selected.toString() === '1'
  );

  useEffect(() => {
    scrollToTop();
  }, []);

  const [filteredCart, setFilteredCart] = useState<CartProduct[]>([]);

  const handleFilter = (event) => {
    const filterValue = event.target.value;

    const filteredCart = cart?.cart?.filter(
      (product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        product.groupName.toLowerCase().includes(filterValue.toLowerCase()) ||
        product.sku.toString().includes(filterValue)
    );

    setFilteredCart(filteredCart);
  };

  useEffect(() => {
    setFilteredCart(cart?.cart);
  }, [cart]);

  const orderInfo = useRef(null);
  const orderInfoVisible = useIntersection(orderInfo, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });
  const { showModal } = useModal();

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cartCode = params.get('cart');

    if (cartCode) {
      showModal({ type: 'showSharedCart', code: cartCode });
    }
  }, [location.search]);

  return (
    <div className="content pb-6 lining-nums proportional-nums">
      <Breadcrumbs />
      <h1 className="block text-2xl md:text-[40px] font-semibold text-colBlack">
        Корзина
      </h1>
      {cart?.cart?.length > 0 ? (
        <>
          <div className="hidden lg:flex justify-between items-end">
            <div className="flex max-w-[460px] w-full pt-3">
              <CSearchField
                label="Введите наименование или код товара"
                name="search"
                type="search"
                handleChange={handleFilter}
              />
            </div>
            <div className="flex justify-end items-center space-x-4 ">
              <div
                className="flex cursor-pointer"
                onClick={() => {
                  if (selected.length === 0) {
                    toast('Выберите товары, которыми хотите поделиться');
                    return;
                  }
                  showModal({ type: 'shareCart', showLink: true });
                }}
              >
                <img src={shareIcon} alt="*" />
                <span className="text-xs font-medium text-colBlack pl-2">
                  Поделиться
                </span>
              </div>
              <div className="flex cursor-pointer">
                <img src={docIcon} alt="*" />
                <span className="text-xs font-medium text-colBlack pl-2">
                  Скачать PDF заказа
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-10 py-5">
            <div className="lg:basis-[calc(70%-20px)] basis-full">
              <CartDetail
                cart={cart}
                isLoading={isLoading}
                filteredCart={filteredCart}
                selected={selected}
              />
            </div>

            <div
              ref={orderInfo}
              className="lg:basis-[calc(30%-20px)] basis-full"
            >
              <CartOrderInfo cart={cart} selected={selected} />
            </div>
          </div>

          {orderInfoVisible && orderInfoVisible.intersectionRatio < 1 ? (
            <MobileToCheckoutBar
              selected={selected}
              quantity={cart?.selected?.quantity}
            />
          ) : null}
        </>
      ) : null}
      {cart?.cart?.length === 0 ? (
        <ErrorEmpty
          title="Корзина пуста!"
          desc="Воспользуйтесь поиском, чтобы найти всё, что нужно."
          height="230px"
          hideBtn={true}
        />
      ) : null}
      <RecentlyVisitedSection />
    </div>
  );
};
