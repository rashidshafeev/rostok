import React from 'react';
import { CatalogViewProps } from '@/features/catalog/types';
import CatalogContent from './CatalogContent/CatalogContent';
import CatalogSidebar from './CatalogSidebar/CatalogSidebar';
import Breadcrumbs from '@components/common/Breadcrumbs';
import AllFiltersModal from '@helpers/CModal/AllFiltersModal/AllFiltersModal';
import CatalogCategoryName from './CatalogCategoryName';
import { scrollToTop } from '@utils/scrollToTop';

const CatalogView: React.FC<CatalogViewProps> = ({
  filters,
  sorting,
  pagination,
  products,
  isFiltersLoading,
  isProductsLoading,
  onSortingChange,
  onFiltersChange,
  onPageChange,
  onCategoryChange
}) => {
  const [filtersModalOpen, setFiltersModalOpen] = React.useState(false);

  const handlePagination = (e: React.MouseEvent<unknown>, page: number) => {
    onPageChange(page);
    scrollToTop();
  };

  return (
    <div className="content lining-nums proportional-nums">
      <Breadcrumbs />
      <div className="flex gap-6">
        <CatalogSidebar
          filters={filters}
          isLoading={isFiltersLoading}
          onFiltersChange={onFiltersChange}
        />
        <div className="w-full">
          <CatalogCategoryName />
          <CatalogContent
            products={products?.data || []}
            filters={filters}
            sort={sorting}
            getVariantsIsLoading={isProductsLoading}
            handlePagination={handlePagination}
            handleSort={onSortingChange}
            setFiltersModalOpen={setFiltersModalOpen}
          />
        </div>
      </div>
      <AllFiltersModal
        open={filtersModalOpen}
        setOpen={setFiltersModalOpen}
        filters={filters}
        onFiltersChange={onFiltersChange}
        isLoading={isFiltersLoading}
      />
    </div>
  );
};

export default CatalogView;
