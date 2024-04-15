import { NavLink } from 'react-router-dom';
import address from '../../assets/icons/address.svg';
import arrow from '../../assets/icons/arrow-black.svg';
import { useState } from 'react';
import CitiesModal from '../../helpers/CModal/CitiesModal';

function PreHeader() {
  const [content, setContent] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <div className='content mx-auto pt-2 flex justify-between items-center space-x-5 relative z-[999]'>
      <div
        onClick={() => {
          setContent('citiesModal');
          setOpen(true);
        }}
        className='flex items-center cursor-pointer'
      >
        <img src={address} alt='*' />
        <span className='text-colBlack text-xs font-semibold ml-1'>Москва</span>
        <img className='ml-1' src={arrow} alt='*' />
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

      <CitiesModal
        open={open}
        setOpen={setOpen}
        content={content}
      />
    </div>
  );
}

export default PreHeader;
