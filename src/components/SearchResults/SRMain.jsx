import Advantages from '../Home/Advantages';
import Brands from '../Home/Brands';
import Promotions from '../Home/Promotions';
import { useParams } from 'react-router-dom';
import SRContent from './SRContent';
import SRSidebar from './SRSidebar';
import { useEffect, useState } from 'react';
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop';
import {
  fetchAllCategoryProducts,
  fetchCategoryProductsFilter,
  fetchCategoryProductsBySort,
} from '../../api/catalog';
import { useGetProductsByCategoryQuery } from '../../redux/api/api';

const SRMain = () => {
  const { categoryId } = useParams();
  const { data, isLoading: loading } =
    useGetProductsByCategoryQuery(categoryId);

  const [products, setProducts] = useState(loading ? [] : data?.data);
  const [isLoading, setIsLoading] = useState(loading);

  const handleFetchProducts = async (category_id, filters) => {
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

  const handleFetchBySort = async (category_id, sort) => {
    setIsLoading(true);
    const { success, data } = await fetchCategoryProductsBySort(
      category_id,
      sort
    );
    if (success) {
      setProducts(data);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    setProducts(data?.data);
  }, [data]);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  return (
    <div className='content lining-nums proportional-nums'>
      <h3 className='font-semibold text-4xl text-colBlack pb-5'>Не указано</h3>
      <div className='flex pb-10 min-h-[420px]'>
        <SRSidebar
          handleFetchProducts={handleFetchProducts}
          handleFetchAllProducts={handleFetchAllProducts}
        />
        <SRContent
          products={products}
          isLoading={isLoading}
          handleFetchBySort={handleFetchBySort}
        />
      </div>
      <Promotions />
      <Brands />
      <Advantages />
    </div>
  );
};

export default SRMain;
