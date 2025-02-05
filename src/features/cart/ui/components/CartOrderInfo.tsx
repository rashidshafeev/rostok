import type React from 'react';
import { useRef } from 'react';

import plural from 'plural-ru';
import { NavLink } from 'react-router-dom';
import { useIntersection } from 'react-use';

import { getTokenFromCookies } from '@/entities/user';
import type { CartProduct } from '@/types/Store/Cart/CartProduct';
import type { LocalCartState } from '@/types/Store/Cart/CartState';

type CartOrderInfoProps = {
  cart: LocalCartState;
  selected: CartProduct[];
};

export const CartOrderInfo: React.FC<CartOrderInfoProps> = ({
  cart,
  selected,
}) => {

const hasValidPrice = (product: CartProduct): boolean => {
    const price = product?.price;
    
    // Check if price object exists
    if (!price) {
      return false;
    }
  
    // Check final price (primary check)
    if (typeof price.final !== 'number' || price.final <= 0) {
      return false;
    }
  
    return true;
  };
  
const hasInvalidPriceItems = (items: CartProduct[]): boolean => {
    return items?.some(item => !hasValidPrice(item));
  };
  
  const hasUnavailableItems = hasInvalidPriceItems(selected);


  const renderButton = () => {
    if (selected?.length === 0) {
      return (
        <button className="text-white cursor-auto font-semibold bg-colGray rounded w-full h-[50px] flex justify-center items-center">
          Перейти к оформлению
        </button>
      );
    }

    if (hasUnavailableItems) {
      return (
        <>
          <button className="text-white cursor-not-allowed font-semibold bg-colGray rounded w-full h-[50px] flex justify-center items-center">
            Перейти к оформлению
          </button>
          <div className="text-sm mt-2 text-center">
            Нельзя оформить заказ на товары с не указанной ценой
          </div>
        </>
      );
    }

    return (
      <NavLink
        to="/checkout"
        className="text-white font-semibold bg-colGreen rounded w-full h-[50px] flex justify-center items-center"
      >
        Перейти к оформлению
      </NavLink>
    );
  };



  return (
    <div className="border border-[#EBEBEB] rounded-[10px] p-5">
      {selected?.length === 0 ? (
        <div className="text-center text-[#828282] text-lg font-medium mb-5">
          Выберите товары, которые хотите заказать
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center pb-3">
            <span className="text-xl font-semibold text-colBlack">Итого</span>
            <span className="text-xl font-semibold text-colBlack">
              {cart?.selected?.items_count}{' '}
              {plural(cart?.selected?.items_count, 'товар', 'товара', 'товаров')}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-colBlack text-sm whitespace-nowrap">
              Количество
            </span>
            <span className="w-full border-b border-colGray border-dashed mt-2 mx-1"></span>
            <span className="font-bold whitespace-nowrap">
              {cart?.selected?.quantity} шт
            </span>
          </div>
          <br />
          <div className="flex justify-between items-center">
            <span className="text-colBlack text-sm">Сумма</span>
            <span className="w-full border-b border-colGray border-dashed mt-2 mx-1"></span>
            <span className="font-bold whitespace-nowrap">
              {cart?.selected?.price_before_discount} {cart.currency.symbol}
            </span>
          </div>
          {cart?.selected?.discount > 0 && (
            <div className="flex justify-between items-center pt-2">
              <span className="text-colBlack text-sm">Скидка</span>
              <span className="w-full border-b border-colGray border-dashed mt-2 mx-1"></span>
              <span className="font-bold whitespace-nowrap">
                -{cart?.selected?.discount} {cart?.currency?.symbol}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center pt-3 pb-5">
            <span className="text-lg font-semibold text-colBlack">Итого</span>
            <span className="text-lg font-semibold text-colBlack">
              {cart?.selected?.price_after_discount} {cart.currency.symbol}
            </span>
          </div>
        </>
      )}

      {renderButton()}
    </div>
  );
};
