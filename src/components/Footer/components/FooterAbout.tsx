import { NavLink } from 'react-router-dom';
import arrowDown from '@assets/icons/arrow-black.svg';

interface FooterAboutProps {
  isOpen: boolean;
  onToggle: () => void;
}

const FooterAbout = ({ isOpen, onToggle }: FooterAboutProps) => {
  return (
    <>
      <div
        onClick={onToggle}
        className='flex justify-between items-center pb-1 border-b border-colGray cursor-pointer'
      >
        <p className={`${isOpen ? 'text-colBlack' : 'text-colDarkGray'} font-medium`}>
          О компании
        </p>
        <img
          className={`${isOpen ? 'rotate-[180deg]' : 'rotate-[0deg]'}`}
          src={arrowDown}
          alt='*'
        />
      </div>
      {isOpen && (
        <ul className='pl-5 py-1 border-b border-colGray'>
          <li>
            <NavLink
              className='text-colBlack font-semibold text-sm hover:text-colGreen'
              to='/about'
            >
              О компании
            </NavLink>
          </li>
          <li>
            <NavLink
              className='text-colBlack font-semibold text-sm hover:text-colGreen'
              to='/contacts'
            >
              Контакты
            </NavLink>
          </li>
          <li>
            <NavLink
              className='text-colBlack font-semibold text-sm hover:text-colGreen'
              to='/contacts'
            >
              Реквизиты
            </NavLink>
          </li>
          <li>
            <NavLink
              className='text-colBlack font-semibold text-sm hover:text-colGreen'
              to='/contacts'
            >
              Для партнёров
            </NavLink>
          </li>
        </ul>
      )}
    </>
  );
};

export default FooterAbout;
