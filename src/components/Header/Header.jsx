import { NavLink } from 'react-router-dom';
import address from '../../assets/icons/address.svg';
import logo from '../../assets/images/logo.svg';

const Header = () => {
  return (
    <header className='content mx-auto py-2'>
      <div className='flex justify-between items-center space-x-5'>
        <div className='flex items-center'>
          <img src={address} alt='*' />
          <span className='text-[#222] text-xs font-semibold ml-1'>Москва</span>
        </div>
        <ul className='flex justify-end items-center space-x-3'>
          <li>
            <NavLink to='#' className='text-darkGray text-sm font-semibold'>
              Оплата и доставка
            </NavLink>
          </li>
          <li>
            <NavLink to='#' className='text-darkGray text-sm font-semibold'>
              Гарантия и возврат
            </NavLink>
          </li>
          <li>
            <NavLink to='#' className='text-darkGray text-sm font-semibold'>
              Оптовым клиентам
            </NavLink>
          </li>
          <li>
            <NavLink to='#' className='text-darkGray text-sm font-semibold'>
              Контакты
            </NavLink>
          </li>
          <li>
            <NavLink to='#' className='text-darkGray text-sm font-semibold'>
              О компании
            </NavLink>
          </li>
          <li>
            <NavLink
              to='#'
              className='text-darkGray text-sm font-semibold border-b border-darkGray pb-[1px]'
            >
              Есть вопросы?
            </NavLink>
          </li>
        </ul>
      </div>
      <div className='flex justify-between items-center'>
        <NavLink to='/'>
          <img src={logo} alt='logo' />
        </NavLink>
        <div className='bg-colGreen text-white flex justify-center items-center max-w-[140px] w-full min-h-[40px] rounded-[4px]'>
          <div className='flex flex-col justify-between space-y-1'>
            <span className='min-w-[16px] w-4 h-[2px] rounded-md bg-white'></span>
            <span className='min-w-[16px] w-4 h-[2px] rounded-md bg-white'></span>
            <span className='min-w-[16px] w-4 h-[2px] rounded-md bg-white'></span>
          </div>
          <span className='ml-1'>Каталог</span>
        </div>
        <div></div>
        <div></div>
      </div>
    </header>
  );
};

export default Header;
