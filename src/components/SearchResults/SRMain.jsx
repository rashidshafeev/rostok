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

const SRMain = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filtersValue, setFiltersValue] = useState({
    highRating: true,
    brands: [],
    tags: [],
    min_price: 0,
    max_price: 900000,
  });

  const location = useLocation();

  const handleFetchAllProducts = async (category_id, filters) => {
    const { success, data } = await fetchAllCategoryProducts(
      category_id,
      filters
    );
    if (success) {
      setProducts(data);
    }
  };

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

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
      <div className='bg-gray-100 rounded-lg p-4 mb-8'>
        <h3
          className={`font-semibold text-4xl text-colBlack ${
            categories?.length > 0 ? 'pb-2' : 'pb-5'
          }`}
        >
          {searchQuery}
        </h3>
        {categories?.length > 0 && (
          <>
            <h4 className='font-semibold text-xl text-colBlack pb-3'>
              Найдены товары в категориях:
            </h4>
            <div className='grid grid-cols-8 gap-3'>
              {categories?.map((el) => (
                <button
                  className='bg-white shadow-[0_1px_2px_0_rgba(0,0,0,.1)] p-2 rounded-md flex items-center relative'
                  key={el?.id}
                >
                  <span className='absolute -top-[8px] -right-[8px] border-4 lining-nums proportional-nums border-white bg-colGreen text-white text-xs rounded-[50px] min-w-[28px] h-[28px] p-[3px] block'>
                    {el?.product_count}
                  </span>
                  <div className='min-w-[48px] w-12 h-8 overflow-hidden rounded'>
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
                  <span className='ml-2 text-colBlack text-sm leading-[115%] text-left'>
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
        />
        <SRContent products={products} isLoading={isLoading} />
      </div>
      <Promotions />
      <Brands />
      <Advantages />
    </div>
  );
};

export default SRMain;
