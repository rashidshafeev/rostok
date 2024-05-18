import { useEffect, useState } from 'react';
import { ArrowIcon } from '../Icons';
import { NavLink } from 'react-router-dom';
import { useGetCategoryTreeQuery } from '../../redux/api/api';
import catalogIcon1 from '../../assets/images/catalogIcon1.svg';
import catalogIcon2 from '../../assets/images/catalogIcon2.svg';
import catalogIcon3 from '../../assets/images/catalogIcon3.svg';
import noImg from '../../assets/images/no-image.png';

const CatalogModal = ({ showCatalog, setShowCatalog }) => {
  const { data } = useGetCategoryTreeQuery();
  const categoryTree = data?.children;

  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeItem, setActiveItem] = useState(null);
  const [showAll, setShowAll] = useState(null);

  const handleItemClick = (el) => {
    setActiveItem(el);
  };

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
      className={`fixed left-0 w-full h-full z-[999] hidden md:block ${
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
            <ul className='pr-4 border-r border-[#EBEBEB] space-y-3 sticky top-0'>
              <li
                onMouseOver={() => handleItemClick(null)}
                className='flex justify-between items-center cursor-pointer hover:bg-colSuperLight rounded-md p-1'
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
                onMouseOver={() => handleItemClick(null)}
                className='flex justify-between items-center cursor-pointer hover:bg-colSuperLight rounded-md p-1'
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
                onMouseOver={() => handleItemClick(null)}
                className='flex justify-between items-center cursor-pointer hover:bg-colSuperLight rounded-md p-1'
              >
                <div className='flex items-center'>
                  <img src={catalogIcon3} alt='*' />
                  <span className='text-cilBlack font-semibold pl-2'>
                    Хиты продаж
                  </span>
                </div>
                <ArrowIcon className='rotate-[90deg]' />
              </li>
              {categoryTree?.map((el) => (
                <li key={el?.id}>
                  <NavLink
                    to={`/catalog/${el?.slug}`}
                    onMouseOver={() => handleItemClick(el)}
                    onClick={() => setShowCatalog(false)}
                    className={`${
                      activeItem?.id === el?.id && 'bg-colSuperLight'
                    } flex justify-between items-center hover:bg-colSuperLight rounded-md p-1`}
                  >
                    <div className='flex items-center'>
                      <img
                        className='w-7'
                        onError={(e) => {
                          e.target.onError = null;
                          e.target.src = noImg;
                        }}
                        src={el?.image?.small || noImg}
                        alt='*'
                      />
                      <span className='text-colBlack leading-[115%] font-semibold pl-2'>
                        {el?.name}
                      </span>
                    </div>
                    <ArrowIcon className='rotate-[90deg] min-w-[12px]' />
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className='w-full pl-5'>
            <h2 className='text-2xl text-colBlack font-semibold pb-4'>
              {activeItem?.name}
            </h2>
            {activeItem?.children?.length > 0 && (
              <div className='grid grid-cols-2 lg:grid-cols-3 gap-5'>
                {activeItem?.children?.map((el) => (
                  <div key={el?.id}>
                    <NavLink
                      to={`/catalog/${el?.slug}`}
                      onClick={() => setShowCatalog(false)}
                      className='font-semibold text-colBlack hover:text-colGreen leading-[120%]'
                    >
                      {el?.name}
                    </NavLink>
                    {el?.children?.length > 0 && (
                      <div className='pt-1'>
                        {el?.children
                          ?.slice(0, showAll === el?.id ? undefined : 5)
                          ?.map((child) => (
                            <div key={child?.id}>
                              <NavLink
                                to={`/catalog/${child?.slug}`}
                                onClick={() => setShowCatalog(false)}
                                className='text-colBlack text-sm hover:text-colGreen'
                              >
                                {child?.name}
                              </NavLink>
                            </div>
                          ))}
                        {showAll !== el?.id && el?.children?.length > 5 && (
                          <div
                            onClick={() => setShowAll(el?.id)}
                            className='cursor-pointer font-medium text-sm text-colGreen'
                          >
                            Показать еще
                          </div>
                        )}
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
