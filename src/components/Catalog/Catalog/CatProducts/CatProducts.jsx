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
  fetchCategoryProducts,
  fetchCategoryProductsByTags,
} from '../../../../api/catalog';
import { useGetProductsByCategoryQuery } from '../../../../redux/api/api';
import AllFiltersModal from '../../../../helpers/CModal/AllFiltersModal';

const CatProducts = () => {
  const [page, setPage] = useState(1);
  const { categoryId: id } = useParams();
  const { state, pathname, search } = useLocation();
  const searchParam = search.startsWith('?')
    ? decodeURIComponent(search.slice(1))
    : search;
  const secondUrl = pathname.split('/')[2];
  const categoryId = secondUrl === 'tags' ? '' : id;
  const {
    data,
    isLoading: loading,
    refetch,
  } = useGetProductsByCategoryQuery({ categoryId, page });

  const [breadCrumps, setBreadCrumps] = useState([]);
  const [isLoading, setIsLoading] = useState(loading);
  const [open, setOpen] = useState(false);
  const [catProducts, setCatProducts] = useState(loading ? [] : data);
  const [filters, setFilters] = useState({
    filterOptions: {},
    sortOption: null,
  });
  const handleFetchProducts = async (id, filterOptions, sortOption) => {
    setIsLoading(true);
    const { success, data } = await fetchCategoryProducts(
      id,
      filterOptions,
      sortOption,
      filters.selectedValues,
      filters.selectedValuesTwo,
      secondUrl === 'tags' && searchParam
    );
    if (success) {
      setCatProducts(data);
    }
    setIsLoading(false);
  };

  const handleFetchByFilter = (category_id, filterOptions) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, filterOptions };
      handleFetchProducts(
        category_id,
        newFilters.filterOptions,
        newFilters.sortOption
      );
      return newFilters;
    });
  };

  const handleFetchBySort = (category_id, sortOption) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, sortOption };
      handleFetchProducts(
        category_id,
        newFilters.filterOptions,
        newFilters.sortOption
      );
      return newFilters;
    });
  };

  const handlePagination = (e, p) => {
    setPage(p);
    scrollToTop();
  };

  useEffect(() => {
    if (secondUrl === 'tags') {
      const handleFetchProducts = async () => {
        setIsLoading(true);
        const { success, data } = await fetchCategoryProductsByTags(
          searchParam,
          page
        );
        if (success) {
          setIsLoading(false);
          setCatProducts(data);
        }
        setIsLoading(false);
      };
      handleFetchProducts();
    }
  }, [searchParam, secondUrl, page]);

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  useEffect(() => {
    if (secondUrl !== 'tags') {
      setCatProducts(data);
    }
  }, [data, secondUrl]);

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
          handleFetchByFilter={handleFetchByFilter}
          setOpen={setOpen}
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
        category={id}
        setCatProducts={setCatProducts}
        allFilters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};

export default CatProducts;
