import { NavLink } from 'react-router-dom';
import { useGetBasicFiltersQuery } from '@api/productEndpoints';

const FooterDesktopMenu = () => {
  const { data: basicFilters } = useGetBasicFiltersQuery();

  return (
    <div className='hidden md:flex space-x-10'>
      <div>
        <p className='text-colDarkGray font-medium md:pb-2'>
          О компании
        </p>
        <ul>
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
              to='/wholesale'
            >
              Для партнёров
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        <p className='text-colDarkGray font-medium md:pb-2'>
          Покупателю
        </p>
        <ul>
          <li>
            <NavLink
              className='text-colBlack font-semibold text-sm hover:text-colGreen'
              to='/catalog'
            >
              Каталог
            </NavLink>
          </li>
          {basicFilters?.tags?.map((tag, index) => (
            <li key={index}>
              <NavLink
                to={`/catalog/tags?tags=${tag?.tag}`}
                className='lowercase'
              >
                <span className='text-colBlack font-semibold text-sm hover:text-colGreen capitalize'>
                  {tag?.tag}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className='text-colDarkGray font-medium md:pb-2'>
          Информация
        </p>
        <ul>
          <li>
            <NavLink
              className='text-colBlack font-semibold text-sm hover:text-colGreen'
              to='/faq'
            >
              Вопрос-ответ
            </NavLink>
          </li>
          <li>
            <NavLink
              className='text-colBlack font-semibold text-sm hover:text-colGreen'
              to='/payment-delivery'
            >
              Оплата и доставка
            </NavLink>
          </li>
          <li>
            <NavLink
              className='text-colBlack font-semibold text-sm hover:text-colGreen'
              to='/warranty'
            >
              Гарантия и обмен
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FooterDesktopMenu;
