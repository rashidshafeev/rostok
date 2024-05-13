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
  fetchCategoryProductsFilter,
  fetchCategoryProductsBySort,
} from '../../../../api/catalog';
import { useGetProductsByCategoryQuery } from '../../../../redux/api/api';
import AllFiltersModal from '../../../../helpers/CModal/AllFiltersModal';

const CatProducts = () => {
  const [page, setPage] = useState(1);
  const { state } = useLocation();
  const { categoryId } = useParams();
  const {
    data,
    isLoading: loading,
    refetch,
  } = useGetProductsByCategoryQuery({ categoryId, page });

  const [breadCrumps, setBreadCrumps] = useState([]);
  const [isLoading, setIsLoading] = useState(loading);
  const [open, setOpen] = useState(false);
  const [catProducts, setCatProducts] = useState(loading ? [] : data);

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
    scrollToTop();
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  useEffect(() => {
    setCatProducts(data);
  }, [data]);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  return (
    <div className='content lining-nums proportional-nums'>
      <BreadCrumbs breadCrumps={breadCrumps} />
      <h3 className='font-semibold text-xl mm:text-2xl lg:text-4xl text-colBlack pb-5'>
        {state?.category?.name}
      </h3>
      <div className='flex pb-10 min-h-[420px]'>
        <CatProdSidebar
          setBreadCrumps={setBreadCrumps}
          handleFetchProducts={handleFetchProducts}
          setCatProducts={setCatProducts}
        />
        <CatProdContent
          catProducts={catProducts}
          isLoading={isLoading}
          handleFetchBySort={handleFetchBySort}
          handlePagination={handlePagination}
          setOpen={setOpen}
        />
      </div>
      <Promotions />
      <Brands />
      <Advantages />
      <AllFiltersModal
        open={open}
        setOpen={setOpen}
        category={categoryId}
        setCatProducts={setCatProducts}
      />
    </div>
  );
};

export default CatProducts;
