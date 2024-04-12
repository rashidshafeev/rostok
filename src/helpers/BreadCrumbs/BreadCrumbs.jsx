// BreadCrumps.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { crumbLinkReplacer } from './crumbLinkReplacer';

const Breadcrumbs = () => {
  const { pathname, state } = useLocation();
  const crumbs = [];
  if (state && state.category) {
    crumbs.push(
      <React.Fragment key={state.category?.id}>
        <span className='min-w-[5px] w-[5px] h-[5px] rounded-full bg-colGreen'></span>
        <span className='text-xs text-colBlack'>{state.category?.name}</span>
      </React.Fragment>
    );
  }

  const crumbPath = pathname
    ?.split('/')
    ?.filter(
      (path) => path !== '' && path !== 'categories' && path !== 'products'
    )
    ?.map((crumb, index, array) => {
      const crumbLink = `/${array.slice(0, index + 1).join('/')}`;

      return (
        <React.Fragment key={crumb}>
          <span className='min-w-[5px] w-[5px] h-[5px] rounded-full bg-colGreen'></span>
          <span className='text-xs text-colBlack'>
            {crumbLinkReplacer[crumb] || crumb}
          </span>
        </React.Fragment>
      );
    });

  return (
    <div className='content w-full flex items-center space-x-3 pt-6 pb-3 truncate lining-nums proportional-nums'>
      <Link to='/' className='text-xs text-colBlack'>
        Главная
      </Link>
      {crumbPath}
      {crumbs}
    </div>
  );
};

export default Breadcrumbs;
