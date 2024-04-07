import React from 'react'

import arrow from '../../../assets/icons/next-icon.svg';


function RightNav({onClick, disabled}) {
  return (
    <button className='z-[10] w-10 h-10 rounded-full bg-white shadow-[0_4px_6px_0_rgba(0,0,0,0.06)] absolute top-[105%] right-0 flex justify-center items-center' onClick={onClick}> 
    <img  src={arrow} alt="" />
     </button>
  )
}

export default RightNav