import React from 'react'

import order from '../../assets/icons/order.svg';
import cart from '../../assets/icons/cart.svg';
import favoriteicon from '../../assets/icons/favorite.svg';
import comparisonicon from '../../assets/icons/comparison.svg';
import profile from '../../assets/icons/profile.svg';

import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function HeaderControls({cartProducts, setContent, setOpen}) {

  const { user } = useSelector((state) => state?.user);
  const itemsQuantity = useSelector((state) => state?.cart?.itemsQuantity);
  const favorite = useSelector((state) => state?.favorite?.favorite);
  const comparison = useSelector((state) => state?.comparison?.comparison);

  return (
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
            className='relative text-center flex flex-col justify-between items-center'
          >
            <img className='mx-auto' src={comparisonicon} alt='*' />
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
            <img className='mx-auto' src={favoriteicon} alt='*' />
            <span className='text-xs pt-1 font-medium text-colBlack'>
              Избранное
            </span>
            {favorite.length > 0 && (
              <span className='absolute -top-2 right-0 bg-colGreen h-5 pb-[2px] min-w-[20px] flex justify-center items-center text-xs text-white rounded-full px-1'>
                {!favorite.length > 99 ? '99+' : favorite.length}
              </span>
            )}
          </NavLink>
          <NavLink
            to='/shopping-cart'
            className='relative text-center flex flex-col justify-between items-center'
          >
            <img className='mx-auto' src={cart} alt='*' />
            <span className='text-xs pt-1 font-medium text-colBlack'>
              Корзина
            </span>
            {itemsQuantity > 0 && (
              <span className='absolute -top-2 right-0 bg-colGreen h-5 pb-[2px] min-w-[20px] flex justify-center items-center text-xs text-white rounded-full px-1'>
                {!itemsQuantity > 99 ? '99+' : itemsQuantity}
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
  )
}

export default HeaderControls