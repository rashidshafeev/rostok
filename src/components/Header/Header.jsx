import { NavLink } from 'react-router-dom';
import address from '../../assets/icons/address.svg';
import logo from '../../assets/images/logo.svg';
import search from '../../assets/icons/search.svg';
import order from '../../assets/icons/order.svg';
import cart from '../../assets/icons/cart.svg';
import favorite from '../../assets/icons/favorite.svg';
import comparison from '../../assets/icons/comparison.svg';
import profile from '../../assets/icons/profile.svg';
import action from '../../assets/icons/action.svg';
import sales from '../../assets/icons/sales.svg';
import news from '../../assets/icons/news.svg';

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
      <div className='flex justify-between items-center py-4 space-x-5'>
        <NavLink className='min-w-[90px]' to='/'>
          <img src={logo} alt='logo' />
        </NavLink>
        <button className='bg-colGreen text-white flex justify-center items-center max-w-[140px] w-full min-h-[40px] rounded-[4px]'>
          <div className='flex flex-col justify-between space-y-1'>
            <span className='min-w-[16px] w-4 h-[2px] rounded-lg bg-white'></span>
            <span className='min-w-[16px] w-4 h-[2px] rounded-lg bg-white'></span>
            <span className='min-w-[16px] w-4 h-[2px] rounded-lg bg-white'></span>
          </div>
          <span className='ml-2'>Каталог</span>
        </button>
        <form
          onSubmit={(e) => e.preventDefault()}
          className='max-w-[780px] w-full border-colGreen border rounded-md flex justify-between'
        >
          <input
            className='w-full h-10 outline-none rounded-md bg-white px-3'
            type='search'
            placeholder='Поиск по сайту'
          />
          <button className='bg-colGreen w-14'>
            <img className='mx-auto' src={search} alt='*' />
          </button>
        </form>
        <div className='flex justify-between space-x-4'>
          <NavLink
            to='#'
            className='text-center flex flex-col justify-between items-center'
          >
            <img className='mx-auto' src={order} alt='*' />
            <span className='text-xs pt-1 font-medium text-[#222]'>Заказы</span>
          </NavLink>
          <NavLink
            to='#'
            className='text-center flex flex-col justify-between items-center'
          >
            <img className='mx-auto' src={comparison} alt='*' />
            <span className='text-xs pt-1 font-medium text-[#222]'>
              Сравнение
            </span>
          </NavLink>
          <NavLink
            to='#'
            className='text-center flex flex-col justify-between items-center'
          >
            <img className='mx-auto' src={favorite} alt='*' />
            <span className='text-xs pt-1 font-medium text-[#222]'>
              Избранное
            </span>
          </NavLink>
          <NavLink
            to='#'
            className='text-center flex flex-col justify-between items-center'
          >
            <img className='mx-auto' src={cart} alt='*' />
            <span className='text-xs pt-1 font-medium text-[#222]'>
              Корзина
            </span>
          </NavLink>
          <NavLink
            to='#'
            className='text-center flex flex-col justify-between items-center'
          >
            <img className='mx-auto' src={profile} alt='*' />
            <span className='text-xs pt-1 font-medium text-[#222] line-clamp-1 w-[63px] break-all'>
              Александр
            </span>
          </NavLink>
        </div>
      </div>
      <div className='flex items-center scrollable overflow-x-scroll space-x-4 pb-2'>
        <NavLink
          to='#'
          className='rounded-[4px] h-[27px] flex items-center justify-center px-4 bg-[#F04438]'
        >
          <img src={action} alt='*' />
          <span className='text-sm font-semibold text-white pl-1'>Акции</span>
        </NavLink>
        <NavLink
          to='#'
          className='rounded-[4px] h-[27px] flex items-center justify-center px-4 bg-colGreen'
        >
          <img src={news} alt='*' />
          <span className='text-sm font-semibold text-white pl-1'>Новинки</span>
        </NavLink>
        <NavLink
          to='#'
          className='rounded-[4px] h-[27px] flex items-center justify-center px-2 bg-[#F8981D] min-w-[130px]'
        >
          <img src={sales} alt='*' />
          <span className='text-sm font-semibold text-white pl-1'>
            Хиты продаж
          </span>
        </NavLink>
        <NavLink
          to='#'
          className='whitespace-nowrap text-[#222] text-sm font-semibold'
        >
          Мебельная фурнитура
        </NavLink>
        <NavLink
          to='#'
          className='whitespace-nowrap text-[#222] text-sm font-semibold'
        >
          Кухни
        </NavLink>
        <NavLink
          to='#'
          className='whitespace-nowrap text-[#222] text-sm font-semibold'
        >
          Раздвижные системы
        </NavLink>
        <NavLink
          to='#'
          className='whitespace-nowrap text-[#222] text-sm font-semibold'
        >
          Фасады
        </NavLink>
        <NavLink
          to='#'
          className='whitespace-nowrap text-[#222] text-sm font-semibold'
        >
          Фурнитура для стеклянных конструкций
        </NavLink>
        <NavLink
          to='#'
          className='whitespace-nowrap text-[#222] text-sm font-semibold'
        >
          Изделия из стекла
        </NavLink>
        <NavLink
          to='#'
          className='whitespace-nowrap text-[#222] text-sm font-semibold'
        >
          Техника для кухни
        </NavLink>
        <NavLink
          to='#'
          className='whitespace-nowrap text-[#222] text-sm font-semibold'
        >
          Услуги
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
