import React, { useState } from 'react'
import profile from '../../../assets/icons/profile.svg'; 

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

function LoginButton({ setContent, setOpen}) {

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
        <button
        ref={refs.setReference} {...getReferenceProps()}
          onClick={() => {
            setContent('checkAuth');
            setOpen(true);
          }}
          className='text-center flex flex-col justify-between items-center outline-none'
        >
          <img className='mx-auto' src={profile} alt='*' />
          <span className='text-xs pt-1 font-medium text-colBlack line-clamp-1 w-[63px] break-all'>
            Войти
          </span>
        </button>
        
          
        <FloatingPortal>
      

      {isOpen && (
        <div

          ref={refs.setFloating}
          {...getFloatingProps()}
          style={{  ...floatingStyles }}
          className='w-[100px] flex flex-col h-[100px] border bg-white p-3  border-colLightGray rounded-[10px] overflow-hidden'
        >

            <div>Войдите в профиль</div>
            <div>Вы сможете отслеживать статусы заказов и сохранять товары в «Избранном»</div>
            <button className='transition-all text-xs xs:text-sm sm:text-base duration-200 group-hover:opacity-100 lg:opacity-0 bg-colGreen text-white rounded-md p-2 mt-1 font-semibold w-full'
            >Войти</button>
        </div>
      )}

    </FloatingPortal>
        </>
  )
}

export default LoginButton