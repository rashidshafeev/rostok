import React from 'react'
import Review from '../../Reviews/Review'

import star from '../../../assets/icons/adv1.svg';
import starhalf from '../../../assets/icons/adv1half.svg';
import starfill from '../../../assets/icons/adv1fill.svg';

function ReviewsTab() {
    return (
        <>
            <h3 className='text-2xl mt-5 font-semibold'>Характеристики</h3>
            <div className='flex justify-between  my-5'>
                <div className='flex items-center '>
                    <div className='text-2xl font-semibold mr-2'> 4,5</div>
                    <div className='flex items-center mr-2'>
                        <img src={starfill} alt="" />
                        <img src={starfill} alt="" />
                        <img src={starfill} alt="" />
                        <img src={starfill} alt="" />
                        <img src={starhalf} alt="" />
                    </div>
                    <div className='text-lg text-colDarkGray'> 12 отзывов</div>
                </div>
                <button className='bg-colGreen font-semibold rounded text-white py-[10px] px-[30px] '>Оставить отзыв</button>


            </div>
            <div className='flex gap-5'>
            <Review />
            <Review />
            </div>
          
            <div className='text-colGreen font-semibold underline underline-offset-8 cursor-pointer mt-5'>Читать все отзывы</div>

        </>
    )
}

export default ReviewsTab