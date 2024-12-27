import { NavLink } from 'react-router-dom';

import logo from '@assets/images/logo.svg';

const FooterLogo = () => {
  return (
    <div className="mm:max-w-[220px] w-full">
      <NavLink to="/">
        <img className="w-[220px] mm:w-full" src={logo} alt="*" />
      </NavLink>
      <p className="text-colDarkGray text-xs pt-2">
        Интернет-магазин мебельной фурнитуры, столешниц и плитных материалов
      </p>
    </div>
  );
};

export default FooterLogo;
