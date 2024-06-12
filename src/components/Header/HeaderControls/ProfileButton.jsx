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


function ProfileButton() {

    const { user } = useSelector((state) => state?.user);


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
          to='/profile/personal-data'
          className='text-center flex flex-col justify-between items-center'
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
          className='w-[100px] lg:flex hidden h-[100px] border  border-colLightGray rounded-[10px] overflow-hidden'
        >
        
        </div>
      )}

    </FloatingPortal>


        </>
  )
}

export default ProfileButton