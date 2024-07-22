import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import AuthModal from '../../helpers/CModal/AuthModal';
import { useState } from 'react';
import homeIcon from '../../assets/icons/mobile-navbar/home.svg';
import catalogIcon from '../../assets/icons/mobile-navbar/catalog.svg';
import favoriteIcon from '../../assets/icons/mobile-navbar/favorite.svg';
import profileIcon from '../../assets/icons/mobile-navbar/profile.svg';
import cartIcon from '../../assets/icons/mobile-navbar/cart.svg';
import activeHomeIcon from '../../assets/icons/mobile-navbar/active-home.svg';
import activeCatalogIcon from '../../assets/icons/mobile-navbar/active-catalog.svg';
import activeFavoriteIcon from '../../assets/icons/mobile-navbar/active-favorite.svg';
import activeProfileIcon from '../../assets/icons/mobile-navbar/active-profile.svg';
import activeCartIcon from '../../assets/icons/mobile-navbar/active-cart.svg';
import { useGetFavoritesQuery } from '../../redux/api/favoritesEndpoints';
import AuthModal from '../../helpers/CModal/AuthModal/AuthModal';

const MobileNavbar = () => {
  const { data: favorites } = useGetFavoritesQuery();

  const { user } = useSelector((state) => state?.user);
  const itemsQuantity = useSelector((state) => state?.cart?.itemsQuantity);
  const favorite = useSelector((state) => state?.favorite?.favorite);

  const [content, setContent] = useState('');
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();
  const firstPart = pathname.split('/')[1];

  return (
    <>
      <div className='fixed bottom-0 left-0 w-full h-[72px] border-t lg:hidden z-[999] bg-white flex justify-between items-center px-4'>
        <NavLink
          to='/'
          className='flex flex-col justify-center items-center cursor-pointer'
        >
          <img src={firstPart === '' ? activeHomeIcon : homeIcon} alt='*' />
          <p className='pt-[2px] text-[10px] sm:text-xs'>Главная</p>
        </NavLink>
        <NavLink
          to='/catalog'
          className='flex flex-col justify-center items-center cursor-pointer'
        >
          <img
            src={firstPart === 'catalog' ? activeCatalogIcon : catalogIcon}
            alt='*'
          />
          <p className='pt-[2px] text-[10px] sm:text-xs'>Каталог</p>
        </NavLink>
        <NavLink
          to='/favorites'
          className='relative flex flex-col justify-center items-center cursor-pointer'
        >
          <img
            src={firstPart === 'favorites' ? activeFavoriteIcon : favoriteIcon}
            alt='*'
          />
          <p className='pt-[2px] text-[10px] sm:text-xs'>Избранное</p>
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
        {user ? (
          <NavLink
            to={`${
              window.innerWidth < 576 ? '/profile' : '/profile/personal-data'
            }`}
            className='flex flex-col justify-center items-center cursor-pointer'
          >
            <img
              src={firstPart === 'profile' ? activeProfileIcon : profileIcon}
              alt='*'
            />
            <p className='pt-[2px] text-[10px] sm:text-xs'>Профиль</p>
          </NavLink>
        ) : (
          <button
            onClick={() => {
              setContent('checkAuth');
              setOpen(true);
            }}
            className='flex flex-col justify-center items-center cursor-pointer bg-transparent outline-none'
          >
            <img
              src={firstPart === 'profile' ? activeProfileIcon : profileIcon}
              alt='*'
            />
            <p className='pt-[2px] text-[10px] sm:text-xs'>Профиль</p>
          </button>
        )}
        <NavLink
          to='/shopping-cart'
          className='relative flex flex-col justify-center items-center cursor-pointer'
        >
          <img
            src={firstPart === 'shopping-cart' ? activeCartIcon : cartIcon}
            alt='*'
          />
          <p className='pt-[2px] text-[10px] sm:text-xs'>Корзина</p>
          {itemsQuantity > 0 && (
            <span className='absolute -top-2 right-0 bg-colGreen h-5 pb-[2px] min-w-[20px] flex justify-center items-center text-xs text-white rounded-full px-1'>
              {!itemsQuantity > 99 ? '99+' : itemsQuantity}
            </span>
          )}
        </NavLink>
      </div>
      <AuthModal
        open={open}
        setOpen={setOpen}
        content={content}
        setContent={setContent}
      />
    </>
  );
};

export default MobileNavbar;
