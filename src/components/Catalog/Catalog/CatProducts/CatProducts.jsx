import Advantages from '../../../Home/Advantages';
import Brands from '../../../Home/Brands';
import Promotions from '../../../Home/Promotions';
import { useLocation, useParams } from 'react-router-dom';
import CatProdContent from './CatProdContent';
import CatProdSidebar from './CatProdSidebar';
import { useEffect, useState } from 'react';
import { scrollToTop } from '../../../../helpers/scrollToTop/scrollToTop';
import BreadCrumbs from '../../../../helpers/BreadCrumbs/BreadCrumbs';
import {
  fetchAllCategoryProducts,
  fetchCategoryProductsFilter,
  fetchCategoryProductsBySort,
} from '../../../../api/catalog';
import { useGetProductsByCategoryQuery } from '../../../../redux/api/api';

const CatProducts = () => {
  const [page, setPage] = useState(1);
  const { state } = useLocation();
  const { categoryId } = useParams();
  const {
    data,
    isLoading: loading,
    isFetching,
  } = useGetProductsByCategoryQuery(categoryId, page);

  const [breadCrumps, setBreadCrumps] = useState([]);
  const [isLoading, setIsLoading] = useState(loading);
  const [catProducts, setCatProducts] = useState(loading ? [] : data?.data);

  const handleFetchProducts = async (category_id, filters) => {
    setIsLoading(true);
    const { success, data } = await fetchCategoryProductsFilter(
      category_id,
      filters
    );
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

  const handlePagination = (e, p) => {
    setPage(p);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    setCatProducts(data?.data);
  }, [data]);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  return (
    <div className='content lining-nums proportional-nums'>
      <BreadCrumbs breadCrumps={breadCrumps} />
      <h3 className='font-semibold text-4xl text-colBlack pb-5'>
        {state?.category?.name}
      </h3>
      <div className='flex pb-10 min-h-[420px]'>
        <CatProdSidebar
          setBreadCrumps={setBreadCrumps}
          handleFetchProducts={handleFetchProducts}
          handleFetchAllProducts={handleFetchAllProducts}
        />
        <CatProdContent
          catProducts={catProducts}
          isLoading={isLoading || isFetching}
          handleFetchBySort={handleFetchBySort}
          handlePagination={handlePagination}
        />
      </div>
      <Promotions />
      <Brands />
      <Advantages />
    </div>
  );
};

export default CatProducts;
