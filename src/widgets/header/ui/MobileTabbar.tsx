import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

import { useGetUserDataQuery } from '@/entities/user';
import { useModal } from '@/features/modals';
import { useQuantities } from '@/widgets/header';
import activeCartIcon from '@/shared/assets/icons/active-cart.svg';
import activeCatalogIcon from '@/shared/assets/icons/active-catalog.svg';
import activeFavoriteIcon from '@/shared/assets/icons/active-favorite.svg';
import activeHomeIcon from '@/shared/assets/icons/active-home.svg';
import activeProfileIcon from '@/shared/assets/icons/active-profile.svg';
import cartIcon from '@/shared/assets/icons/cart.svg';
import catalogIcon from '@/shared/assets/icons/catalog.svg';
import favoriteIcon from '@/shared/assets/icons/favorite.svg';
import homeIcon from '@/shared/assets/icons/home.svg';
import profileIcon from '@/shared/assets/icons/profile.svg';

export const MobileTabbar = () => {
  const token = useSelector((state) => state?.user?.token);

  const {
    data: user,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetUserDataQuery(undefined, { skip: !token });

  useEffect(() => {
    if (token) {
      refetch(); // refetch the user data when token changes
    }
  }, [token, refetch]);

  const { getFavoritesCount, getComparisonCount, getCartQuantity } =
    useQuantities(token);

  const { showModal } = useModal();

  const { pathname } = useLocation();
  const firstPart = pathname.split('/')[1];

  return (
    <div className="fixed bottom-0 left-0 w-full h-[72px] border-t lg:hidden z-[999] bg-white flex justify-between items-center px-4">
      <NavLink
        to="/"
        className="flex flex-col justify-center items-center cursor-pointer"
      >
        <img src={firstPart === '' ? activeHomeIcon : homeIcon} alt="*" />
        <p className="pt-[2px] text-[10px] sm:text-xs">Главная</p>
      </NavLink>
      <NavLink
        to="/catalog"
        className="flex flex-col justify-center items-center cursor-pointer"
      >
        <img
          src={firstPart === 'catalog' ? activeCatalogIcon : catalogIcon}
          alt="*"
        />
        <p className="pt-[2px] text-[10px] sm:text-xs">Каталог</p>
      </NavLink>
      <NavLink
        to="/favorites"
        className="relative flex flex-col justify-center items-center cursor-pointer"
      >
        <img
          src={firstPart === 'favorites' ? activeFavoriteIcon : favoriteIcon}
          alt="*"
        />
        <p className="pt-[2px] text-[10px] sm:text-xs">Избранное</p>
        {user
          ? getFavoritesCount() > 0 && (
              <span className="absolute -top-2 right-0 bg-colGreen h-5 pb-[2px] min-w-[20px] flex justify-center items-center text-xs text-white rounded-full px-1">
                {!getFavoritesCount() > 99 ? '99+' : getFavoritesCount()}
              </span>
            )
          : getFavoritesCount() > 0 && (
              <span className="absolute -top-2 right-0 bg-colGreen h-5 pb-[2px] min-w-[20px] flex justify-center items-center text-xs text-white rounded-full px-1">
                {!getFavoritesCount() > 99 ? '99+' : getFavoritesCount()}
              </span>
            )}
      </NavLink>
      {token ? (
        <NavLink
          to="/profile"
          className="flex flex-col justify-center items-center cursor-pointer"
        >
          <img
            src={firstPart === 'profile' ? activeProfileIcon : profileIcon}
            alt="*"
          />
          <p className="pt-[2px] text-[10px] sm:text-xs">Профиль</p>
        </NavLink>
      ) : null}
      {!token ? (
        <button
          onClick={() => {
            showModal({ type: 'auth', content: 'checkAuth', from: location });
          }}
          className="flex flex-col justify-center items-center cursor-pointer bg-transparent outline-none"
        >
          <img
            src={firstPart === 'profile' ? activeProfileIcon : profileIcon}
            alt="*"
          />
          <p className="pt-[2px] text-[10px] sm:text-xs">Профиль</p>
        </button>
      ) : null}
      <NavLink
        to="/shopping-cart"
        className="relative flex flex-col justify-center items-center cursor-pointer"
      >
        <img
          src={firstPart === 'shopping-cart' ? activeCartIcon : cartIcon}
          alt="*"
        />
        <p className="pt-[2px] text-[10px] sm:text-xs">Корзина</p>
        {getCartQuantity() > 0 ? (
          <span className="absolute -top-2 right-0 bg-colGreen h-5 pb-[2px] min-w-[20px] flex justify-center items-center text-xs text-white rounded-full px-1">
            {!getCartQuantity() > 99 ? '99+' : getCartQuantity()}
          </span>
        ) : null}
      </NavLink>
    </div>
  );
};