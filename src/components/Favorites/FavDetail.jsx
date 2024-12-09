import ProductCard from '../ProductCard/ProductCard';
import filterIcon from '@assets/icons/filter.svg';

const FavDetail = ({ favorite, user }) => {
  
  return (
    <div className={`${user && 'md:pl-5'} pb-10 min-h-[560px] w-full`}>
      <button className='flex md:hidden items-center ml-auto outline-none bg-transparent mt-4 md:mt-0'>
        <img src={filterIcon} alt='*' />
        <span className='text-colBlack text-xs font-medium pt-[2px]'>
          Фильтры
        </span>
      </button>
      <div
        className={`${
          user
            ? 'grid-cols-2 mm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 ll:grid-cols-4 xl:grid-cols-5'
            : 'grid-cols-2 mm:grid-cols-3 lg:grid-cols-4 ll:grid-cols-5 xl:grid-cols-6'
        } grid gap-3 pt-4`}
      >
        {favorite?.map((el) => (
          <ProductCard key={el?.id} product={el} />
        ))}
      </div>
    </div>
  );
};

export default FavDetail;
