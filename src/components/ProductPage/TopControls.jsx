import React from 'react'
import { NavLink } from 'react-router-dom'

import favorite from '../../assets/icons/favorite-green.svg';
import comparison from '../../assets/icons/comparison-green.svg';
import star from '../../assets/icons/adv1fill.svg';
import share from '../../assets/icons/share.svg';
import downloadpdf from '../../assets/icons/download-pdf.svg';
import print from '../../assets/icons/print.svg';

function TopControls() {
  return (
    <>
    <div className='flex justify-between mb-[10px]'>
          <div className='flex gap-[10px]'>

            <NavLink
              to='#'
              className='text-center flex flex-row justify-between items-center'
            >
              <img className='mx-auto mr-1' src={star} alt='*' />
              <span className='text-xs pt-1 font-normal text-colBlack'>
                4,5
              </span>
            </NavLink>
            <NavLink
              to='#'
              className='text-center flex flex-row justify-between items-center mr-[10px]'
            >
              <span className='text-xs pt-1 font-medium text-colDarkGray'>
                12 отзывов
              </span>
            </NavLink>

            <NavLink
              to='#'
              className='text-center flex flex-row justify-between items-center'
            >
              <img className='mx-auto mr-1' src={comparison} alt='*' />
              <span className='text-xs pt-1 font-medium text-colBlack'>
                Сравнить
              </span>
            </NavLink>
            <NavLink
              to='#'
              className='text-center flex flex-row justify-between items-center'
            >
              <img className='mx-auto mr-1' src={favorite} alt='*' />
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