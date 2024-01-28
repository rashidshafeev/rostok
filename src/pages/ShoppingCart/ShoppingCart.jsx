import { useEffect, useState } from 'react';
import { ShCartDetail, ShLastViews } from '../../components';
import ErrorEmpty from '../../helpers/Errors/ErrorEmpty';
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop';

const ShoppingCart = () => {
  const [cartProducts, setCartProducts] = useState([]);

  const removeFromCart = (id) => {
    var cartData = localStorage.getItem('cart');
    var cartArray = cartData ? JSON.parse(cartData) : [];
    var updatedCart = cartArray?.filter((product) => product?.id !== id);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartProducts(updatedCart);
  };

  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    const cartArray = cartData ? JSON.parse(cartData) : [];
    setCartProducts(cartArray);
    scrollToTop();
  }, []);

  return (
    <div className='content pb-6 lining-nums proportional-nums'>
      <h1 className='text-[40px] font-semibold text-colBlack'>Корзина</h1>
      {cartProducts?.length ? (
        <ShCartDetail products={cartProducts} removeFromCart={removeFromCart} />
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
