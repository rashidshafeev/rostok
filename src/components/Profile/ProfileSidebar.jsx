import { NavLink } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';

const ProfileSidebar = () => {
  
  const { showModal } = useModal();

  return (
    <div className='max-w-[220px] w-full hidden mm:block'>
      <h4 className='font-semibold text-colBlack'>Профиль</h4>
      <ul className='pl-3 pt-1 space-y-1'>
        <li>
          <NavLink
            className='text-colBlack text-sm px-2 py-[2px] rounded-md aria-[current=page]:bg-[#EBEBEB]'
            to='/profile/personal-data'
          >
            Личные данные
          </NavLink>
        </li>
        <li>
          <NavLink
            className='text-colBlack text-sm px-2 py-[2px] rounded-md aria-[current=page]:bg-[#EBEBEB]'
            to='/profile/organizations'
          >
            Мои организации
          </NavLink>
        </li>
        <li>
          <NavLink
            className='text-colBlack text-sm px-2 py-[2px] rounded-md aria-[current=page]:bg-[#EBEBEB]'
            to='/profile/change-password'
          >
            Изменить пароль
          </NavLink>
        </li>
      </ul>
      <h4 className='font-semibold text-colBlack pt-3'>Заказы</h4>
      <ul className='pl-3 pt-1 space-y-1'>
        <li>
          <NavLink
            className='text-colBlack text-sm px-2 py-[2px] rounded-md aria-[current=page]:bg-[#EBEBEB]'
            to='/profile/orders'
          >
            Все заказы
          </NavLink>
        </li>
      </ul>
      <button
        onClick={() => showModal({ type: 'logout' })}
        className='text-colDarkGray font-semibold mt-8 mb-2'
      >
        Выйти из профиля
      </button>
      <button className='text-colDarkGray font-semibold'>
        Удалить профиль
      </button>
    </div>
  );
};

export default ProfileSidebar;
