import { Fragment } from 'react';
import chair from '../../assets/temp-images/chair.png';
import { products } from '../../constants/data';
import ProductCard from '../ProductCard';

const FavDetail = ({favorite}) => {
  console.log(favorite);
  return (
    <div className='pb-10 min-h-[560px] pl-5'>
      <div className='flex items-start space-x-3 pb-4'>
        <button className='h-[44px] outline-none border border-colSuperLight rounded-lg p-[5px] bg-white flex justify-between items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 32 32'
            fill='none'
          >
            <rect width='32' height='32' rx='4' fill='#F5F5F5' />
            <rect x='15' y='7' width='2' height='18' rx='1' fill='#B5B5B5' />
            <rect
              x='25'
              y='15'
              width='2'
              height='18'
              rx='1'
              transform='rotate(90 25 15)'
              fill='#B5B5B5'
            />
          </svg>
          <span className='px-2 text-sm font-medium text-colBlack'>
            Создать список
          </span>
        </button>
        <button className='h-[44px] outline-none border border-colSuperLight rounded-lg p-[5px] bg-white flex justify-between items-center'>
          <img
            className='w-8 h-8 min-w-[32px] rounded object-contain'
            src={chair}
            alt='*'
          />
          <span className='px-2 text-sm font-medium text-colBlack'>Двери</span>
        </button>
        <button className='h-[44px] outline-none border border-colSuperLight rounded-lg p-[5px] bg-white flex justify-between items-center'>
          <img
            className='w-8 h-8 min-w-[32px] rounded object-contain'
            src={chair}
            alt='*'
          />
          <span className='px-2 text-sm font-medium text-colBlack'>
            Столешницы
          </span>
        </button>
      </div>
      <div className='grid grid-cols-5 gap-5'>
        {favorite?.map((el) => (
          <Fragment key={el?.id}>
            <ProductCard product={el} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default FavDetail;
