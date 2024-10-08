// src/pages/ShoppingCart.js
import { useEffect } from 'react';
import { ShCartDetail, ShLastViews } from '../../components';
import ErrorEmpty from '../../helpers/Errors/ErrorEmpty';
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop';
import { useSelector } from 'react-redux';
import CustomBCrumbs from '../../helpers/BreadCrumbs/CustomBCrumbs';
import { shoppingCart } from '../../constants/breadCrumps';
import { getTokenFromCookies } from '../../helpers/cookies/cookies';
import { useGetUserCartQuery } from '../../redux/api/cartEndpoints';
const ShoppingCart = () => {
  
  const token = getTokenFromCookies();

  const { cart: localCart } = useSelector((state) => state.cart);
  // Fetching cart data from the server if the user is logged in
  const { data: serverCart, isLoading, error } = useGetUserCartQuery(undefined, { skip: !token });
  const cart = token ? serverCart?.data : localCart;

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='content pb-6 lining-nums proportional-nums'>
      <CustomBCrumbs breadCrumps={shoppingCart} />
      <h1 className='block text-2xl md:text-[40px] font-semibold text-colBlack'>Корзина</h1>
      {cart?.length > 0 && <ShCartDetail cart={cart} isLoading={isLoading} />}
      {cart?.length === 0 && <ErrorEmpty
          title='Корзина пуста!'
          desc='Воспользуйтесь поиском, чтобы найти всё, что нужно.'
          height='230px'
        />}
      {/* {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading cart data</p>
      ) : cart?.length ? (
        <ShCartDetail  />
      ) */}
      <ShLastViews />
    </div>
  );
};

export default ShoppingCart;