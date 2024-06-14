import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import cartIcon from '../../../assets/icons/cart.svg';

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
    FloatingPortal
  } from "@floating-ui/react";

function CartButton() {

    const [hoverTimeout, setHoverTimeout] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const  { cart } = useSelector((state)  => state?.cart);

  const itemsQuantity = useSelector((state) => state?.cart?.itemsQuantity);

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

//   const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  // Role props for screen readers
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    // hover,
    focus,
    dismiss,
    role
  ]);

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout);
    setHoverTimeout(setTimeout(() => setIsOpen(true), 500));
};

const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    setHoverTimeout(setTimeout(() => setIsOpen(false), 500));
};



  return (
    <>
    <NavLink
    ref={refs.setReference} {...getReferenceProps()}

        to='/shopping-cart'
        className='relative text-center flex flex-col justify-between items-center'
        onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
      >
        <img className='mx-auto' src={cartIcon} alt='*' />
        <span className='text-xs pt-1 font-medium text-colBlack'>Корзина</span>
        {itemsQuantity > 0 && (
          <span className='absolute -top-2 right-0 bg-colGreen h-5 pb-[2px] min-w-[20px] flex justify-center items-center text-xs text-white rounded-full px-1'>
            {!itemsQuantity > 99 ? '99+' : itemsQuantity}
          </span>
        )}
      </NavLink>
      <FloatingPortal>
      

      {isOpen && (
        <div

          ref={refs.setFloating}
          {...getFloatingProps()}
          style={{  ...floatingStyles }}
          className='max-w-[300px] flex flex-col gap-2  border bg-white p-3  border-colLightGray rounded-[10px] overflow-hidden z-50'
          onMouseEnter={() =>{
            clearTimeout(hoverTimeout)
          }}
          onMouseLeave={handleMouseLeave}
        >

            {
                cart.map((product) => {
                   return(
                    <div className='flex'>
                    <NavLink
                to={`/catalog/'${product.category.slug}'/${product.slug}`}
                className='cursor-pointer min-w-[56px] w-14 h-14 overflow-hidden bg-gray-100 rounded-md'>
                <img
                  className='w-full h-full object-contain'
                  src={product?.files[0]?.large || noImg}
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src = noImg;
                  }}
                  alt='*'
                />
              </NavLink>


              </div>)
                })
            }
        </div>
      )}

    </FloatingPortal>
    </>
  )
}

export default CartButton