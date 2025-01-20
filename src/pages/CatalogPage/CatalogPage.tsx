import type React from 'react';
import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { useGetCategoryTreeQuery } from '@/entities/category';
import { scrollToTop } from '@/shared/lib/scrollToTop';
import { Loading } from '@/shared/ui/Loader';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { Catalog } from '@components/Catalog/Catalog';
import { CatalogMainContent } from '@components/Catalog/CatalogMainContent';
import { CatalogMainSidebar } from '@components/Catalog/CatalogMainSidebar';
import { CatalogSidebar } from '@components/Catalog/CatalogSidebar/CatalogSidebar';
import { Advantages } from '@components/Home/Advantages';
import { Brands } from '@components/Home/Brands';
import { Promotions } from '@components/Home/Promotions';

// Main catalog components

// Category catalog components
import ErrorEmpty from '@helpers/Errors/ErrorEmpty';

const CatalogPage: React.FC = () => {
  const { pathname } = useLocation();
  const { isLoading, isError, data } = useGetCategoryTreeQuery();
  const isMainCatalog = pathname === '/catalog';

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  if (isLoading) {
    return (
      <div className="content pb-6">
        <Loading extraStyle="520px" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="content pb-6">
        <ErrorEmpty
          title="Что-то пошло не так!"
          desc="Произошла ошибка! Пожалуйста, повторите попытку еще раз."
          height="420px"
        />
      </div>
    );
  }

  return (
    <div className="content pb-6 lining-nums proportional-nums">
      <Breadcrumbs breadcrumbs={[]} />
      <h1 className="text-3xl mm:text-4xl md:text-[40px] font-semibold text-colBlack">
        Каталог
      </h1>

      <div className="flex pb-10 pt-3 min-h-[520px]">
        {isMainCatalog ? (
          <>
            <CatalogMainSidebar categoryTree={data?.children} />
            <CatalogMainContent categoryTree={data?.children} />
          </>
        ) : (
          <>
            <CatalogSidebar categoryTree={data?.children} />
            <Catalog categoryTree={data?.children} />
          </>
        )}
      </div>

      <Promotions />
      <Brands />
      <Advantages />
    </div>
  );
};

export default CatalogPage;
