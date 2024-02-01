import { NavLink } from 'react-router-dom';
import noImg from '../../../assets/images/no-image.png';

const CatMainContent = ({ catalog }) => {
  return (
    <div className='pl-6'>
      <div className='grid grid-cols-3 gap-4'>
        {catalog?.map((el) => (
          <div
            key={el?.id}
            className='p-5 relative bg-colSuperLight rounded-[20px] min-h-[240px]'
          >
            <div className='absolute right-5 top-1/2 -translate-y-1/2 z-0 max-w-[160px] overflow-hidden'>
              <img
                className='w-full h-full object-contain'
                src=''
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = noImg;
                }}
                alt='*'
              />
            </div>
            <div className='flex flex-col justify-between h-full z-10 relative'>
              <NavLink className='text-xl hover:underline font-semibold text-colBlack'>
                {el?.name}
              </NavLink>
              {el?.children?.length && (
                <div className='flex flex-wrap text-colDarkGray text-xs font-semibold'>
                  {el?.children?.slice(0, 4)?.map((item) => (
                    <NavLink
                      to='#'
                      className='px-2 py-1 bg-white rounded-[20px] mr-2 mb-2'
                      key={item?.id}
                    >
                      {item?.name}
                    </NavLink>
                  ))}
                  {el?.children?.length > 4 && (
                    <NavLink
                      to='#'
                      className='px-2 py-1 bg-white rounded-[20px] mr-2 mb-2 text-colGreen'
                    >
                      Все категории
                    </NavLink>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatMainContent;
