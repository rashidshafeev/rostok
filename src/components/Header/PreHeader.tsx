import { useState } from 'react';
import CitiesModal from '@/features/modals/ui/modals/CitiesModal';
import { NavLink } from 'react-router-dom';
import address from '@/shared/assets/icons/address.svg';
import arrow from '@/shared/assets/icons/arrow-black.svg';
import logo from '@assets/images/logo.svg';
import { useModal } from '@/features/modals/model/context';



function PreHeader() {
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState(null);
  
 const { showModal } = useModal();

  return (
    <div className='content mx-auto pt-3 lg:pt-2 flex justify-between items-center relative z-[999]'>
      <NavLink className='min-w-[87px] w-[87px] block lg:hidden' to='/'>
        <img src={logo} alt='logo' />
      </NavLink>
      <div
        onClick={() => setOpen(true)}
        className='flex items-center cursor-pointer lg:mr-5'
      >
        <img src={address} alt='*' />
        <span className='text-colBlack text-xs font-semibold ml-1'>
          {city?.name || 'Выберите город'}
        </span>
        <img className='ml-1' src={arrow} alt='*' />
      </div>
      <ul className='hidden lg:flex justify-end items-center space-x-3'>
        <li>
          <NavLink to='/payment-delivery' className='text-colDarkGray text-sm font-semibold'>
            Оплата и доставка
          </NavLink>
        </li>
        <li>
          <NavLink to='/warranty' className='text-colDarkGray text-sm font-semibold'>
            Гарантия и возврат
          </NavLink>
        </li>
        <li>
          <NavLink to='/wholesale' className='text-colDarkGray text-sm font-semibold'>
            Оптовым клиентам
          </NavLink>
        </li>
        <li>
          <NavLink to='/contacts' className='text-colDarkGray text-sm font-semibold'>
            Контакты
          </NavLink>
        </li>
        <li>
          <NavLink to='/about' className='text-colDarkGray text-sm font-semibold'>
            О компании
          </NavLink>
        </li>
        <li>
          <button
            className='text-colDarkGray text-sm font-semibold border-b border-colDarkGray pb-[1px]'
            onClick={() =>  showModal({type: 'question', data: {
              title: 'Вопросы',
              description: 'Если у вас есть вопросы, задайте их нам и мы обязательно ответим',
              buttonText: 'Задать вопрос',
            }})}
          >
            Есть вопросы?
          </button>
        </li>
      </ul>

      <CitiesModal
        open={open}
        setOpen={setOpen}
        city={city}
        setCity={setCity}
      />
    </div>
  );
}

export default PreHeader;
