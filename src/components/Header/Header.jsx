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
import { useEffect, useState } from 'react';
import AuthModal from '../../helpers/CModal/AuthModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCatalogOfProducts } from '../../api/catalog';

const Header = ({ cartProducts }) => {
  const { user } = useSelector((state) => state?.user);
  const [content, setContent] = useState('');
  const [open, setOpen] = useState(false);

  const { catalog } = useSelector((state) => state?.catalog);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await fetchCatalogOfProducts(dispatch);
    })();
  }, [dispatch]);

  return (
    <>
      <div className='content mx-auto pt-2 flex justify-between items-center space-x-5 relative z-[999]'>
        <div className='flex items-center'>
          <img src={address} alt='*' />
          <span className='text-colBlack text-xs font-semibold ml-1'>
            Москва
          </span>
        </div>
        <ul className='flex justify-end items-center space-x-3'>
          <li>
            <NavLink to='#' className='text-colDarkGray text-sm font-semibold'>
              Оплата и доставка
            </NavLink>
          </li>
          <li>
            <NavLink to='#' className='text-colDarkGray text-sm font-semibold'>
              Гарантия и возврат
            </NavLink>
          </li>
          <li>
            <NavLink to='#' className='text-colDarkGray text-sm font-semibold'>
              Оптовым клиентам
            </NavLink>
          </li>
          <li>
            <NavLink to='#' className='text-colDarkGray text-sm font-semibold'>
              Контакты
            </NavLink>
          </li>
          <li>
            <NavLink to='#' className='text-colDarkGray text-sm font-semibold'>
              О компании
            </NavLink>
          </li>
          <li>
            <NavLink
              to='#'
              className='text-colDarkGray text-sm font-semibold border-b border-colDarkGray pb-[1px]'
            >
              Есть вопросы?
            </NavLink>
          </li>
        </ul>
      </div>
      <div className='content mx-auto sticky top-0 flex justify-between items-center py-3 space-x-5 bg-white z-[999]'>
        <NavLink className='min-w-[90px]' to='/'>
          <img src={logo} alt='logo' />
        </NavLink>
        <button className='bg-colGreen text-white flex justify-center items-center max-w-[140px] w-full min-h-[40px] rounded'>
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
          {user ? (
            <NavLink
              to='/profile/orders'
              className='text-center flex flex-col justify-between items-center'
            >
              <img className='mx-auto' src={order} alt='*' />
              <span className='text-xs pt-1 font-medium text-colBlack'>
                Заказы
              </span>
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
              <span className='text-xs pt-1 font-medium text-colBlack'>
                Заказы
              </span>
            </button>
          )}
          <NavLink
            to='/comparison'
            className='text-center flex flex-col justify-between items-center'
          >
            <img className='mx-auto' src={comparison} alt='*' />
            <span className='text-xs pt-1 font-medium text-colBlack'>
              Сравнение
            </span>
          </NavLink>
          <NavLink
            to='/favorites'
            className='text-center flex flex-col justify-between items-center'
          >
            <img className='mx-auto' src={favorite} alt='*' />
            <span className='text-xs pt-1 font-medium text-colBlack'>
              Избранное
            </span>
          </NavLink>
          <NavLink
            to='/shopping-cart'
            className='relative text-center flex flex-col justify-between items-center'
          >
            <img className='mx-auto' src={cart} alt='*' />
            <span className='text-xs pt-1 font-medium text-colBlack'>
              Корзина
            </span>
            {cartProducts?.length > 0 && (
              <span className='absolute -top-2 right-0 bg-colGreen h-5 pb-[2px] min-w-[20px] flex justify-center items-center text-xs text-white rounded-full px-1'>
                {!cartProducts?.length > 99 ? '99+' : cartProducts?.length}
              </span>
            )}
          </NavLink>
          {user ? (
            <NavLink
              to='/profile/personal-data'
              className='text-center flex flex-col justify-between items-center'
            >
              <img className='mx-auto' src={profile} alt='*' />
              <span className='text-xs pt-1 font-medium text-colBlack line-clamp-1 w-[63px] break-all'>
                {user?.name}
              </span>
            </NavLink>
          ) : (
            <button
              onClick={() => {
                setContent('checkAuth');
                setOpen(true);
              }}
              className='text-center flex flex-col justify-between items-center outline-none'
            >
              <img className='mx-auto' src={profile} alt='*' />
              <span className='text-xs pt-1 font-medium text-colBlack line-clamp-1 w-[63px] break-all'>
                Войти
              </span>
            </button>
          )}
        </div>
      </div>
      <div className='content mx-auto flex items-center scrollable overflow-x-scroll space-x-4 pb-2'>
        <NavLink
          to='#'
          className='rounded h-[27px] flex items-center justify-center px-4 bg-[#F04438]'
        >
          <img src={action} alt='*' />
          <span className='text-sm font-semibold text-white pl-1'>Акции</span>
        </NavLink>
        <NavLink
          to='#'
          className='rounded h-[27px] flex items-center justify-center px-4 bg-colGreen'
        >
          <img src={news} alt='*' />
          <span className='text-sm font-semibold text-white pl-1'>Новинки</span>
        </NavLink>
        <NavLink
          to='#'
          className='rounded h-[27px] flex items-center justify-center px-2 bg-[#F8981D] min-w-[130px]'
        >
          <img src={sales} alt='*' />
          <span className='text-sm font-semibold text-white pl-1'>
            Хиты продаж
          </span>
        </NavLink>
        {catalog?.slice(0, 14)?.map((el) => (
          <NavLink
            to='/catalog/categories'
            state={{ category: el }}
            key={el?.id}
            className='whitespace-nowrap text-colBlack text-sm font-semibold'
          >
            {el?.name}
          </NavLink>
        ))}
        <NavLink
          to='/catalog'
          className='whitespace-nowrap text-colGreen text-sm font-semibold'
        >
          Показать все
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

export default Header;
