import { useEffect } from 'react';
import { ShCartDetail, ShLastViews } from '../../components';
import ErrorEmpty from '../../helpers/Errors/ErrorEmpty';
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop';
import { useSelector } from 'react-redux';
import CustomBCrumbs from '../../helpers/BreadCrumbs/CustomBCrumbs';
import { shoppingCart } from '../../constants/breadCrumps';

const ShoppingCart = () => {
  const cart = useSelector((state) => state?.cart?.cart);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='content pb-6 lining-nums proportional-nums'>
      <CustomBCrumbs breadCrumps={shoppingCart} />
      <h1 className='block text-2xl md:text-[40px] font-semibold text-colBlack'>Корзина</h1>
      {cart?.length ? (
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
