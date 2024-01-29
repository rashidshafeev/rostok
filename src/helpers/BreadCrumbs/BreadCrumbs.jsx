import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { crumbLinkReplacer } from './crumbLinkReplacer';

const Breadcrumbs = () => {
  const { pathname } = useLocation();

  const crumbPath = pathname
    ?.split('/')
    ?.filter((path) => path !== '' && path !== 'all-items')
    ?.map((crumb, index, array) => {
      const crumbLink = `/${array.slice(0, index + 1).join('/')}`;

      return (
        <React.Fragment key={crumb}>
          {index !== 0 && (
            <span className='min-w-[5px] w-[5px] h-[5px] rounded-full bg-colGreen'></span>
          )}
          <Link to={crumbLink} className='text-xs text-colBlack'>
            {crumbLinkReplacer[crumb] || crumb}
          </Link>
        </React.Fragment>
      );
    });

  return (
    <div className='content w-full flex items-center space-x-3 pt-6 pb-3 truncate lining-nums proportional-nums'>
      <Link to='/' className='text-xs text-colBlack'>
        Главная
      </Link>
      <span className='min-w-[5px] w-[5px] h-[5px] rounded-full bg-colGreen'></span>
      {crumbPath}
    </div>
  );
};

export default Breadcrumbs;
