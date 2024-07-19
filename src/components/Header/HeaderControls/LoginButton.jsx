import React, { useRef, useState } from 'react'
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
    FloatingPortal,
    arrow,
    FloatingArrow,
    safePolygon
  } from "@floating-ui/react";
import { useGetUserDataQuery } from '../../../redux/api/userEndpoints';
// import AuthModal from '../../../helpers/CModal/AuthModal';
import { useModal } from '../../../context/ModalContext';
import { useLocation } from 'react-router-dom';

function LoginButton() {
  const location = useLocation()
  const { showModal } = useModal();

    const [isOpen, setIsOpen] = useState(false);
    const arrowRef = useRef(null);

    const { refs, floatingStyles, context, middlewareData, placement } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: "top",
      // Make sure the tooltip stays on the screen
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(1),
        flip({
          fallbackAxisSideDirection: "start"
        }),
        shift(),
        arrow({
            element: arrowRef,
          }),
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
        <button
        ref={refs.setReference} {...getReferenceProps()}
          onClick={() => {
            showModal({ type: 'auth', content: 'checkAuth', from: location})

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
          className='max-w-[300px] flex flex-col gap-2  border bg-white p-3  border-colLightGray rounded-[10px] overflow-hidden z-50'
      
        >
                     

<FloatingArrow ref={arrowRef} context={context} style={{ zIndex: '50' }}/>

            <div className=' font-semibold'>Войдите в профиль</div>
            <div>Вы сможете отслеживать статусы заказов и сохранять товары в «Избранном»</div>
            <button className='text-xs xs:text-sm sm:text-base bg-colGreen text-white rounded-md p-2 mt-1 font-semibold w-1/2'
            onClick={() => {
              showModal({ type: 'auth', content: 'checkAuth', from: location})
            }}
            >Войти</button>
        </div>
      )}

    </FloatingPortal>
        </>
  )
}

export default LoginButton