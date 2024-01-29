import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import vk from '../../assets/images/vk.svg';
import telegram from '../../assets/images/telegram.svg';
import whatsapp from '../../assets/images/whatsapp.svg';

const Footer = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState(true);

  return (
    <footer className='py-14 bg-colSuperLight'>
      <div className='content'>
        <div className='flex justify-between space-x-5 border-b border-colDarkGray pb-20'>
          <div className='max-w-[580px] w-full'>
            <div className='max-w-[220px] w-full'>
              <NavLink to='/'>
                <img className='w-full' src={logo} alt='*' />
              </NavLink>
              <p className='text-colDarkGray text-xs pt-2'>
                Интернет-магазин мебельной фурнитуры, столешниц и плитных
                материалов
              </p>
            </div>
            <form className='pt-10'>
              <h2 className='text-colBlack text-2xl font-semibold pb-3'>
                Подпишитесь на рассылку
              </h2>
              <div className='flex'>
                <input
                  className='border border-[#B5B5B5] h-[38px] max-w-[340px] w-full bg-white px-3 rounded outline-none'
                  type='email'
                  placeholder='Электронная почта'
                />
                <button className='h-[38px] px-5 bg-colGreen rounded ml-2 text-white'>
                  Подписаться
                </button>
              </div>
              <input className='hidden' type='checkbox' id='checkbox' />
              <label
                htmlFor='checkbox'
                onClick={() => setPrivacyPolicy(!privacyPolicy)}
                className='text-sm flex cursor-pointer mm:items-center max-w-[340px] w-full mt-2'
              >
                <div className='w-5 h-5 min-w-[20px] mr-2 flex justify-center items-center bg-colGreen rounded-sm'>
                  {privacyPolicy && (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='12'
                      height='9'
                      viewBox='0 0 12 9'
                      fill='none'
                    >
                      <g clipPath='url(#clip0_701_1390)'>
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M11.8546 0.646894C11.9012 0.693339 11.9381 0.748515 11.9633 0.80926C11.9886 0.870005 12.0015 0.935127 12.0015 1.00089C12.0015 1.06666 11.9886 1.13178 11.9633 1.19253C11.9381 1.25327 11.9012 1.30845 11.8546 1.35489L4.85463 8.35489C4.80819 8.40146 4.75301 8.4384 4.69227 8.46361C4.63152 8.48881 4.5664 8.50179 4.50063 8.50179C4.43486 8.50179 4.36974 8.48881 4.309 8.46361C4.24825 8.4384 4.19308 8.40146 4.14663 8.35489L0.646631 4.85489C0.552745 4.76101 0.5 4.63367 0.5 4.50089C0.5 4.36812 0.552745 4.24078 0.646631 4.14689C0.740518 4.05301 0.867856 4.00026 1.00063 4.00026C1.13341 4.00026 1.26075 4.05301 1.35463 4.14689L4.50063 7.29389L11.1466 0.646894C11.1931 0.600331 11.2483 0.563388 11.309 0.538181C11.3697 0.512975 11.4349 0.5 11.5006 0.5C11.5664 0.5 11.6315 0.512975 11.6923 0.538181C11.753 0.563388 11.8082 0.600331 11.8546 0.646894Z'
                          fill='white'
                        />
                      </g>
                      <defs>
                        <clipPath id='clip0_701_1390'>
                          <rect
                            width='11.5015'
                            height='8.00179'
                            fill='white'
                            transform='translate(0.5 0.5)'
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  )}
                </div>
                <p className='text-[10px] leading-3 text-colDarkGray'>
                  Я даю согласие на обработку моих персональных данных и
                  принимаю условия
                  <NavLink
                    className='ml-1 text-colGreen'
                    tablet='_blank'
                    to='#'
                  >
                    Пользовательского соглашения и Политики обработки
                    персональных данных
                  </NavLink>
                </p>
              </label>
            </form>
          </div>
          <div>
            <div className='grid grid-cols-3 gap-4'>
              <div>
                <p className='text-colDarkGray font-medium pb-1'>
                  Горячая линия
                </p>
                <h4 className='text-colBlack text-xl font-semibold lining-nums proportional-nums'>
                  8 800 302-14-84
                </h4>
              </div>
              <div>
                <p className='text-colDarkGray font-medium pb-1'>
                  Электронная почта
                </p>
                <h4 className='text-colBlack text-xl font-semibold'>
                  rostok@rostok.ru
                </h4>
              </div>
              <div>
                <p className='text-colDarkGray font-medium pb-1'>
                  Соцсети и мессенджеры
                </p>
                <div className='flex items-center space-x-3'>
                  <NavLink to='#'>
                    <img src={telegram} alt='*' />
                  </NavLink>
                  <NavLink to='#'>
                    <img src={whatsapp} alt='*' />
                  </NavLink>
                  <NavLink to='#'>
                    <img src={vk} alt='*' />
                  </NavLink>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-3 gap-4 pt-10'>
              <div>
                <p className='text-colDarkGray font-medium pb-2'>О компании</p>
                <ul>
                  <li>
                    <NavLink
                      className='text-colBlack font-semibold text-sm hover:text-colGreen'
                      to='#'
                    >
                      О компании
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className='text-colBlack font-semibold text-sm hover:text-colGreen'
                      to='#'
                    >
                      Контакты
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className='text-colBlack font-semibold text-sm hover:text-colGreen'
                      to='#'
                    >
                      Реквизиты
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className='text-colBlack font-semibold text-sm hover:text-colGreen'
                      to='#'
                    >
                      Для партнёров
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div>
                <p className='text-colDarkGray font-medium pb-2'>Покупателю</p>
                <ul>
                  <li>
                    <NavLink
                      className='text-colBlack font-semibold text-sm hover:text-colGreen'
                      to='#'
                    >
                      Каталог
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className='text-colBlack font-semibold text-sm hover:text-colGreen'
                      to='#'
                    >
                      Акции
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className='text-colBlack font-semibold text-sm hover:text-colGreen'
                      to='#'
                    >
                      Товары со скидкой
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className='text-colBlack font-semibold text-sm hover:text-colGreen'
                      to='#'
                    >
                      Новинки
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div>
                <p className='text-colDarkGray font-medium pb-2'>Информация</p>
                <ul>
                  <li>
                    <NavLink
                      className='text-colBlack font-semibold text-sm hover:text-colGreen'
                      to='#'
                    >
                      Вопрос-ответ
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className='text-colBlack font-semibold text-sm hover:text-colGreen'
                      to='#'
                    >
                      Оплата и доставка
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className='text-colBlack font-semibold text-sm hover:text-colGreen'
                      to='#'
                    >
                      Гарантия и обмен
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-between items-center pt-10'>
          <p className='text-sm text-colDarkGray'>
            2023 © ООО «Росток» — Копирование материалов с сайта без разрешения
            правообладателя строго запрещено
          </p>
          <div className='flex space-x-5'>
            <NavLink className='text-colGray text-xs font-semibold' to='#'>
              Политика конфиденциальности
            </NavLink>
            <NavLink className='text-colGray text-xs font-semibold' to='#'>
              Оферта
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
