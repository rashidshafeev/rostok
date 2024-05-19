import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ErrorEmpty from '../../helpers/Errors/ErrorEmpty';
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop';
import { FavDetail, FavSidebar } from '../../components';
import chair from '../../assets/temp-images/chair.png';
import { useGetFavoritesQuery } from '../../redux/api/api';

const Favorites = () => {
  const favorite = useSelector((state) => state?.favorite?.favorite);
  const { user } = useSelector((state) => state?.user);
  const { data } = useGetFavoritesQuery();

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='content pb-6'>
      <h1 className='font-semibold text-2xl md:text-3xl lg:text-[40px] text-colBlack pt-3'>
        Избранное
      </h1>
      {user && data?.data?.length > 0 && (
        <div className={`${user && 'md:pl-[240px]'}`}>
          <div className='flex items-center space-x-2 mm:space-x-3 overflow-x-scroll hide-scrollable pt-3 md:pt-6 w-full'>
            <button className='min-h-10 mm:min-h-[44px] outline-none border border-colSuperLight rounded-lg p-[5px] bg-white flex justify-between items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='32'
                height='32'
                viewBox='0 0 32 32'
                fill='none'
              >
                <rect width='32' height='32' rx='4' fill='#F5F5F5' />
                <rect
                  x='15'
                  y='7'
                  width='2'
                  height='18'
                  rx='1'
                  fill='#B5B5B5'
                />
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
              <span className='px-2 text-sm font-medium text-colBlack whitespace-nowrap'>
                Создать список
              </span>
            </button>
            <button className='min-h-10 mm:min-h-[44px] outline-none border border-colSuperLight rounded-lg p-[5px] bg-white flex justify-between items-center'>
              <img
                className='w-8 h-8 min-w-[32px] rounded object-contain'
                src={chair}
                alt='*'
              />
              <span className='px-2 text-sm font-medium text-colBlack whitespace-nowrap'>
                Двери
              </span>
            </button>
            <button className='min-h-10 mm:min-h-[44px] outline-none border border-colSuperLight rounded-lg p-[5px] bg-white flex justify-between items-center'>
              <img
                className='w-8 h-8 min-w-[32px] rounded object-contain'
                src={chair}
                alt='*'
              />
              <span className='px-2 text-sm font-medium text-colBlack whitespace-nowrap'>
                Столешницы
              </span>
            </button>
          </div>
        </div>
      )}
      {user ? (
        data?.data?.length > 0 ? (
          <div className='md:flex'>
            <FavSidebar />
            <FavDetail favorite={data?.data} user={user} />
          </div>
        ) : (
          <ErrorEmpty
            title='Еще не готовы к покупке?'
            desc='Добавляйте понравившийся товар в избранное, чтобы не потерять его.'
            height='420px'
          />
        )
      ) : favorite?.length > 0 ? (
        <div className='md:flex'>
          <FavDetail favorite={favorite} user={user} />
        </div>
      ) : (
        <ErrorEmpty
          title='Еще не готовы к покупке?'
          desc='Добавляйте понравившийся товар в избранное, чтобы не потерять его.'
          height='420px'
        />
      )}
    </div>
  );
};

export default Favorites;
