

import SidebarCategoryTree from "./SidebarCategoryTree";
import SidebarFilters from "./SidebarFilters/SidebarFilters";

import React, { useEffect } from 'react';

const CatProdSidebar = ({
  filters,
        setFiltersModalOpen,
  setFilters,
  filtersIsLoading,
  resetFilters,
  trigger,
  setTrigger,
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
        trigger={trigger}
        setTrigger={setTrigger}
resetFilters={resetFilters}
filtersBlock={filtersBlock}
      />
      </>
  );
};

export default CatProdSidebar;
