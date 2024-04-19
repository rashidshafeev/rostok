import Advantages from '../Home/Advantages';
import Brands from '../Home/Brands';
import Promotions from '../Home/Promotions';
import SRContent from './SRContent';
import SRSidebar from './SRSidebar';
import { useEffect, useState } from 'react';
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop';
import {
  fetchAllCategoryProducts,
  fetchCategoryProductsFilter,
} from '../../api/catalog';
import { fetchSearchResults } from '../../api/searchProducts';
import { useLocation } from 'react-router-dom';

const SRMain = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const handleFilterProducts = async (category_id, filters) => {
    setIsLoading(true);
    const { success, data } = await fetchCategoryProductsFilter(
      category_id,
      filters
    );
    if (success) {
      setProducts(data);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

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
      const { success, data } = await fetchSearchResults(searchQuery);
      if (success) {
        setProducts(data);
        setIsLoading(false);
      } else {
        setProducts(data);
        setIsLoading(false);
      }
    };
    handleSearchResults();
  }, [location.search]);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='content lining-nums proportional-nums'>
      <h3 className='font-semibold text-4xl text-colBlack pb-5'>Не указано</h3>
      <div className='flex pb-10 min-h-[420px]'>
        <SRSidebar
          handleFetchProducts={handleFilterProducts}
          handleFetchAllProducts={handleFetchAllProducts}
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
