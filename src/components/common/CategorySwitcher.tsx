import React from 'react';
import { ProductListCategoryChain } from 'src/types/Category/ProductListCategoryChain';
import { Category } from 'src/types/Category/Category';
import noImg from '@assets/images/no-image.png';
import categoryIcon from '@assets/icons/category.svg';

interface CategorySwitcherProps {
  categories: ProductListCategoryChain[];
  selectedCategory: string | number;
  onCategoryChange: (categoryId: string | number) => void;
}

const CategorySwitcher: React.FC<CategorySwitcherProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <>
      {categories?.length > 0 && (
        <>
          <div className='overflow-x-scroll md:overflow-x-hidden scrollable flex py-3 md:grid md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-3 pr-2'>
            <button
              className={`${
                selectedCategory === '' ? 'bg-gray-200' : 'bg-white'
              } shadow-[0_1px_2px_0_rgba(0,0,0,.1)] p-1 lg:p-2 rounded-md flex justify-center items-center outline-none min-w-[120px] transition-colors duration-200`}
              onClick={() => onCategoryChange('')}
            >
              <img className='w-4 mr-1' src={categoryIcon} alt='*' />
              All
              <span className='absolute top-[-12px] right-[-12px] border-4 lining-nums proportional-nums border-gray-100 bg-colGreen text-white text-xs rounded-[50px] min-w-[28px] h-[28px] p-[3px] block'>
                {categories.reduce((sum, cat) => sum + (cat.count || 0), 0)}
              </span>
            </button>
            {categories?.map((el) => {
              const lastCategoryInChain = el?.chain[el?.chain?.length -1];
              return (
                <button
                  className={`${
                    String(selectedCategory) === String(lastCategoryInChain?.id) ? 'bg-gray-200' : 'bg-white'
                  } shadow-[0_1px_2px_0_rgba(0,0,0,.1)] p-1 lg:p-2 rounded-md flex items-center relative outline-none whitespace-nowrap md:whitespace-normal md:min-w-[auto] transition-colors duration-200`}
                  key={lastCategoryInChain.id}
                  onClick={() => onCategoryChange(lastCategoryInChain.id)}
                >
                  {el.count > 0 && (
                    <span className='absolute top-[-12px] right-[-12px] border-4 lining-nums proportional-nums border-gray-100 bg-colGreen text-white text-xs rounded-[50px] min-w-[28px] h-[28px] p-[3px] block'>
                      {el.count}
                    </span>
                  )}
                  <div className='min-w-[40px] w-10 h-8 overflow-hidden rounded'>
                    <img
                      className='w-full h-full object-cover'
                      src={lastCategoryInChain.image || noImg}
                      onError={(e) => {
                        // Handle image error gracefully
                        (e.target as HTMLImageElement).src = noImg;
                      }}
                      alt='*'
                    />
                  </div>
                  <span className='px-2 text-colBlack text-sm leading-[115%] text-left break-all line-clamp-2'>
                    {lastCategoryInChain.name}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default CategorySwitcher;
