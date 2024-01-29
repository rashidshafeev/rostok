import { useEffect } from 'react';
import ErrorEmpty from '../../helpers/Errors/ErrorEmpty';
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop';
import { FavSidebar } from '../../components';
import { Outlet, useOutletContext } from 'react-router-dom';

const Favorites = () => {
  const [cartProducts, addToCart] = useOutletContext();

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
          <Outlet context={[cartProducts, addToCart]} />
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
