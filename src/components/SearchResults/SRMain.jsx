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

const SRMain = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');

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
  }, [location.search, filtersValue]);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='content lining-nums proportional-nums'>
      <h3 className='font-semibold text-4xl text-colBlack pb-5'>Не указано</h3>
      <div className='flex pb-10 min-h-[420px]'>
        <SRSidebar
          handleFetchAllProducts={handleFetchAllProducts}
          filtersValue={filtersValue}
          setFiltersValue={setFiltersValue}
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
