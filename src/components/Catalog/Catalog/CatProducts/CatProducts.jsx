import Advantages from '../../../Home/Advantages';
import Brands from '../../../Home/Brands';
import Promotions from '../../../Home/Promotions';
import { useLocation, useParams } from 'react-router-dom';
import CatProdContent from './CatProdContent';
import CatProdSidebar from './CatProductsSidebar/CatProdSidebar';
import { useEffect, useState } from 'react';
import { scrollToTop } from '../../../../helpers/scrollToTop/scrollToTop';
import BreadCrumbs from '../../../../helpers/BreadCrumbs/BreadCrumbs';
import {
  fetchCategoryProducts,
  fetchCategoryProductsByTags,
} from '../../../../api/catalog';

import AllFiltersModal from '../../../../helpers/CModal/AllFiltersModal';
import { useGetProductsByCategoryQuery } from '../../../../redux/api/productEndpoints';

const CatProducts = () => {
  const [page, setPage] = useState(1);
  const { categoryId: id } = useParams();
  const { state, pathname, search } = useLocation();
  const searchParam = search.startsWith('?')
    ? decodeURIComponent(search.slice(1))
    : search;
  const secondUrl = pathname.split('/')[2];
  const categoryId = secondUrl === 'tags' ? '' : id;

  const [open, setOpen] = useState(false);

  const [filterParams, setFilterParams] = useState({
    filterOptionsWithPage: {},
    sortOption: {},
  });


  // const { data, isLoading: loading } = useGetProductsByCategoryQuery({
  //   categoryId,
  // });
  const { data, isLoading: loading } = useGetProductsByCategoryQuery({
    categoryId,
  });

  const [filters, setFilters] = useState({
    filterOptions: {},
    sortOption: null,
  });
  const [breadCrumps, setBreadCrumps] = useState([]);
  const [isLoading, setIsLoading] = useState(loading);
  const [catProducts, setCatProducts] = useState(loading ? [] : data);

  // const [open, setOpen] = useState(false);

  // const [filterParams, setFilterParams] = useState({
  //   filterOptionsWithPage: {},
  //   sortOption: {},
  // });

  const handleFetchProducts = async (id, filterOptions, sortOption) => {
    setIsLoading(true);
    const filterOptionsWithPage = {
      ...filterOptions,
      page,
    };
    const { success, data } = await fetchCategoryProducts(
      id,
      filterOptionsWithPage,
      sortOption,
      filters.selectedValues,
      filters.selectedValuesTwo,
      secondUrl === 'tags' && searchParam
    );
    setFilterParams({
      filterOptionsWithPage: filterOptionsWithPage,
      sortOption: sortOption,
    });
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
    handleFetchProducts(id, filters.filterOptions, filters.sortOption);
  }, [page]);

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
    if (secondUrl !== 'tags') {
      setCatProducts(data);
    }
  }, [data, secondUrl]);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading, categoryId]);

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
          setCatProducts={setCatProducts}
          setOpen={setOpen}
          filterParams={filterParams}
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
        filterParams={filterParams}
        setFilterParams={setFilterParams}
      />
    </div>
  );
};

export default CatProducts;
