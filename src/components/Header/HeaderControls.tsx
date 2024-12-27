import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { useGetUserDataQuery } from '@/features/auth';
import comparisonIcon from '@/shared/assets/icons/comparison.svg';
import favoriteIcon from '@/shared/assets/icons/favorite-black.svg';
import order from '@/shared/assets/icons/order.svg';
import { useQuantities } from '@hooks/useQuantities';

import CartButton from './HeaderControls/CartButton';
import LoginButton from './HeaderControls/LoginButton';
import ProfileButton from './HeaderControls/ProfileButton';

function HeaderControls() {
  const token = useSelector((state) => state.user.token);

  const {
    data: user,
    isLoading,
    refetch,
  } = useGetUserDataQuery(undefined, { skip: !token });

  const { getFavoritesCount, getComparisonCount, getCartQuantity } =
    useQuantities(token);

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token, refetch]);

  return (
    <div className="hidden lg:flex justify-between space-x-4">
      <NavLink
        to="/profile/orders"
        className="text-center flex flex-col justify-between items-center"
      >
        <img className="mx-auto" src={order} alt="*" />
        <span className="text-xs pt-1 font-medium text-colBlack">Заказы</span>
      </NavLink>
      <NavLink
        to="/comparison"
        className="relative text-center flex flex-col justify-between items-center"
      >
        <img className="mx-auto" src={comparisonIcon} alt="*" />
        <span className="text-xs pt-1 font-medium text-colBlack">
          Сравнение
        </span>
        {getComparisonCount() > 0 ? (
          <span className="absolute -top-2 right-0 bg-colGreen h-5  min-w-[20px] flex justify-center items-center text-xs text-white rounded-full px-1 -z-10 lining-nums proportional-nums">
            {getComparisonCount() > 99 ? '99+' : getComparisonCount()}
          </span>
        ) : null}
      </NavLink>
      <NavLink
        to="/favorites"
        className="relative text-center flex flex-col justify-between items-center"
      >
        <img className="mx-auto" src={favoriteIcon} alt="*" />
        <span className="text-xs pt-1 font-medium text-colBlack">
          Избранное
        </span>
        {getFavoritesCount() > 0 ? (
          <span className="absolute -top-2 right-0 bg-colGreen h-5 pb-[2px] min-w-[20px] flex justify-center items-center text-xs text-white rounded-full px-1 -z-10">
            {getFavoritesCount() > 99 ? '99+' : getFavoritesCount()}
          </span>
        ) : null}
      </NavLink>
      <CartButton getCartQuantity={getCartQuantity} />
      {!isLoading && user?.success ? (
        <ProfileButton name={user?.user?.name} />
      ) : (
        <LoginButton />
      )}
    </div>
  );
}

export default HeaderControls;
