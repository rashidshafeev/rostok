import SidebarCategoryTree from "./SidebarCategoryTree";
import SidebarFilters from "./SidebarFilters/SidebarFilters";
import React from 'react';
import { FiltersState } from "@/types/Filters/FiltersState";
import { SortingParams, PaginationParams } from "@/types/ServerData/Catalog";

interface CatProdSidebarProps {
  filters: FiltersState & {
    page: PaginationParams['page'];
    sort: SortingParams;
  };
  setFilters: (filters: FiltersState & {
    page: PaginationParams['page'];
    sort: SortingParams;
  }) => void;
  setFiltersModalOpen: (open: boolean) => void;
  filtersIsLoading: boolean;
  resetFilters: () => void;
  filtersBlock: boolean;
}

const CatProdSidebar: React.FC<CatProdSidebarProps> = ({
  filters,
  setFilters,
  setFiltersModalOpen,
  filtersIsLoading,
  resetFilters,
  filtersBlock
}) => {
  return (
    <>
      <SidebarCategoryTree />
      <SidebarFilters
        setFiltersModalOpen={setFiltersModalOpen}
        isLoading={filtersIsLoading}
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
        filtersBlock={filtersBlock}
      />
    </>
  );
};

export default CatProdSidebar;
