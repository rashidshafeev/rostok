// src/widgets/catalog/ui/CatalogWidget/CatalogWidget.tsx

import { memo } from 'react';

import { useParams } from 'react-router-dom';

import { Advantages } from '@/components/Home/Advantages';
import { Brands } from '@/components/Home/Brands';
import { Promotions } from '@/components/Home/Promotions';
import {
  CatalogFilters,
  CatalogSort,
  CatalogView,
  CatalogError,
  CatalogEmpty,
  CatalogLoadingState,
  CustomPagination,
  useCatalog,
  ProductList,
} from '@/features/catalog';
import { AllFiltersModal } from '@/features/modals';
import filterIcon from '@/shared/assets/icons/filter.svg';
import { Breadcrumbs } from '@/widgets/breadcrumbs';

interface CatalogWidgetProps {
  className?: string;
}

export const CatalogWidget = memo(({ className = '' }: CatalogWidgetProps) => {
  const { categoryId } = useParams();

  const {
    products,
    filters,
    sort,
    view,
    pagination,
    isFiltersLoading,
    isProductsLoading,
    filtersModalOpen,
    error,
    updateFilters,
    handleSortChange,
    handleViewChange,
    handlePaginationChange,
    handleReset,
    setFiltersModalOpen,
    retryLoading,
  } = useCatalog(categoryId);

  // Handle error state
  if (error && !isProductsLoading) {
    return <CatalogError onRetry={retryLoading} className={className} />;
  }

  return (
    <div className={`min-h-[420px] ${className}`}>
      <div className="content lining-nums proportional-nums">
        <Breadcrumbs />

        <div className="flex gap-3">
          <h1 className="font-semibold text-xl mm:text-2xl lg:text-4xl text-colBlack pb-5">
            {filters.category?.name}
          </h1>
          {products?.length > 0 ? (
            <span className="text-colDarkGray">{pagination.total}</span>
          ) : null}
        </div>

        <div className="flex pb-10">
          {/* Sidebar Filters (Desktop) */}
          <div className="md:block hidden basis-1/4 mr-5">
            <CatalogFilters
              filters={filters}
              onFilterChange={(type, id, value) =>
                updateFilters({ type, id, value })
              }
              onPriceChange={(values) =>
                updateFilters({ type: 'price', values })
              }
              onReset={handleReset}
              onShowMore={() => setFiltersModalOpen(true)}
              isLoading={isFiltersLoading}
              className={
                isFiltersLoading ? 'opacity-60 pointer-events-none' : ''
              }
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="sticky ll:static top-[76px] ll:top-auto flex justify-between items-center pb-3 xl:pb-0 bg-white z-10">
              <CatalogSort
                currentSort={sort}
                onSortChange={handleSortChange}
                className="hidden ll:flex"
                disabled={isProductsLoading}
              />

              <div className="flex items-center space-x-4">
                <CatalogView
                  currentView={view.type}
                  onViewChange={handleViewChange}
                  disabled={isProductsLoading}
                />

                {/* Mobile Filter Button */}
                <button
                  onClick={() => setFiltersModalOpen(true)}
                  className="flex md:hidden items-center outline-none bg-transparent"
                  disabled={isFiltersLoading}
                >
                  <img src={filterIcon} alt="Фильтры" />
                  <span className="text-colBlack text-xs font-medium">
                    Фильтры
                  </span>
                </button>
              </div>
            </div>

            {/* Product List States */}
            {isProductsLoading ? (
              <CatalogLoadingState view={view.type} />
            ) : products?.length > 0 ? (
              <>
                <ProductList products={products} view={view.type} />

                {pagination.total > pagination.limit ? (
                  <CustomPagination
                    page={pagination.page}
                    count={pagination.total}
                    handlePagination={handlePaginationChange}
                    className="mt-8"
                  />
                ) : null}
              </>
            ) : (
              <CatalogEmpty onReset={handleReset} />
            )}
          </div>
        </div>

        <AllFiltersModal
          open={filtersModalOpen}
          setOpen={setFiltersModalOpen}
          filters={filters}
          onFilterChange={updateFilters}
          onReset={handleReset}
          isLoading={isFiltersLoading}
        />

        <Promotions />
        <Brands />
        <Advantages />
      </div>
    </div>
  );
});

CatalogWidget.displayName = 'CatalogWidget';
