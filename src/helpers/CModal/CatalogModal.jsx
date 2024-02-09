import { useEffect, useState } from 'react';
import catalogIcon1 from '../../assets/images/catalogIcon1.svg';
import catalogIcon2 from '../../assets/images/catalogIcon2.svg';
import catalogIcon3 from '../../assets/images/catalogIcon3.svg';
import { ArrowIcon } from '../Icons';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const CatalogModal = ({ showCatalog, setShowCatalog }) => {
  const { catalog } = useSelector((state) => state?.catalog);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (id) => {
    setActiveItem(id);
  };

  console.log(activeItem?.children);

  useEffect(() => {
    const handleBodyOverflow = () => {
      if (showCatalog) {
        document.body.style.overflowY = 'hidden';
      } else {
        document.body.style.overflowY = 'auto';
      }
    };

    handleBodyOverflow();

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [showCatalog]);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset || document.documentElement.scrollTop;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`${
        showCatalog ? 'visible opacity-100' : 'invisible opacity-0'
      } fixed left-0 w-full h-full z-[999] ${
        scrollPosition > 32 ? 'top-[65px]' : 'top-[100px]'
      } bg-white duration-300`}
    >
      <div
        className={`${
          scrollPosition > 32 ? 'h-[90%]' : 'h-[85%]'
        } content overflow-y-scroll scrollable`}
      >
        <div className='flex pt-5'>
          <div className='max-w-[220px] w-full'>
            <ul className='pr-4 border-r border-[#EBEBEB] space-y-3'>
              <li
                onClick={() => handleItemClick('actions')}
                className={`${
                  activeItem === 'actions' && 'bg-colSuperLight'
                } flex justify-between items-center cursor-pointer hover:bg-colSuperLight rounded-md p-1`}
              >
                <div className='flex items-center'>
                  <img src={catalogIcon1} alt='*' />
                  <span className='text-cilBlack font-semibold pl-2'>
                    Акции
                  </span>
                </div>
                <ArrowIcon className='rotate-[90deg]' />
              </li>
              <li
                onClick={() => handleItemClick('news')}
                className={`${
                  activeItem === 'news' && 'bg-colSuperLight'
                } flex justify-between items-center cursor-pointer hover:bg-colSuperLight rounded-md p-1`}
              >
                <div className='flex items-center'>
                  <img src={catalogIcon2} alt='*' />
                  <span className='text-cilBlack font-semibold pl-2'>
                    Новинки
                  </span>
                </div>
                <ArrowIcon className='rotate-[90deg]' />
              </li>
              <li
                onClick={() => handleItemClick('sales')}
                className={`${
                  activeItem === 'sales' && 'bg-colSuperLight'
                } flex justify-between items-center cursor-pointer hover:bg-colSuperLight rounded-md p-1`}
              >
                <div className='flex items-center'>
                  <img src={catalogIcon3} alt='*' />
                  <span className='text-cilBlack font-semibold pl-2'>
                    Хиты продаж
                  </span>
                </div>
                <ArrowIcon className='rotate-[90deg]' />
              </li>
              {catalog?.map((el) => (
                <li
                  key={el?.id}
                  onClick={() => handleItemClick(el)}
                  className={`${
                    activeItem?.id === el?.id && 'bg-colSuperLight'
                  } flex justify-between items-center cursor-pointer hover:bg-colSuperLight rounded-md p-1`}
                >
                  <div className='flex items-center'>
                    <img className='w-7' src={el?.image?.small} alt='*' />
                    <span className='text-cilBlack font-semibold pl-2'>
                      {el?.name}
                    </span>
                  </div>
                  <ArrowIcon className='rotate-[90deg]' />
                </li>
              ))}
            </ul>
          </div>
          <div className='w-full pl-5'>
            <h2 className='text-2xl text-colBlack font-semibold pb-4'>
              {activeItem?.name}
            </h2>
            {activeItem?.children?.length > 0 && (
              <div className='grid grid-cols-3 gap-5'>
                {activeItem?.children?.map((el) => (
                  <div key={el?.id}>
                    <NavLink
                      to='/catalog/categories'
                      state={{ category: el }}
                      onClick={() => setShowCatalog(false)}
                      className='font-semibold text-colBlack hover:text-colGreen'
                    >
                      {el?.name}
                    </NavLink>
                    {el?.children?.length > 0 && (
                      <div className='pt-1'>
                        {el?.children?.map((child) => (
                          <div key={child?.id}>
                            <NavLink
                              to='/catalog/categories/products'
                              state={{ category: child }}
                              onClick={() => setShowCatalog(false)}
                              className='text-colBlack text-sm hover:text-colGreen'
                            >
                              {child?.name}
                            </NavLink>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogModal;
