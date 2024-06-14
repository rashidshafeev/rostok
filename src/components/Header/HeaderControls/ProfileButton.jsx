import React, { useState } from 'react'
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
import { NavLink } from 'react-router-dom';
 
import profile from '../../../assets/icons/profile.svg'; 
import { useSelector } from 'react-redux';

import fizlico from '../../../assets/icons/fizlico-inactive.svg';
import urlico from '../../../assets/icons/urlico-inactive.svg';


function ProfileButton() {

    const { user } = useSelector((state) => state?.user);
    const { organizations }  = useSelector((state)  => state?.organizations);
    const [hoverTimeout, setHoverTimeout] = useState(null);

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
  
    // const hover = useHover(context, { move: false });
    const focus = useFocus(context);
    const dismiss = useDismiss(context);
    // Role props for screen readers
    const role = useRole(context, { role: "tooltip" });
  
    const { getReferenceProps, getFloatingProps } = useInteractions([
    //   hover,
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
          to='/profile/personal-data'
          className='text-center flex flex-col justify-between items-center'
          onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
        >
          <img className='mx-auto' src={profile} alt='*' />
          <span className='text-xs pt-1 font-medium text-colBlack line-clamp-1 w-[63px] break-all'>
            {user?.name}
          </span>
        </NavLink>

        <FloatingPortal>
      

      {isOpen && (
        <div

          ref={refs.setFloating}
          {...getFloatingProps()}
          style={{  ...floatingStyles }}
          className=' lining-nums proportional-nums max-w-[300px] flex flex-col gap-2  border bg-white p-3  border-colLightGray rounded-[10px] overflow-hidden z-50'
          onMouseEnter={() =>{
            clearTimeout(hoverTimeout)
          }}
          onMouseLeave={handleMouseLeave}
        >
            <NavLink
            to='/profile/personal-data'
            >
            <li className='rounded font-semibold hover:bg-colSuperLight px-2 py-1'>Мой кабинет</li>

            </NavLink>
            <NavLink
            to='/profile/organizations'
            >
            <li className='rounded font-semibold hover:bg-colSuperLight px-2 py-1'>Мои организации</li>

            </NavLink>
            <NavLink
            to='/profile/orders'
            >
            <li className='rounded font-semibold hover:bg-colSuperLight px-2 py-1'>Мои заказы</li>

            </NavLink>
            <NavLink
            to='/favorites'
            >
            <li className='rounded font-semibold hover:bg-colSuperLight px-2 py-1'>Избранное</li>

            </NavLink>
            <NavLink
            to='/comparison'
            >
            <li className='rounded font-semibold hover:bg-colSuperLight px-2 py-1'>Сравнение</li>

            </NavLink>
            <div className=' border-t border-b border-colSuperLight'>
                <div className=' text-xs text-colDarkGray py-2'>Мои организации</div>
                {
                organizations?.map(org => (
                    <div className='flex gap-2 items-center rounded font-semibold hover:bg-colSuperLight px-2 py-1'>
                      <img src={urlico} className='h-4 w-4' alt="" srcset="" />
                      <div className=''>{org.name}</div>
                    </div>
                ))
              }
            </div>
            <div className='flex gap-2 items-center rounded font-semibold hover:bg-colSuperLight px-2 py-1'>
                  <img src={fizlico} className='h-4 w-4' alt="" srcset="" />
                  <div>{user?.name}<span className='text-xs text-colDarkGray'> (физ лицо)</span></div>
                </div>
        </div>
      )}

    </FloatingPortal>


        </>
  )
}

export default ProfileButton