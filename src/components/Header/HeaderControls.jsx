import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import order from '../../assets/icons/order.svg';
import favoriteIcon from '../../assets/icons/favorite.svg';
import comparisonIcon from '../../assets/icons/comparison.svg';


import { useEffect, useState } from 'react';
import LoginButton from './HeaderControls/LoginButton';
import ProfileButton from './HeaderControls/ProfileButton';
import CartButton from './HeaderControls/CartButton';
import { useGetFavoritesQuery } from '../../redux/api/favoritesEndpoints';
import { useGetUserDataQuery } from '../../redux/api/userEndpoints';


function HeaderControls({ setContent, setOpen }) {
  const { token } = useSelector((state) => state.user);
  console.log('token in header:', token);

  const favorite = useSelector((state) => state?.favorite?.favorite);
  const comparison = useSelector((state) => state?.comparison?.comparison);
  
  const { data: favorites } = useGetFavoritesQuery();
  const { data: user, isLoading, isFetching, isError, refetch } = useGetUserDataQuery(undefined, { skip: !token });

  console.log('rerender');
  console.log('user', user);

  
  useEffect(() => {
    if (token) {
      refetch(); // refetch the user data when token changes
    }
  }, [token, refetch]);



  return (
    <div className='hidden lg:flex justify-between space-x-4'>
      {/* {token} */}
      {user ? (
        <NavLink
          to='/profile/orders'
          className='text-center flex flex-col justify-between items-center'
        >
          <img className='mx-auto' src={order} alt='*' />
          <span className='text-xs pt-1 font-medium text-colBlack'>Заказы</span>
        </NavLink>
      ) : (
        <button
          onClick={() => {
            setContent('checkAuth');
            setOpen(true);
          }}
          className='text-center flex flex-col justify-between items-center outline-none'
        >
          <img className='mx-auto' src={order} alt='*' />
          <span className='text-xs pt-1 font-medium text-colBlack'>Заказы</span>
        </button>
      )}
      <NavLink
        to='/comparison'
        className='relative text-center flex flex-col justify-between items-center'
      >
        <img className='mx-auto' src={comparisonIcon} alt='*' />
        <span className='text-xs pt-1 font-medium text-colBlack'>
          Сравнение
        </span>
        {comparison.length > 0 && (
          <span className='absolute -top-2 right-0 bg-colGreen h-5 pb-[2px] min-w-[20px] flex justify-center items-center text-xs text-white rounded-full px-1'>
            {!comparison.length > 99 ? '99+' : comparison.length}
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
        {user
          ? favorites?.data?.length > 0 && (
            <span className='absolute -top-2 right-0 bg-colGreen h-5 pb-[2px] min-w-[20px] flex justify-center items-center text-xs text-white rounded-full px-1'>
              {!favorites?.data?.length > 99
                ? '99+'
                : favorites?.data?.length}
            </span>
          )
          : favorite.length > 0 && (
            <span className='absolute -top-2 right-0 bg-colGreen h-5 pb-[2px] min-w-[20px] flex justify-center items-center text-xs text-white rounded-full px-1'>
              {!favorite.length > 99 ? '99+' : favorite.length}
            </span>
          )}
      </NavLink>
          <CartButton/>
      {!isLoading && user?.success ? (
        <ProfileButton name={user?.user?.name} />
      ) : (
        <LoginButton setContent={setContent} setOpen={setOpen} />
      )}
    </div>
  );
}

export default HeaderControls;
