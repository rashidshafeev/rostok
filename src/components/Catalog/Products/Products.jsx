import Advantages from '../../Home/Advantages';
import Brands from '../../Home/Brands';
import Promotions from '../../Home/Promotions';
import { useLocation } from 'react-router-dom';
import ProdSidebar from './ProdSidebar';
import ProdContent from './ProdContent';
import { useEffect, useState } from 'react';
import { scrollToTop } from '../../../helpers/scrollToTop/scrollToTop';
import {
  fetchAllCategoryProducts,
  fetchCategoryProducts,
  fetchCategoryProductsBySort,
} from '../../../api/catalog';

const Products = () => {
  const [catProducts, setCatProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useLocation();

  console.log(state)
  const handleFetchProducts = async (category_id, filters) => {
    setIsLoading(true);
    const { success, data } = await fetchCategoryProducts(category_id, filters);
    if (success) {
      setCatProducts(data);
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
      setCatProducts(data);
    }
  };

  const handleFetchBySort = async (category_id, sort) => {
    setIsLoading(true);
    const { success, data } = await fetchCategoryProductsBySort(
      category_id,
      sort
    );
    if (success) {
      setCatProducts(data);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='content lining-nums proportional-nums'>
      <h3 className='font-semibold text-4xl text-colBlack pb-5'>
        {state?.category?.name}
      </h3>
      <div className='flex pb-10 min-h-[420px]'>
        <ProdSidebar
          state={state}
          handleFetchProducts={handleFetchProducts}
          handleFetchAllProducts={handleFetchAllProducts}
        />
        <ProdContent
          catProducts={catProducts}
          isLoading={isLoading}
          state={state}
          handleFetchBySort={handleFetchBySort}
        />
      </div>
      <Promotions />
      <Brands />
      <Advantages />
    </div>
  );
};

export default Products;
