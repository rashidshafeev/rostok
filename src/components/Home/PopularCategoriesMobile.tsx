// src/components/Home/popularCategories2.tsx
import React from 'react';

import { NavLink } from 'react-router-dom';
import { useWindowSize } from 'react-use';

import { useGetMainPageDataQuery } from '@/redux/api/contentEndpoints';
import tailarrow from '@/shared/assets/icons/tail-arrow.svg';

import CatalogCard from '../Catalog/CategoryCard';

import MobileCategoryCard from './MobileCategoryCard';

const PopularCategoriesMobile = () => {
  const { data, isLoading, isSuccess } = useGetMainPageDataQuery();
  const { width } = useWindowSize();

  if (width < 1024) {
    return (
      <div className="content">
        <div className="w-full overflow-x-auto scroll-touch hide-scrollable">
          <div className="flex flex-col gap-3 py-1 min-w-min">
            <div className="flex flex-nowrap gap-2">
              {isSuccess
                ? data?.popularCategories
                    ?.slice(0, Math.ceil(data?.popularCategories?.length / 2))
                    .map((el) => <MobileCategoryCard category={el} />)
                : null}
            </div>
            <div className="flex flex-nowrap gap-2">
              {isSuccess
                ? data?.popularCategories
                    ?.slice(Math.ceil(data?.popularCategories?.length / 2))
                    .map((el) => <MobileCategoryCard category={el} />)
                : null}
              <NavLink
                to="/catalog"
                className="block bg-colGreen relative rounded-lg overflow-hidden w-[120px] h-[70px]"
              >
                <div className="relative w-full h-full">
                  <h3 className="absolute top-1 left-2  text-white text-sm font-semibold line-clamp-2">
                    Все категории
                  </h3>
                  <img
                    src={tailarrow}
                    alt="*"
                    className="absolute bottom-1 right-2 h-4 object-cover"
                  />
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // return (
  //   <div className='pt-5 pb-10'>
  //     <h1 className='text-colBlack text-2xl mm:text-4xl font-semibold pb-4'>
  //       Популярные категории
  //     </h1>
  //     <div className="w-full overflow-x-auto scroll-touch">
  //       <div className="flex gap-3 py-1 min-w-min lg:gap-5">
  //         {isSuccess && data?.popularCategories?.map((el) => (
  //           <div key={el?.id} className="flex-none w-[calc(100%-24px)] max-w-[300px] sm:w-[calc(50%-12px)] sm:max-w-[400px] lg:w-[calc(33.333%-16px)] lg:max-w-none">
  //             <CatalogCard category={el} />
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default PopularCategoriesMobile;
