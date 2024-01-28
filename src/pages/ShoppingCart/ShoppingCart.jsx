import { useEffect } from 'react';
import { ShCartDetail, ShLastViews } from '../../components';
import ErrorEmpty from '../../helpers/Errors/ErrorEmpty';
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop';
import { useOutletContext } from 'react-router-dom';

const ShoppingCart = () => {
  const [cartProducts] = useOutletContext();

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='content pb-6 lining-nums proportional-nums'>
      <h1 className='text-[40px] font-semibold text-colBlack'>Корзина</h1>
      {cartProducts?.length ? (
        <ShCartDetail />
      ) : (
        <ErrorEmpty
          title='Корзина пуста!'
          desc='Воспользуйтесь поиском, чтобы найти всё, что нужно.'
          height='230px'
        />
      )}
      <ShLastViews />
    </div>
  );
};

export default ShoppingCart;
