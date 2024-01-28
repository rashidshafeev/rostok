import { ShCartDetail, ShLastViews } from '../../components';
import ErrorEmpty from '../../helpers/Errors/ErrorEmpty';

const ShoppingCart = () => {
  const cart = localStorage.getItem('cart');

  return (
    <div className='content pb-6'>
      <h1 className='text-[40px] font-semibold text-colBlack'>Корзина</h1>
      {cart ? (
        <ShCartDetail cart={cart} />
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
