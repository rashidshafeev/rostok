import { NavLink } from 'react-router-dom';

import arrowDown from '@/shared/assets/icons/arrow-black.svg';

interface FooterBuyerProps {
  isOpen: boolean;
  onToggle: () => void;
}

const FooterBuyer = ({ isOpen, onToggle }: FooterBuyerProps) => {
  return (
    <>
      <div
        onClick={onToggle}
        className="flex justify-between items-center pb-1 border-b border-colGray cursor-pointer"
      >
        <p
          className={`${isOpen ? 'text-colBlack' : 'text-colDarkGray'} font-medium pt-2`}
        >
          Покупателю
        </p>
        <img
          className={`${isOpen ? 'rotate-[180deg]' : 'rotate-[0deg]'}`}
          src={arrowDown}
          alt="*"
        />
      </div>
      {isOpen ? (
        <ul className="pl-5 py-1 border-b border-colGray">
          <li>
            <NavLink
              className="text-colBlack font-semibold text-sm hover:text-colGreen"
              to="@"
            >
              Каталог
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-colBlack font-semibold text-sm hover:text-colGreen"
              to="#"
            >
              Акции
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-colBlack font-semibold text-sm hover:text-colGreen"
              to="#"
            >
              Товары со скидкой
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-colBlack font-semibold text-sm hover:text-colGreen"
              to="#"
            >
              Новинки
            </NavLink>
          </li>
        </ul>
      ) : null}
    </>
  );
};

export default FooterBuyer;
