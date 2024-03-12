import React from 'react'

import star from '../../assets/icons/adv1.svg';
import starhalf from '../../assets/icons/adv1half.svg';
import starfill from '../../assets/icons/adv1fill.svg';

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css"

function Review() {
  return (
    <div className='p-5 border rounded-[10px] basis-[calc(50%-10px)]'>

        <div className='flex justify-between mb-5'>
            <div className='flex items-center gap-2'>
                <div className='font-semibold text-lg'>Надежда</div>
                <div className='text-colDarkGray'>3 октября 2023</div>
            </div>
            <div className='flex items-center mr-2'>
                        <img className='h-5 w-5' src={starfill} alt="" />
                        <img className='h-5 w-5' src={starfill} alt="" />
                        <img className='h-5 w-5' src={starfill} alt="" />
                        <img className='h-5 w-5' src={starfill} alt="" />
                        <img className='h-5 w-5' src={starhalf} alt="" />
                    </div>
        </div>

        <div className='font-semibold text-lg  mt-5 mb-2'>Плюсы</div>
        <div>Классный пуф. Расправился быстро, жалко что не рассчитали с размером и ребёнку в комнату не влез, но в зал вписался отлично</div>

        <div className='font-semibold text-lg  mt-5 mb-2'>Минусы</div>
        <div>Неудобно сидеть, не влез в комнату</div>

        <div className='font-semibold text-lg  mt-5 mb-2'>Отзыв</div>
        <div>Классный пуф. Расправился быстро, жалко что не рассчитали с размером и ребёнку в комнату не влез, но в зал вписался отлично</div>

    </div>
  )
}

export default Review