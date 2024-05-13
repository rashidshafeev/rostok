import React, { useState } from 'react'
import PreviewPopover from './PreviewPopover'

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


function ProductAttributeValue({ id, value, current, handleChangeAttribute }) {

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
      <div data-id={id} data-value={value.value} data-text={value.text} onClick={handleChangeAttribute}

ref={refs.setReference} {...getReferenceProps()}

        className={`h-12 px-3 border ${value.value == current[id].value ? 'border-colGreen' : 'border-colLightGray'} hover:border-colGreen ${value.availible ? 'bg-transparent' : 'bg-colLightGray'} rounded-[10px] flex justify-center items-center cursor-pointer`} >

        {value.color ? (<div style={{ backgroundColor: `${value.color}` }} className={`w-10 h-10 rounded-full border`}></div>) : (value.text)}


      </div>
    {value.color && 
      <FloatingPortal>
      
      {isOpen && (
        <div

        ref={refs.setFloating}
        {...getFloatingProps()}
        style={{backgroundColor: `${value.color}`  ,...floatingStyles}}
        className='w-[100px] lg:block hidden h-[100px] border  border-colLightGray rounded-[10px]'
        >
                  <img src="" alt="" className='contain' />
              </div>
      )}

    </FloatingPortal>
    }
      
  </>
  )
}

export default ProductAttributeValue