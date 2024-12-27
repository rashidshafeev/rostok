// src/components/ProductCard.js
import type React from 'react';

import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { transformServerCartToLocalCart } from '@/features/cart/lib';
import { getTokenFromCookies } from '@/shared/lib';
import { LoadingSmall } from '@/shared/ui/Loader';
import AddToCartButton from '@helpers/AddToCartButton/AddToCartButton';
import ChangeQuantityGroup from '@helpers/ChangeQuantityButton/ChangeQuantityGroup';

import PreviewGallery from './PreviewGallery';
import PriceDisplay from './PriceDisplay';

import type { Product } from '@/entities/product/Product';
import type { RootState } from '@/app/providers/store';
import type { LocalCartState } from '@/types/Store/Cart/CartState';

import { useGetUserCartQuery } from '@/features/cart/api/cartApi';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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

  const productInCart = cart?.cart?.find((el) => el.id === product.id);

  return (
    <NavLink
      to={
        product.slug ? `/catalog/${product.category.slug}/${product.slug}` : ''
      }
      className={`${
        false && 'opacity-50 cursor-not-allowed'
      } overflow-hidden group duration-500 flex flex-col justify-between items-stretch `}
    >
      <div>
        <PreviewGallery product={product} />
      </div>
      <div className="lining-nums proportional-nums mt-2 flex h-[160px] mm:h-[140px] flex-col gap-1">
        <div className="flex flex-col justify-between gap-1 h-full mb-1">
          {/* <p className="text-xs text-colDarkGray line-clamp-2">
            Код товара: {product.sku}
          </p> */}
          <p className="text-sm text-colText font-medium line-clamp-2">
            {product.fullName}
          </p>
          {productInCart ? (
            <PriceDisplay price={productInCart?.price} />
          ) : (
            <PriceDisplay price={product?.price} />
          )}
        </div>

        {!productInCart ? (
          <AddToCartButton product={product}>
            {({
              handleAddToCartClick,
              isLoading,
              isSuccess,
              buttonText,
              disabled,
            }) => (
              <button
                disabled={disabled || isLoading}
                onClick={handleAddToCartClick}
                className={` transition-all flex justify-center items-center min-h-10 xs:text-sm sm:text-base duration-200 ${
                  disabled ? 'bg-colGray ' : 'bg-colGreen cursor-pointer'
                }  text-white rounded-md p-2 font-semibold w-full ${
                  isLoading && !disabled ? 'cursor-wait' : ''
                } lining-nums proportional-nums`}
              >
                {isLoading && !isSuccess ? (
                  <LoadingSmall extraStyle="white" />
                ) : (
                  buttonText
                )}
              </button>
            )}
          </AddToCartButton>
        ) : null}
        {productInCart ? (
          <div className="flex justify-between gap-2">
            <ChangeQuantityGroup product={productInCart} enableRemove={true} />
          </div>
        ) : null}
      </div>
    </NavLink>
  );
};

export default ProductCard;
