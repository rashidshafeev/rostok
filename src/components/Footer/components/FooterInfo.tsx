import { NavLink } from 'react-router-dom';

import arrowDown from '@/shared/assets/icons/arrow-black.svg';

interface FooterInfoProps {
  isOpen: boolean;
  onToggle: () => void;
}

const FooterInfo = ({ isOpen, onToggle }: FooterInfoProps) => {
  return (
    <>
      <div
        onClick={onToggle}
        className="flex justify-between items-center pb-1 border-b border-colGray cursor-pointer"
      >
        <p
          className={`${isOpen ? 'text-colBlack' : 'text-colDarkGray'} font-medium pt-2`}
        >
          Информация
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
              to="/faq"
            >
              Вопрос-ответ
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-colBlack font-semibold text-sm hover:text-colGreen"
              to="/payment-delivery"
            >
              Оплата и доставка
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-colBlack font-semibold text-sm hover:text-colGreen"
              to="/warranty"
            >
              Гарантия и обмен
            </NavLink>
          </li>
        </ul>
      ) : null}
    </>
  );
};

export default FooterInfo;
