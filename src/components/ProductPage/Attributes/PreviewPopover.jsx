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

function PreviewPopover() {

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
    <FloatingPortal>
      
        {isOpen && (
          <div
          className='w-[100px] h-[100px] border border-colLightGray rounded-[10px] flex justify-center items-center'
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
                    <img src="" alt="" className='contain' />
                </div>
        )}

      </FloatingPortal>
  )
}

export default PreviewPopover