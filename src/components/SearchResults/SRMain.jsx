import Advantages from '../Home/Advantages';
import Brands from '../Home/Brands';
import Promotions from '../Home/Promotions';
import SRContent from './SRContent';
import SRSidebar from './SRSidebar';
import { useEffect, useState } from 'react';
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop';
import { fetchAllCategoryProducts } from '../../api/catalog';
import { fetchSearchResults } from '../../api/searchProducts';
import { useLocation } from 'react-router-dom';
import noImg from '../../assets/images/no-image.png';
import categoryIcon from '../../assets/icons/category.svg';

const SRMain = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [filtersValue, setFiltersValue] = useState({
    highRating: true,
    brands: [],
    tags: [],
    min_price: 0,
    max_price: 900000,
    category_id: '',
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  const handleFetchAllProducts = async (category_id, filters) => {
    const { success, data } = await fetchAllCategoryProducts(
      category_id,
      filters,
      '',
      searchQuery
    );
    if (success) {
      setProducts(data);
    }
  };

  const handleCategories = (id) => {
    let updatedFilters = { ...filtersValue };
    updatedFilters = {
      ...updatedFilters,
      category_id: Number(id),
    };
    setFiltersValue(updatedFilters);
  };

  const handlePagination = async (e, p) => {
    scrollToTop();
    const { success, data } = await fetchSearchResults(
      searchQuery,
      filtersValue,
      p
    );
    if (success) {
      setProducts(data);
    } else {
      setProducts(data);
    }
  };

  useEffect(() => {
    const handleSearchResults = async () => {
      setIsLoading(true);
      const { success, data } = await fetchSearchResults(
        searchQuery,
        filtersValue
      );
      if (success) {
        setProducts(data);
        setIsLoading(false);
      } else {
        setProducts(data);
        setIsLoading(false);
      }
    };
    handleSearchResults();
  }, [searchQuery, filtersValue]);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='content lining-nums proportional-nums'>
      <div className='bg-gray-100 rounded-lg p-3 mm:p-4 mb-8 mt-4'>
        <h3
          className={`font-semibold text-2xl mm:text-4xl text-colBlack ${
            categories?.length > 0 ? 'pb-2' : 'pb-5'
          }`}
        >
          {searchQuery}
        </h3>
        {categories?.length > 0 && (
          <>
            <h4 className='font-medium mm:font-semibold mm:text-xl text-colBlack pb-3'>
              Найдены товары в категориях:
            </h4>
            <div className='overflow-x-scroll md:overflow-x-hidden scrollable flex py-3 md:grid md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-3 pr-2'>
              <button
                className={`${
                  filtersValue?.category_id == '' ? 'bg-gray-200' : 'bg-white'
                } shadow-[0_1px_2px_0_rgba(0,0,0,.1)] p-1 lg:p-2 rounded-md flex justify-center items-center outline-none min-w-[120px]`}
                onClick={() => handleCategories('')}
              >
                <img className='w-4 mr-1' src={categoryIcon} alt='*' />
                Все
              </button>
              {categories?.map((el) => (
                <button
                  className={`${
                    filtersValue?.category_id == el?.id
                      ? 'bg-gray-200'
                      : 'bg-white'
                  } shadow-[0_1px_2px_0_rgba(0,0,0,.1)] p-1 lg:p-2 rounded-md flex items-center relative outline-none min-w-[220px] md:min-w-[auto]`}
                  key={el?.id}
                  onClick={() => handleCategories(el?.id)}
                >
                  <span className='absolute top-[-12px] right-[-12px] border-4 lining-nums proportional-nums border-gray-100 bg-colGreen text-white text-xs rounded-[50px] min-w-[28px] h-[28px] p-[3px] block'>
                    {el?.product_count}
                  </span>
                  <div className='min-w-[40px] w-10 h-8 overflow-hidden rounded'>
                    <img
                      className='w-full h-full object-cover'
                      src={el?.image || noImg}
                      onError={(e) => {
                        e.target.onError = null;
                        e.target.src = noImg;
                      }}
                      alt='*'
                    />
                  </div>
                  <span className='px-2 text-colBlack text-sm leading-[115%] text-left break-all line-clamp-2'>
                    {el?.name}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      <div className='flex pb-10 min-h-[420px]'>
        <SRSidebar
          handleFetchAllProducts={handleFetchAllProducts}
          filtersValue={filtersValue}
          setFiltersValue={setFiltersValue}
          setCategories={setCategories}
          searchQuery={searchQuery}
          open={open}
          setOpen={setOpen}
        />
        <SRContent
          products={products}
          isLoading={isLoading}
          handlePagination={handlePagination}
          setOpen={setOpen}
        />
      </div>
      <Promotions />
      <Brands />
      <Advantages />
    </div>
  );
};

export default SRMain;
