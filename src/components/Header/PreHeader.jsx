import React from 'react'

import address from '../../assets/icons/address.svg';

import { NavLink } from 'react-router-dom';

function PreHeader() {
  return (
    <div className='content mx-auto pt-2 flex justify-between items-center space-x-5 relative z-[999]'>
        <div className='flex items-center'>
          <img src={address} alt='*' />
          <span className='text-colBlack text-xs font-semibold ml-1'>
            Москва
          </span>
        </div>
        <ul className='flex justify-end items-center space-x-3'>
          <li>
            <NavLink to='#' className='text-colDarkGray text-sm font-semibold'>
              Оплата и доставка
            </NavLink>
          </li>
          <li>
            <NavLink to='#' className='text-colDarkGray text-sm font-semibold'>
              Гарантия и возврат
            </NavLink>
          </li>
          <li>
            <NavLink to='#' className='text-colDarkGray text-sm font-semibold'>
              Оптовым клиентам
            </NavLink>
          </li>
          <li>
            <NavLink to='#' className='text-colDarkGray text-sm font-semibold'>
              Контакты
            </NavLink>
          </li>
          <li>
            <NavLink to='#' className='text-colDarkGray text-sm font-semibold'>
              О компании
            </NavLink>
          </li>
          <li>
            <NavLink
              to='#'
              className='text-colDarkGray text-sm font-semibold border-b border-colDarkGray pb-[1px]'
            >
              Есть вопросы?
            </NavLink>
          </li>
        </ul>
      </div>
  )
}

export default PreHeader