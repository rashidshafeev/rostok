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
import { NavLink, useLocation } from 'react-router-dom';

const MobileNavbar = () => {
  const { pathname } = useLocation();
  const firstPart = pathname.split('/')[1];

  return (
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
        className='flex flex-col justify-center items-center cursor-pointer'
      >
        <img
          src={firstPart === 'favorites' ? activeFavoriteIcon : favoriteIcon}
          alt='*'
        />
        <p className='pt-[2px] text-[10px] sm:text-xs'>Избранное</p>
      </NavLink>
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
      <NavLink
        to='/shopping-cart'
        className='flex flex-col justify-center items-center cursor-pointer'
      >
        <img
          src={firstPart === 'shopping-cart' ? activeCartIcon : cartIcon}
          alt='*'
        />
        <p className='pt-[2px] text-[10px] sm:text-xs'>Корзина</p>
      </NavLink>
    </div>
  );
};

export default MobileNavbar;
