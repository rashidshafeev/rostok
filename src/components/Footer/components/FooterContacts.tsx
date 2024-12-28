import { NavLink } from 'react-router-dom';

import telegram from '@/shared/assets/images/telegram.svg';
import vk from '@/shared/assets/images/vk.svg';
import whatsapp from '@/shared/assets/images/whatsapp.svg';

const FooterContacts = () => {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div>
        <p className="text-colDarkGray leading-[120%] font-medium pb-1">
          Горячая линия
        </p>
        <h4 className="text-colBlack text-xl font-semibold lining-nums proportional-nums">
          8 800 302-14-84
        </h4>
      </div>
      <div>
        <p className="text-colDarkGray leading-[120%] font-medium pb-1">
          Электронная почта
        </p>
        <h4 className="text-colBlack text-xl font-semibold break-all">
          rostok@rostok.ru
        </h4>
      </div>
      <div>
        <p className="text-colDarkGray leading-[120%] font-medium pb-1">
          Соцсети и мессенджеры
        </p>
        <div className="flex justify-center md:justify-start pt-2 md:pt-0 items-center space-x-3">
          <NavLink to="#">
            <img src={telegram} alt="*" />
          </NavLink>
          <NavLink to="#">
            <img src={whatsapp} alt="*" />
          </NavLink>
          <NavLink to="#">
            <img src={vk} alt="*" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default FooterContacts;
