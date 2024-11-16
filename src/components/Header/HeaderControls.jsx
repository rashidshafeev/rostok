import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import order from '../../assets/icons/order.svg';
import favoriteIcon from '../../assets/icons/favorite.svg';
import comparisonIcon from '../../assets/icons/comparison.svg';


import { useEffect, useState } from 'react';
import LoginButton from './HeaderControls/LoginButton';
import ProfileButton from './HeaderControls/ProfileButton';
import CartButton from './HeaderControls/CartButton';
import { useGetUserDataQuery } from '../../redux/api/userEndpoints';
import { useGetFavoritesQuery } from '../../redux/api/favoritesEndpoints';


function HeaderControls() {
  const token = useSelector((state) => state.user.token);
  
  const favorite = useSelector((state) => state?.favorite?.favorite);
  const comparison = useSelector((state) => state?.comparison?.comparison);
  const cart = useSelector((state) => state?.cart);

  const { data: user, isLoading, isFetching, isError, refetch } = useGetUserDataQuery(undefined, { skip: !token });

  useEffect(() => {
    if (token) {
      refetch(); // refetch the user data when token changes
    }
  }, [token, refetch]);

  const getFavoritesCount = () => {
    // return (favorite.length || 0);
    return user ? user?.favorites?.items_count : (favorite?.length || 0);
  };

  const getComparisonCount = () => {
    // return (comparison.length || 0);
    return user ? user?.comparison?.items_count : (comparison?.length || 0);
  };

  const getCartQuantity = () => {
    // return (cart.itemsQuantity || 0);
    return user ? user?.cart?.quantity : (cart.total?.quantity || 0);
  };



  return (
    <div className='hidden lg:flex justify-between space-x-4'>
      <NavLink
          to='/profile/orders'
          className='text-center flex flex-col justify-between items-center'
        >
          <img className='mx-auto' src={order} alt='*' />
          <span className='text-xs pt-1 font-medium text-colBlack'>Заказы</span>
        </NavLink>
      <NavLink
        to='/comparison'
        className='relative text-center flex flex-col justify-between items-center'
      >
        <img className='mx-auto' src={comparisonIcon} alt='*' />
        <span className='text-xs pt-1 font-medium text-colBlack'>
          Сравнение
        </span>
        {getComparisonCount() > 0 && (
          <span className='absolute -top-2 right-0 bg-colGreen h-5  min-w-[20px] flex justify-center items-center text-xs text-white rounded-full px-1 -z-10 lining-nums proportional-nums'>
            {getComparisonCount() > 99 ? '99+' : getComparisonCount()}
          </span>
        )}
      </NavLink>
      <NavLink
        to='/favorites'
        className='relative text-center flex flex-col justify-between items-center'
      >
        <img className='mx-auto' src={favoriteIcon} alt='*' />
        <span className='text-xs pt-1 font-medium text-colBlack'>
          Избранное
        </span>
        {getFavoritesCount() > 0 && (
          <span className='absolute -top-2 right-0 bg-colGreen h-5 pb-[2px] min-w-[20px] flex justify-center items-center text-xs text-white rounded-full px-1 -z-10'>
            {getFavoritesCount() > 99 ? '99+' : getFavoritesCount()}
          </span>
        )}
      </NavLink>
          <CartButton getCartQuantity={getCartQuantity}/>
      {!isLoading && user?.success ? (
        <ProfileButton name={user?.user?.name} />
      ) : (
        <LoginButton />
      )}
    </div>
  );
}

export default HeaderControls;
