import { useState } from 'react';
import { Loading } from '@/shared/ui/Loader';
import ErrorEmpty from "@helpers/Errors/ErrorEmpty";
import {ProductCard, ProductCardLine, ProductCardLineSmall} from '@/widgets/product-card';
import { CustomPagination } from '@/features/catalog/ui/CustomPagination/CustomPagination';
import filterIcon from '@/shared/assets/icons/filter.svg';

export const SRContent = ({ products, isLoading, handlePagination, setOpen }) => {
  const [cardType, setTypeCard] = useState('tile');

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center pb-5'>
        <div className='flex justify-end items-center space-x-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            className='cursor-pointer'
            onClick={() => setTypeCard('tile')}
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M3.66797 2.6665C3.11568 2.6665 2.66797 3.11422 2.66797 3.6665V8.43574C2.66797 8.98802 3.11568 9.43574 3.66797 9.43574H8.4372C8.98948 9.43574 9.4372 8.98802 9.4372 8.43573V3.6665C9.4372 3.11422 8.98948 2.6665 8.4372 2.6665H3.66797ZM11.5654 2.6665C11.0131 2.6665 10.5654 3.11422 10.5654 3.6665V8.43574C10.5654 8.98802 11.0131 9.43574 11.5654 9.43574H16.3347C16.8869 9.43574 17.3347 8.98802 17.3347 8.43573V3.6665C17.3347 3.11422 16.8869 2.6665 16.3347 2.6665H11.5654ZM10.5654 11.564C10.5654 11.0117 11.0131 10.564 11.5654 10.564H16.3347C16.8869 10.564 17.3347 11.0117 17.3347 11.564V16.3332C17.3347 16.8855 16.8869 17.3332 16.3347 17.3332H11.5654C11.0131 17.3332 10.5654 16.8855 10.5654 16.3332V11.564ZM3.66797 10.5638C3.11568 10.5638 2.66797 11.0115 2.66797 11.5638V16.333C2.66797 16.8853 3.11568 17.333 3.66797 17.333H8.4372C8.98948 17.333 9.4372 16.8853 9.4372 16.333V11.5638C9.4372 11.0115 8.98948 10.5638 8.4372 10.5638H3.66797Z'
              fill={`${cardType === 'tile' ? '#15765B' : '#B5B5B5'}`}
            />
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            className='cursor-pointer'
            onClick={() => setTypeCard('line')}
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M2.33301 2.6665C1.78072 2.6665 1.33301 3.11422 1.33301 3.6665V5.6665C1.33301 6.21879 1.78072 6.6665 2.33301 6.6665H4.33301C4.88529 6.6665 5.33301 6.21879 5.33301 5.6665V3.6665C5.33301 3.11422 4.88529 2.6665 4.33301 2.6665H2.33301ZM2.33301 7.99984C1.78072 7.99984 1.33301 8.44755 1.33301 8.99984V10.9998C1.33301 11.5521 1.78072 11.9998 2.33301 11.9998H4.33301C4.88529 11.9998 5.33301 11.5521 5.33301 10.9998V8.99984C5.33301 8.44755 4.88529 7.99984 4.33301 7.99984H2.33301ZM1.33301 14.3332C1.33301 13.7809 1.78072 13.3332 2.33301 13.3332H4.33301C4.88529 13.3332 5.33301 13.7809 5.33301 14.3332V16.3332C5.33301 16.8855 4.88529 17.3332 4.33301 17.3332H2.33301C1.78072 17.3332 1.33301 16.8855 1.33301 16.3332V14.3332ZM9 2.6665C8.44772 2.6665 8 3.11422 8 3.6665V5.6665C8 6.21879 8.44772 6.6665 9 6.6665H17.6667C18.219 6.6665 18.6667 6.21879 18.6667 5.6665V3.6665C18.6667 3.11422 18.219 2.6665 17.6667 2.6665H9ZM8 9C8 8.44772 8.44772 8 9 8H17.6667C18.219 8 18.6667 8.44772 18.6667 9V11C18.6667 11.5523 18.219 12 17.6667 12H9C8.44772 12 8 11.5523 8 11V9ZM9 13.333C8.44772 13.333 8 13.7807 8 14.333V16.333C8 16.8853 8.44772 17.333 9 17.333H17.6667C18.219 17.333 18.6667 16.8853 18.6667 16.333V14.333C18.6667 13.7807 18.219 13.333 17.6667 13.333H9Z'
              fill={`${cardType === 'line' ? '#15765B' : '#B5B5B5'}`}
            />
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            className='cursor-pointer'
            onClick={() => setTypeCard('lineNarrow')}
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M1.33301 3.6665C1.33301 3.11422 1.78072 2.6665 2.33301 2.6665H17.6663C18.2186 2.6665 18.6663 3.11422 18.6663 3.6665V5.6665C18.6663 6.21879 18.2186 6.6665 17.6663 6.6665H2.33301C1.78072 6.6665 1.33301 6.21879 1.33301 5.6665V3.6665ZM1.33301 8.99984C1.33301 8.44755 1.78072 7.99984 2.33301 7.99984H17.6663C18.2186 7.99984 18.6663 8.44755 18.6663 8.99984V10.9998C18.6663 11.5521 18.2186 11.9998 17.6663 11.9998H2.33301C1.78072 11.9998 1.33301 11.5521 1.33301 10.9998V8.99984ZM2.33301 13.3332C1.78072 13.3332 1.33301 13.7809 1.33301 14.3332V16.3332C1.33301 16.8855 1.78072 17.3332 2.33301 17.3332H17.6663C18.2186 17.3332 18.6663 16.8855 18.6663 16.3332V14.3332C18.6663 13.7809 18.2186 13.3332 17.6663 13.3332H2.33301Z'
              fill={`${cardType === 'lineNarrow' ? '#15765B' : '#B5B5B5'}`}
            />
          </svg>
        </div>
        <button
          onClick={() => setOpen(true)}
          className='flex md:hidden items-center outline-none bg-transparent'
        >
          <img src={filterIcon} alt='*' />
          <span className='text-colBlack text-xs font-semibold pt-[2px]'>
            Фильтры
          </span>
        </button>
      </div>
      {isLoading ? (
        <Loading extraStyle='420px' />
      ) : products?.data?.length > 0 ? (
        <>
          {cardType === 'tile' ? (
            <div className='grid grid-cols-2 mm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 ll:grid-cols-4 gap-3 xl:grid-cols-5'>
              {products?.data?.map((el) => (
                <ProductCard key={el?.id} product={el} />
              ))}
            </div>
          ) : cardType === 'line' ? (
            <div className='space-y-4'>
              {products?.data?.map((el) => (
                <ProductCardLine key={el?.id} product={el} />
              ))}
            </div>  
          ) : (
            <div className='space-y-3'>
              {products?.data?.map((el) => (
                <ProductCardLineSmall key={el?.id} product={el} />
              ))}
            </div>
          )}
          {products?.count > 20 && (
            <CustomPagination
              count={products?.count}
              handlePagination={handlePagination}
            />
          )}
        </>
      ) : (
        <ErrorEmpty
          title='Список пуст!'
          desc='К сожалению, по вашему запросу ничего не нашли.'
          height='420px'
        />
      )}
    </div>
  );
};

