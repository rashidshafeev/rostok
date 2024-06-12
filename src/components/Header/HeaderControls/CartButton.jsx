import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import cart from '../../../assets/icons/cart.svg';

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

  const itemsQuantity = useSelector((state) => state?.cart?.itemsQuantity);

  const [isOpen, setIsOpen] = useState(false);

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

  const hover = useHover(context, { move: false });
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
        <img className='mx-auto' src={cart} alt='*' />
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
          className='w-[100px] lg:flex hidden h-[100px] border  border-colLightGray rounded-[10px] overflow-hidden'
        >
        </div>
      )}

    </FloatingPortal>
    </>
  )
}

export default CartButton