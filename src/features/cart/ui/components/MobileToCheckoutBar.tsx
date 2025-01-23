import React from 'react';

import plural from 'plural-ru';
import { NavLink } from 'react-router-dom';

import type { CartProduct, LocalCartState } from '@/features/cart';

export type MobileToCheckoutBarProps = {
  cart: LocalCartState;
  selected: CartProduct[];
};

export const MobileToCheckoutBar = ({
  cart,
  selected,
}: MobileToCheckoutBarProps) => {
  const hasZeroPriceItems =
    selected.filter((item) => item.price.base === null || item.price.base === 0)
      .length > 0;
  return (
    <div className="lg:hidden z-10 fixed bottom-[72px] left-0 w-[100vw] bg-white">
      <div className="flex justify-between px-5 py-3">
        <div className="flex flex-col gap-2 justify-between w-full">
          <div className="flex justify-between items-center">
            {selected?.length === 0 ? (
              <div className="text-center text-[#828282] text-lg font-medium">
                Выберите товары, которые хотите заказать
              </div>
            ) : (
              <>
                <span className="text-xl font-semibold text-colBlack">
                  {cart?.selected?.price_before_discount} {cart.currency.symbol}
                </span>
                <span className="text-xl font-semibold text-colBlack">
                  {cart?.selected?.items_count}{' '}
                  {plural(
                    cart?.selected?.items_count,
                    'товар',
                    'товара',
                    'товаров'
                  )}
                </span>
              </>
            )}
          </div>
          {selected?.length === 0 ? (
            <button className="text-white cursor-auto font-semibold bg-colGray rounded w-full h-[50px] flex justify-center items-center">
              Перейти к оформлению
            </button>
          ) : null}
          {selected?.length !== 0 && hasZeroPriceItems ? (
            <>
              <button className="text-white cursor-not-allowed font-semibold bg-colGray rounded w-full h-[50px] flex justify-center items-center">
                Перейти к оформлению
              </button>
              <div className="text-sm mt-2 text-center">
                Нельзя оформить заказ на товары с не указанной ценой
              </div>
            </>
          ) : null}
          {selected?.length !== 0 && !hasZeroPriceItems ? (
            <NavLink
              to="/checkout"
              className="text-white font-semibold bg-colGreen rounded w-full h-[50px] flex justify-center items-center"
            >
              Перейти к оформлению
            </NavLink>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MobileToCheckoutBar;
