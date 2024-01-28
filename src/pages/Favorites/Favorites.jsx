import { useEffect } from 'react';
import ErrorEmpty from '../../helpers/Errors/ErrorEmpty';
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop';

const Favorites = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='content pb-6'>
      <h1 className='text-[40px] font-semibold text-colBlack'>Избранное</h1>
      <ErrorEmpty
        title='Еще не готовы к покупке?'
        desc='Добавляйте понравившийся товар в избранное, чтобы не потерять его.'
        height='420px'
      />
    </div>
  );
};

export default Favorites;
