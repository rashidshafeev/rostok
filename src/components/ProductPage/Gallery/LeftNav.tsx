import React from 'react';

import arrow from '@/shared/assets/icons/next-icon.svg';

const LeftNav = ({ onClick, disabled }) => {
  return (
    <button
      className="z-[10] w-10 h-10 rounded-full bg-white shadow-[0_4px_6px_0_rgba(0,0,0,0.06)] absolute -left-[70px] flex justify-center items-center"
      onClick={onClick}
    >
      <img className="-rotate-90" src={arrow} alt="" />
    </button>
  );
  // return (
  //   <button className='z-[10] w-10 h-10 rounded-full bg-white shadow-[0_4px_6px_0_rgba(0,0,0,0.06)] absolute top-[105%]  flex justify-center items-center' onClick={onClick}>
  //   <img className='rotate-180' src={arrow} alt="" />
  //    </button>
  // )
};

export default LeftNav;
