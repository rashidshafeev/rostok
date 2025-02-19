import type React from 'react';
import { useState } from 'react';

import { AddOutlined, RemoveOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {
  addToCart,
  changeQuantity,
  transformServerCartToLocalCart,
  AddToCartButton,
  QuantityControl,
  useGetUserCartQuery,
} from '@/features/cart';
import { useModal } from '@/features/modals';
import boxicon from '@/shared/assets/icons/box-icon.svg';
import checkicon from '@/shared/assets/icons/check-icon.svg';
import stallicon from '@/shared/assets/icons/stall-icon.svg';
import truckicon from '@/shared/assets/icons/truck-icon.svg';
import { getTokenFromCookies } from '@/entities/user';import { Button } from '@/shared/ui';
import { LoadingSmall } from '@/shared/ui/Loader';
import { PriceDisplay } from '@/widgets/product-card';

import { DeliveryInfo } from './DeliveryInfo';

import type { RootState } from '@/app/providers/store';
import type { Product } from '@/entities/product';
import type { LocalCartState } from '@/features/cart';

type RightBarProps = {
  product: Product;
};

const RightBar: React.FC<RightBarProps> = ({ product }) => {
  const { showModal } = useModal();

  const token = getTokenFromCookies();

  const localCart: LocalCartState = useSelector(
    (state: RootState) => state.cart
  );

  // Fetching cart data from the server if the user is logged in
  const {
    data: serverCart,
    isLoading,
    isSuccess,
    error,
  } = useGetUserCartQuery(undefined, { skip: !token });

  const cart: LocalCartState =
    token && isSuccess ? transformServerCartToLocalCart(serverCart) : localCart;

  const productInCart = cart.cart?.find((el) => el.id === product?.id);

  return (
    <>
      <div className="shadow-[1px_1px_34px_0_rgba(0,0,0,0.1)] p-5 rounded-xl flex flex-col gap-8 mb-5">
        <div className="flex gap-2 justify-between grow">
          <div>
            <p className="text-xl font-bold whitespace-nowrap break-words">
              {productInCart?.price?.total
                ? `${productInCart?.price?.total} ${productInCart?.price?.currency?.symbol}`
                : null}
            </p>
          </div>
          {/* {product?.price?.base && !productInCart ? (
            <PriceDisplay price={product?.price} />
          ) : null} */}
          {!productInCart ? (
            <PriceDisplay price={product?.price} />
          ) : null}
          {productInCart?.price?.base ? (
            <PriceDisplay price={productInCart?.price} />
          ) : null}
        </div>
        {!productInCart ? (
          <div className="flex flex-col gap-3">
            <AddToCartButton product={product} size="lg" />
          
            <Button
              onClick={() => showModal({ type: 'fastOrder', product })}
              variant="outline"
              size="lg"
              fullWidth
              disabled={product?.availability?.stock === 0}
            >
              Купить в 1 клик
            </Button>
          </div>
        ) : null}

        {productInCart ? (
          <div className="flex flex-col gap-3">
            <div className="h-[48px] flex  justify-between items-center grow">
              <QuantityControl product={productInCart} enableRemove={true} />
            </div>
            <NavLink to="/shopping-cart">
              <button className="py-3 flex justify-center text-colGreen font-semibold bg-white border-colGreen border w-full rounded cursor-pointer">
                Перейти в корзину
              </button>
            </NavLink>
          </div>
        ) : null}

        {/* <div className="flex justify-center text-colGreen font-semibold underline underline-offset-8 cursor-pointer">
          Узнать цену для юрлиц
        </div> */}
      </div>
      <DeliveryInfo product={product} />
    </>
  );
};

export default RightBar;
