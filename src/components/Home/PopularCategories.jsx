import { NavLink } from 'react-router-dom';
import { popularCategories } from '../../constants/data';

const PopularCategories = () => {
  return (
    <div className='pb-10'>
      <h1 className='text-colBlack text-2xl mm:text-4xl font-semibold pb-4'>
        Популярные категории
      </h1>
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5'>
        {popularCategories?.map((el) => (
          <NavLink
            to={`/catalog/${el?.slug}`}
            key={el?.id}
            className='p-3 mm:p-5 relative bg-colSuperLight rounded-md md:rounded-[20px] h-[150px] mm:h-[240px] flex flex-col justify-between'
          >
            <div className='md:absolute md:right-5 md:top-1/2 md:-translate-y-1/2 z-0 max-w-[160px] overflow-hidden mx-auto'>
              <img
                className='w-full h-full object-contain'
                src={el?.img}
                alt='*'
              />
            </div>
            <div className='flex flex-col justify-between md:h-full z-10 relative -order-1 md:order-1 pb-3 md:pb-0'>
              <h2 className='text-sm mm:text-xl leading-[120%] font-semibold text-colBlack text-center md:text-left'>
                {el?.title}
              </h2>
              <div className='hidden md:flex flex-wrap text-colDarkGray text-xs font-semibold'>
                {el?.items?.slice(0, 4)?.map((item, index) => (
                  <div
                    className='px-2 py-1 bg-white rounded-[20px] mr-2 mb-2'
                    key={index}
                  >
                    {item}
                  </div>
                ))}
                {el?.items?.length > 4 && (
                  <div className='px-2 py-1 bg-white rounded-[20px] mr-2 mb-2 text-colGreen'>
                    Все категории
                  </div>
                )}
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
