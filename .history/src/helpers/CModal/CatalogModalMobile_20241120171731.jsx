import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ArrowIcon } from '../Icons';
import noImg from '../../assets/images/no-image.png';
import arrowBack from '../../assets/icons/arrow-black.svg';
import { useGetBasicFiltersQuery, useGetCategoryTreeQuery } from '../../redux/api/productEndpoints';

const CatalogModalMobile = ({ showCatalog, setShowCatalog }) => {
  const { data } = useGetCategoryTreeQuery();
  const categoryTree = data?.children;
  const { pathname } = useLocation();

  const {data: basicFilters} = useGetBasicFiltersQuery();


  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeItem, setActiveItem] = useState({});
  const [isOpen, setIsOpen] = useState(null);

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

  useEffect(() => {
    setShowCatalog(false);
  }, [pathname]);

  return (
    <div
      className={`fixed left-0 w-full h-full z-[999] md:hidden ${
        scrollPosition > 32 ? 'top-[64px]' : 'top-[105px]'
      } bg-white duration-300 pb-[72px]`}
    >
      <div
        className={`${
          scrollPosition > 32
            ? 'h-[calc(100vh-136px)] overflow-y-auto'
            : 'h-[calc(100vh-182px)] overflow-y-auto'
        } content scrollable relative`}
      >
        <div className='flex pt-5'>
          <div className='w-full'>
            <ul className='space-y-3'>
            {basicFilters?.tags?.map((tag) => (
        <NavLink
          to={`/catalog/tags?tags=${tag?.tag}`}
          onClick={() => setShowCatalog(false)}

          key={tag?.id}
          className="rounded h-[27px] flex items-end p-1"
        >
          <img src={tag?.dark_icon?.medium} className='w-7 h-7' alt="*" />

          <span className="text-colBlack leading-[115%] font-semibold pl-2">
            {tag?.tag}
          </span>
        </NavLink>
      ))}
              {categoryTree?.map((el) => {
                

                {!el?.children && (
                  <div key={el?.id}>
                    <NavLink
                      to={`/catalog/${el?.slug}`}
                      onClick={() => setShowCatalog(false)}
                      className='text-colBlack text-sm hover:text-colGreen'
                    >
                      {el?.name}
                    </NavLink>
                  </div>)}


                {el?.children && (<li key={el?.id}>
                  <button
                    onClick={() => setActiveItem(el)}
                    className={`${
                      activeItem?.id === el?.id && 'bg-colSuperLight'
                    } flex justify-between items-center p-1 w-full border-b pb-2`}
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
                      <span className='text-colBlack leading-[115%] font-semibold pl-2 text-left'>
                        {el?.name} 
                      </span>
                    </div>
                    <ArrowIcon className='rotate-[90deg] min-w-[12px]' />
                  </button>
                </li>)}



                
              }           
                
                
              )
              }
            </ul>
          </div>
        </div>
        {Object.keys(activeItem)?.length > 0 && (
          <div
            className={`${
              scrollPosition > 32
                ? 'h-[calc(100vh-136px)] top-[64px] overflow-y-auto'
                : 'h-[calc(100vh-182px)] top-[105px] overflow-y-auto'
            } fixed left-0 bg-white px-3 w-full scrollable`}
          >
            <button
              onClick={() => setActiveItem({})}
              className='flex items-center'
            >
              <img className='rotate-[90deg]' src={arrowBack} alt='*' />
              <span className='ml-1 font-medium text-sm py-1'>
                Вернуться к каталогу
              </span>
            </button>
            <h2 className='text-2xl text-colBlack font-semibold pt-1 pb-3'>
              {activeItem?.name}
            </h2>
            {activeItem?.children?.length > 0 && (
              <div className='space-y-2'>
                {activeItem?.children?.map((el) => (
                  <div key={el?.id}>
                    <div className='font-semibold text-colBlack leading-[120%] border-b w-full flex justify-between items-center pb-1'>
                      <NavLink
                        to={`/catalog/${el?.slug}`}
                        onClick={() => setShowCatalog(false)}
                      >
                        {el?.name}
                      </NavLink>
                      {el?.children?.length > 0 && (
                        <button
                          onClick={() =>
                            setIsOpen(isOpen === el?.id ? null : el?.id)
                          }
                          className={`${
                            isOpen === el?.id
                              ? 'rotate-[180deg]'
                              : 'rotate-[0deg]'
                          } w-6 h-6 flex justify-center items-center duration-200`}
                        >
                          <img src={arrowBack} alt='*' />
                        </button>
                      )}
                    </div>
                    {el?.children?.length > 0 && isOpen === el?.id && (
                      <div className='pt-1 pl-3'>
                        {el?.children?.map((child) => (
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
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogModalMobile;
