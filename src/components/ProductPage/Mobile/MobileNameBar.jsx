import React from 'react'

import star from '../../../assets/icons/adv1fill.svg';
import copyicon from '../../../assets/icons/copy-icon.svg';


function MobileNameBar({ name, reviews, sku}) {




  return (
    <div className='lg:hidden block w-full'>
        <div className=' text-xl font-semibold mb-[10px]'>{name}</div>
    <div className='flex justify-between'>
    <div className='flex'>
            <img className='mx-auto mr-1' src={star} alt='*' />
              <span className='text-xs pt-1 mr-2 font-normal text-colBlack'>
                {reviews.rating}
              </span>
              <span className='text-xs pt-1 font-medium text-colDarkGray'>
                {reviews.total_count_text}
              </span>
            </div>

            <div className='flex items-end leading-none shrink ml-1 text-colDarkGray text-xs'>
            Артикул: {sku}
                        <img onClick={() => {navigator.clipboard.writeText(sku)}} src={copyicon} alt="" className='w-3 h-3 rounded-full cursor-pointer hover:opacity-80' />
                    </div>
    </div>

    
    </div>
    
  )
}

export default MobileNameBar