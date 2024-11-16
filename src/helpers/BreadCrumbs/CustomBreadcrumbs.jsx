import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const CustomBreadcrumbs = ({ breadcrumbs }) => {
  const { pathname } = useLocation();

  return (
    <div className='flex items-center flex-wrap py-3'>
      <NavLink
        className='mr-3 mt-2 text-xs opacity-60 hover:opacity-100 duration-200 text-colBlack'
        to='/'
      >
        Главная
      </NavLink>
      {breadcrumbs?.map((el, index) => (
        <React.Fragment key={index}>
          <span className='min-w-[5px] w-[5px] h-[5px] mr-3 mt-2 rounded-full bg-colGreen'></span>
          <NavLink
            to={`${el?.slug}`}
            className={`mr-3 mt-2 text-xs text-colBlack hover:opacity-100 duration-200 ${
              pathname === el?.slug ? 'opacity-100' : 'opacity-60'
            }`}
          >
            {el?.name}
          </NavLink>
        </React.Fragment>
      ))}
    </div>
  );
};

export default CustomBreadcrumbs;
