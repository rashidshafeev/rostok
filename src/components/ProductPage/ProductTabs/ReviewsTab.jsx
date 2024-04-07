import React, { useEffect, useState } from 'react'
import Review from '../../Reviews/Review'

import star from '../../../assets/icons/adv1.svg';
import starhalf from '../../../assets/icons/adv1half.svg';
import starfill from '../../../assets/icons/adv1fill.svg';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import RatingStars from '../../Reviews/RatingStars';
import ReviewModal from '../../../helpers/CModal/ReviewModal';

function ReviewsTab({reviews}) {
const location = useLocation()
// const params = useParams()
// console.log(location, params)
const [open, setOpen] = useState(false);
console.log(reviews)

const handleOpen = () => {
    console.log('open')
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

    return (
        <>
            <h3 className='text-2xl mt-5 font-semibold' id="reviews">Отзывы</h3>
            <div className='flex justify-between  my-5'>
                <div className='flex items-center '>
                    <div className='text-2xl font-semibold mr-2'> {reviews?.rating}</div>
                    <div className='flex items-center mr-2'>
                        <RatingStars totalStars={5} initialRating={reviews?.rating}/>
                    </div>
                    <div className='text-lg text-colDarkGray'> {reviews?.total_count_text}</div>
                </div>
                <button onClick={handleOpen} className='bg-colGreen font-semibold rounded text-white py-[10px] px-[30px] '>Оставить отзыв</button>
<ReviewModal open={open} handleClose={handleClose}/>

            </div>
            <div className='flex gap-5'>

                {reviews?.list?.map( (review, i) => {
                    return(
                        <Review key={i} review={review}/>
                    )
                })}
            </div>
            <NavLink to="reviews"
            state={{reviews: reviews}}>
            <div className='text-colGreen font-semibold underline underline-offset-8 cursor-pointer mt-5'>Читать все отзывы</div>

            </NavLink>


        </>
    )
}

export default ReviewsTab