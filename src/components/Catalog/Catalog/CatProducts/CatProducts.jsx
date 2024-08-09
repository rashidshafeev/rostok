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
import { useGetCategoryTreeQuery, useGetFiltersMutation, useGetProductsByCategoryQuery, useGetVariantsMutation } from '../../../../redux/api/productEndpoints';
import { CatalogProvider, useFilters } from '../../../../context/CatalogContext';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, setSort } from '../../../../redux/slices/filterSlice';

const CatProducts = () => {



  const { categoryId: id } = useParams();
  const dispatch = useDispatch();

  const { data: categoryTree, isSuccess: categoryTreeIsSuccess, isError: categoryTreeIsError, isLoading: categoryTreeIsLoading } = useGetCategoryTreeQuery(id);
  const [breadCrumbs, setBreadCrumbs] = useState([]);

  useEffect(() => {
    setBreadCrumbs(categoryTree?.category_chain);

  },  [categoryTree])
  console.log(categoryTree)

  // const { state, pathname, search } = useLocation();
  // const searchParam = search.startsWith('?')
  //   ? decodeURIComponent(search.slice(1))
  //   : search;
  // const secondUrl = pathname.split('/')[2];
  // const categoryId = secondUrl === 'tags' ? '' : id;

  // const [open, setOpen] = useState(false);

  // const [filterParams, setFilterParams] = useState({
  //   filterOptionsWithPage: {},
  //   sortOption: {},
  // });
  

  // const { filtersContext, sortContext, setFilters: setFiltersContext, setSort: setSortContext } = useFilters();
  // const { data, isLoading: loading } = useGetProductsByCategoryQuery({
  //   categoryId,
  // });
  // console.log("filtersContext catproducts")
  // console.log(filtersContext)




  

  // // const { data, isLoading: loading } = useGetProductsByCategoryQuery({
  // //   categoryId,
  // // });

  // const [filters, setFilters] = useState({
  //   filterOptions: {},
  //   sortOption: null,
  // });
  // const [isLoading, setIsLoading] = useState(loading);
  // const [catProducts, setCatProducts] = useState(loading ? [] : data);

  // // const [open, setOpen] = useState(false);

  // // const [filterParams, setFilterParams] = useState({
  // //   filterOptionsWithPage: {},
  // //   sortOption: {},
  // // });

  // const handleFetchProducts = async (id, filterOptions, sortOption) => {
  //   setIsLoading(true);
  //   const filterOptionsWithPage = {
  //     ...filterOptions,
  //     page,
  //   };
  //   const { success, data } = await fetchCategoryProducts(
  //     id,
  //     filterOptionsWithPage,
  //     sortOption,
  //     filters.selectedValues,
  //     filters.selectedValuesTwo,
  //     secondUrl === 'tags' && searchParam
  //   );
  //   setFilterParams({
  //     filterOptionsWithPage: filterOptionsWithPage,
  //     sortOption: sortOption,
  //   });
  //   if (success) {
  //     setCatProducts(data);
  //   }
  //   setIsLoading(false);
  // };

  // const handleFetchByFilter = (category_id, filterOptions) => {
  //   setFilters((prevFilters) => {
  //     const newFilters = { ...prevFilters, filterOptions };
  //     handleFetchProducts(
  //       category_id,
  //       newFilters.filterOptions,
  //       newFilters.sortOption
  //     );
  //     return newFilters;
  //   });
  // };

  // const handleFetchBySort = (category_id, sortOption) => {
  //   setFilters((prevFilters) => {
  //     const newFilters = { ...prevFilters, sortOption };
  //     handleFetchProducts(
  //       category_id,
  //       newFilters.filterOptions,
  //       newFilters.sortOption
  //     );
  //     return newFilters;
  //   });
  // };

 
  // useEffect(() => {
  //   handleFetchProducts(id, filters.filterOptions, filters.sortOption);
  // }, [page]);

  // useEffect(() => {
  //   if (secondUrl === 'tags') {
  //     const handleFetchProducts = async () => {
  //       setIsLoading(true);
  //       const { success, data } = await fetchCategoryProductsByTags(
  //         searchParam,
  //         page
  //       );
  //       if (success) {
  //         setIsLoading(false);
  //         setCatProducts(data);
  //       }
  //       setIsLoading(false);
  //     };
  //     handleFetchProducts();
  //   }
  // }, [searchParam, secondUrl, page]);

  // useEffect(() => {
  //   scrollToTop();
  // }, []);

  // useEffect(() => {
  //   if (secondUrl !== 'tags') {
  //     setCatProducts(data);
  //   }
  // }, [data, secondUrl]);

  // useEffect(() => {
  //   setIsLoading(loading);
  // }, [loading, categoryId]);

// page (int): номер страницы, начинается с 1 (по умолчанию 1)
// limit (int): количество в списке (по умолчанию 20)
// category_id (int): id категории
// filters (array): список атрибутов в формате [{"1"
// min_price (float): минимальная цена
// max_price (float): максимальная цена
// min_raiting (float): минимальный рейтинг
// max_raiting (float): максимальный рейтинг
// brand (int): Бренд / производитель
// brands (array): список брендов / производителей
// tag (string): Тег / метка
// tags (array): список тегов / меток
// category_id (int): id категории
// id (int): id товара
// search (string): поисковая фраза
// orderBy (string): Сортировка по полю
// sortOrder (string): Направление сортировки


  return (
    <CatalogProvider>
    <div className='content lining-nums proportional-nums'>
      <BreadCrumbs breadCrumps={breadCrumbs} />
      <h3 className='font-semibold text-xl mm:text-2xl lg:text-4xl text-colBlack pb-5'>
        {!categoryTreeIsLoading && categoryTreeIsSuccess && categoryTree?.category?.name}
      </h3>
      <div className='flex pb-10 min-h-[420px]'>
        <CatProdSidebar
          // setBreadCrumps={setBreadCrumps}
          // handleFetchByFilter={handleFetchByFilter}
          // setCatProducts={setCatProducts}
          // setOpen={setOpen}
          // filterParams={filterParams}
        />
        <CatProdContent
          // catProducts={products}
          // isLoading={isLoading}
          // handleFetchBySort={handleFetchBySort}
          // handlePagination={handlePagination}
          // setOpen={setOpen}
        />
      </div>
      <Promotions />
      <Brands />
      <Advantages />
      {/* <AllFiltersModal
        open={open}
        setOpen={setOpen}
        category={id}
        setCatProducts={setCatProducts}
        allFilters={filters}
        setFilters={setFilters}
        filterParams={filterParams}
        setFilterParams={setFilterParams}
      /> */}
    </div>
    </CatalogProvider>
  );
};

export default CatProducts;
