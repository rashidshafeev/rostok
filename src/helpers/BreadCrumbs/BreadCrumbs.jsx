import React from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';

const BreadCrumbs = ({ breadCrumps }) => {
  const { categoryId } = useParams();
  const { pathname } = useLocation();

  return (
    <div className='flex items-center flex-wrap py-3'>
      <NavLink
        className='mr-3 mt-2 text-xs opacity-60 hover:opacity-100 duration-200 text-colBlack'
        to='/'
      >
        Главная
      </NavLink>
      <span className='min-w-[5px] w-[5px] h-[5px] mr-3 mt-2 rounded-full bg-colGreen'></span>
      <NavLink
        className={`mr-3 mt-2 text-xs text-colBlack hover:opacity-100 duration-200 ${
          pathname === '/catalog' ? 'opacity-100' : 'opacity-60'
        }`}
        to='/catalog'
      >
        Каталог
      </NavLink>
      {breadCrumps?.map((el, index) => (
        <React.Fragment key={index}>
          <span className='min-w-[5px] w-[5px] h-[5px] mr-3 mt-2 rounded-full bg-colGreen'></span>
          <NavLink
            to={`/catalog/${el?.slug}`}
            className={`mr-3 mt-2 text-xs text-colBlack hover:opacity-100 duration-200 ${
              categoryId === el?.slug ? 'opacity-100' : 'opacity-60'
            }`}
          >
            {el?.name}
          </NavLink>
        </React.Fragment>
      ))}
    </div>
  );
};

export default BreadCrumbs;
