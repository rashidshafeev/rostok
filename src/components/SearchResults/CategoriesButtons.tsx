import React from 'react'
import { ProductListCategoryChain } from '@/types/Category/ProductListCategoryChain'

import noImg from '@assets/images/no-image.png';
import categoryIcon from '@assets/icons/category.svg';

type CategoriesButtonsProps = {
    categories: ProductListCategoryChain
}

const CategoriesButtons = ({ filtersValue, handleCategories, categories  }) => {
  return (
    <>
    {categories?.length > 0 && (
        <> 
          <h4 className='font-medium mm:font-semibold mm:text-xl text-colBlack pb-3'>
            Найдены товары в категориях:
          </h4>
          <div className='overflow-x-scroll md:overflow-x-hidden scrollable flex py-3 md:grid md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-3 pr-2'>
            <button
              className={`${
                filtersValue?.category_id == '' ? 'bg-gray-200' : 'bg-white'
              } shadow-[0_1px_2px_0_rgba(0,0,0,.1)] p-1 lg:p-2 rounded-md flex justify-center items-center outline-none min-w-[120px]`}
              onClick={() => handleCategories('')}
            >
              <img className='w-4 mr-1' src={categoryIcon} alt='*' />
              Все
            </button>
            {categories?.map((el) => (
              <button
                className={`${
                  filtersValue?.category_id == el?.id
                    ? 'bg-gray-200'
                    : 'bg-white'
                } shadow-[0_1px_2px_0_rgba(0,0,0,.1)] p-1 lg:p-2 rounded-md flex items-center relative outline-none whitespace-nowrap md:whitespace-normal md:min-w-[auto]`}
                key={el?.id}
                onClick={() => handleCategories(el?.id)}
              >
                <span className='absolute top-[-12px] right-[-12px] border-4 lining-nums proportional-nums border-gray-100 bg-colGreen text-white text-xs rounded-[50px] min-w-[28px] h-[28px] p-[3px] block'>
                  {el?.product_count}
                </span>
                <div className='min-w-[40px] w-10 h-8 overflow-hidden rounded'>
                  <img
                    className='w-full h-full object-cover'
                    src={el?.image || noImg}
                    onError={(e) => {
                      e.target.onError = null;
                      e.target.src = noImg;
                    }}
                    alt='*'
                  />
                </div>
                <span className='px-2 text-colBlack text-sm leading-[115%] text-left break-all line-clamp-2'>
                  {el?.name}
                </span>
              </button>
            ))}
          </div>
          </>
      )}
      </>
  )
}

export default CategoriesButtons