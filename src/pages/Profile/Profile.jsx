import { useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { scrollToTop } from '@/shared/lib/scrollToTop';
import arrowIcon from '@/shared/assets/icons/arrow-icon.svg';
import { Breadcrumbs } from '@/widgets/breadcrumbs';;
import { useModal } from '@/features/modals/model/context';
import ProfileSidebar from "@components/Profile/ProfileSidebar";

const Profile = () => {

  const { showModal } = useModal()

  const { pathname } = useLocation();
  const secondUrl = pathname.split('/')[2];
  
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='content min-h-[520px]'>
      <Breadcrumbs/>
      <h1
        className={`${
          pathname === '/profile' ? 'block' : 'hidden mm:block'
        } text-2xl md:text-[40px] font-semibold text-colBlack`}
      >
        Мой профиль
      </h1>
      <div className='flex pt-2 mm:pt-5'>
        <ProfileSidebar
        />
        <Outlet />
      </div>
      <div
        className={`${
          pathname === '/profile' ? 'block' : 'hidden'
        } w-full pt-3 mm:hidden`}
      >
        <ul className='space-y-4'>
          <li>
            <NavLink
              className='flex justify-between items-center border-b pb-1'
              to='/profile/personal-data'
            >
              <span className='font-semibold text-colBlack'>Личные данные</span>
              <img className='rotate-180' src={arrowIcon} alt='*' />
            </NavLink>
          </li>
          <li>
            <NavLink
              className='flex justify-between items-center border-b pb-1'
              to='/profile/organizations'
            >
              <span className='font-semibold text-colBlack'>
                Мои организации
              </span>
              <img className='rotate-180' src={arrowIcon} alt='*' />
            </NavLink>
          </li>
          <li>
            <NavLink
              className='flex justify-between items-center border-b pb-1'
              to='/profile/change-password'
            >
              <span className='font-semibold text-colBlack'>
                Изменить пароль
              </span>
              <img className='rotate-180' src={arrowIcon} alt='*' />
            </NavLink>
          </li>
          <li>
            <NavLink
              className='flex justify-between items-center border-b pb-1'
              to='/profile/orders'
            >
              <span className='font-semibold text-colBlack'>Мои заказы</span>
              <img className='rotate-180' src={arrowIcon} alt='*' />
            </NavLink>
          </li>
          <li>
            <NavLink
              className='flex justify-between items-center border-b pb-1'
              to='/comparison'
            >
              <span className='font-semibold text-colBlack'>
                Сравнение товаров
              </span>
              <img className='rotate-180' src={arrowIcon} alt='*' />
            </NavLink>
          </li>
          <li>
            <NavLink
              className='flex justify-between items-center border-b pb-1'
              to='/favorites'
            >
              <span className='font-semibold text-colBlack'>Избранное</span>
              <img className='rotate-180' src={arrowIcon} alt='*' />
            </NavLink>
          </li>
        </ul>
        <div className='flex flex-col items-start'>
          <button
            onClick={() => {
              // setContent('logout');
              // setOpen(true);
              showModal({ type: 'logout' });
            }}
            className='text-colDarkGray font-semibold mt-8 mb-2'
          >
            Выйти из профиля
          </button>
          <button className='text-colDarkGray font-semibold'>
            Удалить профиль
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
