import React from 'react'
import { NavLink } from 'react-router-dom'

import favoriteicon from '../../assets/icons/favorite-green.svg';
import comparisoniconactive from '../../assets/icons/comparison-card-active.svg';
import comparisonicon from '../../assets/icons/comparison-green.svg';
import star from '../../assets/icons/adv1fill.svg';
import share from '../../assets/icons/share.svg';
import downloadpdf from '../../assets/icons/download-pdf.svg';
import print from '../../assets/icons/print.svg';
import { toggleComparison } from '../../redux/slices/comparisonSlice';
import { toggleFavorite } from '../../redux/slices/favoriteSlice';
import { useDispatch, useSelector } from 'react-redux';

function TopControls({product, reviews}) {

  const dispatch = useDispatch();

  const favorite = useSelector(state => state?.favorite)
  const comparison = useSelector(state => state?.comparison)

  const isProductInFavorite = favorite?.favorite?.some((el) => el?.id === product?.id);
  const isProductInComparison = comparison?.comparison?.some((el) => el?.id === product?.id);
  console.log(product, reviews);
  return (
    <>
    <div className='flex justify-between mb-[10px]'>
          <div className='flex gap-[10px]'>

            {/* <NavLink
              to='#reviews'
              className='text-center flex flex-row justify-between items-center'
            > */}
            <img className='mx-auto mr-1' src={star} alt='*' />
              <span className='text-xs pt-1 font-normal text-colBlack'>
                {reviews.rating}
              </span>
              
            {/* </NavLink> */}
            <NavLink
              to='#'
              className='text-center flex flex-row justify-between items-center mr-[10px]'
            >
              <span className='text-xs pt-1 font-medium text-colDarkGray'>
                {reviews.total_count_text}
              </span>
            </NavLink>
            
            <NavLink
              to='#'
              className='text-center flex flex-row justify-between items-center'
              onClick={(e) => {
                dispatch(toggleComparison(product));
              }}
            >
              <img className='mx-auto mr-1' src={isProductInComparison ? comparisonicon : comparisoniconactive} alt='*' />
              <span className='text-xs pt-1 font-medium text-colBlack'>
                Сравнить
              </span>
            </NavLink>
            <NavLink
              to='#'
              className='text-center flex flex-row justify-between items-center'
              onClick={(e) => {
                dispatch(toggleFavorite(product));
              }}
            >
              <img className='mx-auto mr-1' src={isProductInFavorite ? favoriteicon : star} alt='*' />
              <span className='text-xs pt-1 font-medium text-colBlack'>
                В избранное
              </span>
            </NavLink>
            <NavLink
              to='#'
              className='text-center flex flex-row justify-between items-center'
            >
              <img className='mx-auto mr-1' src={share} alt='*' />
              <span className='text-xs pt-1 font-medium text-colBlack'>
                Поделиться
              </span>
            </NavLink>

          </div>

          <div className='flex gap-[10px]'>
            <NavLink
              to='#'
              className='text-center flex flex-row justify-between items-center'
            >
              <img className='mx-auto mr-1' src={downloadpdf} alt='*' />
              <span className='text-xs pt-1 font-medium text-colBlack'>
                Скачать PDF
              </span>
            </NavLink>
            <NavLink
              to='#'
              className='text-center flex flex-row justify-between items-center'
            >
              <img className='mx-auto mr-1' src={print} alt='*' />
              <span className='text-xs pt-1 font-medium text-colBlack'>
                Распечатать
              </span>
            </NavLink>
          </div>




        </div>
    </>
  )
}

export default TopControls