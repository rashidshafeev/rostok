import React from 'react'

import action from '../../assets/icons/action.svg';
import sales from '../../assets/icons/sales.svg';
import news from '../../assets/icons/news.svg';

import { NavLink } from 'react-router-dom';

function CatalogFastAccess({catalog}) {
  return (
    <div className='content mx-auto flex items-center scrollable overflow-x-scroll space-x-4 pb-2'>
        <NavLink
          to='#'
          className='rounded h-[27px] flex items-center justify-center px-4 bg-[#F04438]'
        >
          <img src={action} alt='*' />
          <span className='text-sm font-semibold text-white pl-1'>Акции</span>
        </NavLink>
        <NavLink
          to='#'
          className='rounded h-[27px] flex items-center justify-center px-4 bg-colGreen'
        >
          <img src={news} alt='*' />
          <span className='text-sm font-semibold text-white pl-1'>Новинки</span>
        </NavLink>
        <NavLink
          to='#'
          className='rounded h-[27px] flex items-center justify-center px-2 bg-[#F8981D] min-w-[130px]'
        >
          <img src={sales} alt='*' />
          <span className='text-sm font-semibold text-white pl-1'>
            Хиты продаж
          </span>
        </NavLink>
        {catalog?.slice(0, 14)?.map((el) => (
          <NavLink
            to={`catalog/${el.slug}`}
            state={{ category: el }}
            key={el?.id}
            className='whitespace-nowrap text-colBlack text-sm font-semibold'
          >
            {el?.name}
          </NavLink>
        ))}
        <NavLink
          to='/catalog'
          className='whitespace-nowrap text-colGreen text-sm font-semibold'
        >
          Показать все
        </NavLink>
      </div>
  )
}

export default CatalogFastAccess