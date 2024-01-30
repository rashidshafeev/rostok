import { useEffect } from 'react';
import ErrorEmpty from '../../helpers/Errors/ErrorEmpty';
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop';
import { FavDetail, FavSidebar } from '../../components';

const Favorites = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  const favItems = [];

  return (
    <div className='content pb-6'>
      <h1 className='text-[40px] font-semibold text-colBlack'>Избранное</h1>
      {!favItems?.length ? (
        <div className='flex pt-2'>
          <FavSidebar />
          <FavDetail />
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
