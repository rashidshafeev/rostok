import React, { useEffect, useState } from 'react'

import star from '../../assets/icons/adv1.svg';
import starhalf from '../../assets/icons/adv1half.svg';
import starfill from '../../assets/icons/adv1fill.svg';

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css"

import RatingStars from './RatingStars';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

function Review({review}) {

  console.log(review)
  const [index, setIndex] = useState(-1);
  const [open, setOpen] = useState(false);

  const photos = []

  review.files.forEach((item, i) => {
    photos.push({
      src: item.small,
      id: i
    })
  })

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 3
    };

    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
    };

  

  console.log(photos)

  return (
    <div className='p-5 border rounded-[10px] basis-[calc(50%-10px)] flex flex-col'>

        <div className='flex justify-between mb-5'>
            <div className='flex items-center gap-2'>
                <div className='font-semibold text-lg'>{review.user}</div>
                <div className='text-colDarkGray'>{review.date}</div>
            </div>
            <div className='flex items-center mr-2'>
                        <RatingStars totalStars={5} initialRating={review.rating}/>
                    </div>
        </div>

        <div className='font-semibold text-lg  mt-5 mb-2'>Плюсы</div>
        <div>{review.advantages || "Классный пуф. Расправился быстро, жалко что не рассчитали с размером и ребёнку в комнату не влез, но в зал вписался отлично"}</div>

        <div className='font-semibold text-lg  mt-5 mb-2'>Минусы</div>
        <div>{review.advantages || "Неудобно сидеть, не влез в комнату"}</div>

        <div className='font-semibold text-lg  mt-5 mb-2'>Отзыв</div>
        <div>{review.text || "Классный пуф. Расправился быстро, жалко что не рассчитали с размером и ребёнку в комнату не влез, но в зал вписался отлично"}</div>
        <Lightbox
        index={index}
        slides={photos}
        open={index >= 0}
        close={() => setIndex(-1)}
      />

      <div className='w-full flex flex-nowrap scrollable overflow-x-auto gap-2 py-5'>
        {photos.map((photo, i) => {

          return (
            <div className='shrink-0 p-1 border rounded' >
              <img onClick={() => { setIndex(i) }} className='rounded-md w-20 h-20 shrink-0 object-contain' src={photo.src} alt="" />

            </div>

          )
        })}
      </div>

        

    </div>
  )
}

export default Review