import React from 'react';

import { AddOutlined, RemoveOutlined } from '@mui/icons-material';
import { addToCart, changeQuantity } from '@store/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import PriceDisplay from '@/components/ProductCard/PriceDisplay';
import AddToCartButton from '@/helpers/AddToCartButton/AddToCartButton';
import ChangeQuantityGroup from '@/helpers/ChangeQuantityButton/ChangeQuantityGroup';
import { LoadingSmall } from '@/shared/ui/Loader';

function MobileAddToCartBar({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state?.cart);
  const productInCart = cart?.cart?.find((el) => el?.id === product?.id);

  return (
    <div className="lg:hidden z-10 fixed bottom-[72px] w-full bg-white lining-nums proportional-nums">
      <div className="flex justify-between gap-2 px-5 py-3">
        {productInCart ? (
          <div className="flex  gap-2 justify-between w-full">
            <ChangeQuantityGroup product={productInCart} enableRemove={true} />
            <button
              className="py-3 flex justify-center text-colGreen font-semibold bg-white border-colGreen border rounded cursor-pointer basis-2/3"
              onClick={(e) => {
                e.preventDefault();
                navigate('/shopping-cart');
              }}
            >
              Перейти в корзину
            </button>
          </div>
        ) : null}

        {!productInCart ? (
          <div className="flex gap-3 w-full">
            <div className="flex flex-col items-start basis-1/3">
              <div className="flex gap-2 justify-between grow">
                <div>
                  <p className="text-xl font-bold whitespace-nowrap break-words">
                    {productInCart?.price?.base
                      ? `${productInCart?.price?.total} ${productInCart?.price?.currency?.symbol}`
                      : null}
                  </p>
                </div>
                {product?.price?.base && !productInCart ? (
                  <PriceDisplay price={product?.price} />
                ) : null}
                {productInCart?.price?.base ? (
                  <PriceDisplay price={productInCart?.price} />
                ) : null}
              </div>
            </div>
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
                  className={`transition-all flex justify-center items-center min-h-10 xs:text-sm sm:text-base duration-200 ${
                    disabled ? 'bg-colGray' : 'bg-colGreen cursor-pointer'
                  } text-white rounded-md p-2 font-semibold w-full ${
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
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default MobileAddToCartBar;
