import React from 'react';
import { useLocation } from 'react-router-dom';
import { useGetCategoryTreeQuery } from '@api/productEndpoints';
import { scrollToTop } from '@utils/scrollToTop';
import { Loading } from '@helpers/Loader/Loader';
import ErrorEmpty from '@helpers/Errors/ErrorEmpty';
import Breadcrumbs from '@/components/common/Breadcrumbs';

// Main catalog components
import CatalogMainContent from './CatalogMainContent';
import CatalogMainSidebar from './CatalogMainSidebar';

// Category catalog components
import CatalogSidebar from './CatalogSidebar/CatalogSidebar';
import Catalog from './Catalog';

// Additional components
import Promotions from '@components/Home/Promotions';
import Brands from '@components/Home/Brands';
import Advantages from '@components/Home/Advantages';

const CatalogContainer: React.FC = () => {
  const { pathname } = useLocation();
  const { isLoading, isError, data } = useGetCategoryTreeQuery();
  const isMainCatalog = pathname === '/catalog';

  React.useEffect(() => {
    scrollToTop();
  }, [pathname]);

  if (isLoading) {
    return (
      <div className='content pb-6'>
        <Loading extraStyle='520px' />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='content pb-6'>
        <ErrorEmpty
          title='Что-то пошло не так!'
          desc='Произошла ошибка! Пожалуйста, повторите попытку еще раз.'
          height='420px'
        />
      </div>
    );
  }

  return (
    <div className='content pb-6 lining-nums proportional-nums'>
      {isMainCatalog ? (
        <>
          <Breadcrumbs breadcrumbs={[]} />
          <h1 className='text-3xl mm:text-4xl md:text-[40px] font-semibold text-colBlack'>
            Каталог
          </h1>
          <div className='flex pb-10 pt-3 min-h-[520px]'>
            <CatalogMainSidebar categoryTree={data?.children} />
            <CatalogMainContent categoryTree={data?.children} />
          </div>
        </>
      ) : (
        <Catalog categoryTree={data?.children} />
      )}
import React, { useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { useCatalogOperations } from '@/features/catalog/hooks';
import { 
  selectFilters, 
  selectSorting, 
  selectPagination, 
  selectProducts,
  selectLoadingStates
} from '@/features/catalog/selectors';
import CatalogView from './CatalogView';

const CatalogContainer: React.FC = () => {
  const filters = useAppSelector(selectFilters);
  const sorting = useAppSelector(selectSorting);
  const pagination = useAppSelector(selectPagination);
  const products = useAppSelector(selectProducts);
  const { isFiltersLoading, isProductsLoading } = useAppSelector(selectLoadingStates);
  
  const { 
    updateSorting, 
    updateFilters, 
    updatePage, 
    updateCategory,
    fetchData 
  } = useCatalogOperations();

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CatalogView
      filters={filters}
      sorting={sorting}
      pagination={pagination}
      products={products}
      isFiltersLoading={isFiltersLoading}
      isProductsLoading={isProductsLoading}
      onSortingChange={updateSorting}
      onFiltersChange={updateFilters}
      onPageChange={updatePage}
      onCategoryChange={updateCategory}
    />
  );
};

export default CatalogContainer;
