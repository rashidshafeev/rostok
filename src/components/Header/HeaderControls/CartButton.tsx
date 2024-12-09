import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import cartIcon from '@assets/icons/cart.svg';
import noImg from '@assets/images/no-image.png';

import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useHover,
    useFocus,
    useDismiss,
    useRole,
    useInteractions,
    FloatingPortal,
    safePolygon
  } from "@floating-ui/react";
import { getTokenFromCookies } from '@helpers/cookies/cookies';
import ChangeQuantityGroup from '@helpers/ChangeQuantityButton/ChangeQuantityGroup';
import { LocalCartState } from '@customTypes/Store/Cart/CartState';
import { useGetUserCartQuery } from '@api/cartEndpoints';
import { transformServerCartToLocalCart } from '@utils/transfromData';
import { RootState } from '@store/store';
import PriceDisplay from '@/components/ProductCard/PriceDisplay';

type CartButtonProps = {
    getCartQuantity: () => number;
}

const CartButton : React.FC<CartButtonProps> = ({ getCartQuantity }) => {

  const [isOpen, setIsOpen] = useState(false);
  const token = getTokenFromCookies();

  const localCart : LocalCartState = useSelector((state: RootState) => state.cart);

  // Fetching cart data from the server if the user is logged in
  const {
    data: serverCart,
    isLoading,
    isSuccess,
    error,
  } = useGetUserCartQuery(undefined, { skip: !token });

  const cart : LocalCartState = token && isSuccess ? transformServerCartToLocalCart(serverCart) : localCart;

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    // Make sure the tooltip stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: "start"
      }),
      shift()
    ]
  });

  const hover = useHover(context, {
    move: true,
    delay: 500,
    handleClose: safePolygon(),
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  // Role props for screen readers
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role
  ]);



  return (
    <>
    <NavLink
    ref={refs.setReference} {...getReferenceProps()}

        to='/shopping-cart'
        className='relative text-center flex flex-col justify-between items-center'
      
      >
        <img className='mx-auto' src={cartIcon} alt='*' />
        <span className='text-xs pt-1 font-medium text-colBlack'>Корзина</span>
        {getCartQuantity() > 0 && (
          <span className='absolute -top-2 right-0 bg-colGreen h-5 pb-[2px] min-w-[20px] flex justify-center items-center text-xs text-white rounded-full px-1'>
            {getCartQuantity() > 99 ? '99+' : getCartQuantity()}
          </span>
        )}
      </NavLink>
      <FloatingPortal>
      

      {isOpen && cart?.cart?.length > 0 && (
        <div

          ref={refs.setFloating}
          {...getFloatingProps()}
          style={{  ...floatingStyles }}
          className=' max-w-[100vw] flex flex-col gap-2 max-h-[500px] border bg-white p-5  border-colLightGray rounded-[10px] z-50  proportional-nums lining-nums'
        
        >
<div className=' font-semibold'>Товары в корзине</div>
<div className='flex flex-col gap-2 overflow-y-auto scrollable'>


            {cart && cart?.cart?.map((product) => {
                   return(
                    <div className='flex flex-1'>
                    <NavLink
                to={`/catalog/'${product.category.slug}'/${product.slug}`}
                className='cursor-pointer flex-1 overflow-hidden bg-gray-100 rounded-md'>
            <div className='flex p-2 flex-1'>
            <img
                  className='min-w-[56px] w-14 h-14  object-contain mr-2'
                  src={product?.files[0]?.large || noImg}
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src = noImg;
                  }}
                  alt='*'
                />
                <div className='flex flex-col gap-2  grow'>
                <div className=' font-semibold text-sm'> {product?.fullName}</div>
                <div className="p-2">
                    <PriceDisplay price={product?.price} />
              </div>
              <div className='flex items-center justify-between'>
                <div className='basis-1/4'>
                <ChangeQuantityGroup product={product} enableRemove={true} />

                </div>
                <div>{product?.price?.total_price
                    ? product?.price?.total_price
                    : "Цена не указана"}
                    <span className="pl-1">
                  {product?.price?.base && product?.price?.currency ? product?.price?.currency?.symbol : ''}
                </span>
                    </div>
              </div>
              
                </div>
                
            </div>
                
              </NavLink>


              </div>)
                })
            }
        </div>
        <div></div>
        <div className='flex justify-between'>
          <span className='font-semibold'>Итого:</span>
          <span className='font-semibold'>{cart?.total?.amount} {cart?.currency?.symbol}</span>
        </div>
        <NavLink to='/shopping-cart' className='flex items-center justify-center bg-colGreen p-3 rounded-sm'>
        <span className=' font-semibold text-white'>В корзину</span>
        
        </NavLink>
        </div>
      )}

    </FloatingPortal>
    </>
  )
}

export default CartButton