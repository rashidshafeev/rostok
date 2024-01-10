import { NavLink } from 'react-router-dom';
import { popularCategories } from '../../constants/data';

const PopularCategories = () => {
  return (
    <div className='pb-10'>
      <h1 className='text-colBlack text-4xl font-semibold pb-4'>
        Популярные категории
      </h1>
      <div className='grid grid-cols-3 gap-5'>
        {popularCategories?.map((el) => (
          <NavLink
            to='#'
            key={el?.id}
            className='p-5 relative bg-[#F5F5F5] rounded-[20px] min-h-[240px]'
          >
            <div className='absolute right-5 top-1/2 -translate-y-1/2 z-0 max-w-[160px] overflow-hidden'>
              <img
                className='w-full h-full object-contain'
                src={el?.img}
                alt='*'
              />
            </div>
            <div className='flex flex-col justify-between h-full z-10 relative'>
              <h2 className='text-xl font-semibold text-colBlack'>
                {el?.title}
              </h2>
              <div className='flex flex-wrap text-colDarkGray text-xs font-semibold'>
                {el?.items?.map((item, index) => (
                  <span
                    className='px-2 py-1 bg-white rounded-[20px] mr-2 mb-2'
                    key={index}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
