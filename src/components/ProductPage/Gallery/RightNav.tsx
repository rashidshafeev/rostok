import React from 'react';

import arrow from '@/shared/assets/icons/next-icon.svg';

function RightNav({ onClick, disabled }) {
  return (
    <button
      className="leftnav z-[10] w-10 h-10 rounded-full bg-white shadow-[0_4px_6px_0_rgba(0,0,0,0.06)] absolute bottom-0 -left-[70px] flex justify-center items-center"
      onClick={onClick}
    >
      <img src={arrow} className="rotate-90" alt="" />
    </button>
  );
}

export default RightNav;
