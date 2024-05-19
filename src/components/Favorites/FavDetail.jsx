import { Fragment } from 'react';
import ProductCard from '../ProductCard';
import filterIcon from '../../assets/icons/filter.svg';

const FavDetail = ({ favorite, user }) => {
  return (
    <div className={`${user && 'md:pl-5'} pb-10 min-h-[560px]`}>
      <button className='flex md:hidden items-center ml-auto outline-none bg-transparent mt-4 md:mt-0'>
        <img src={filterIcon} alt='*' />
        <span className='text-colBlack text-xs font-medium pt-[2px]'>
          Фильтры
        </span>
      </button>
      <div
        className={`${
          user && 'md:grid-cols-2'
        } grid grid-cols-2 mm:grid-cols-3 lg:grid-cols-3 ll:grid-cols-4 gap-3 xl:grid-cols-5 pt-4`}
      >
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
