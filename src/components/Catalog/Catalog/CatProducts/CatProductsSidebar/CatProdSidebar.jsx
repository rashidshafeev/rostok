

import SidebarCategoryTree from "./SidebarCategoryTree";
import SidebarFilters from "./SidebarFilters/SidebarFilters";

import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { useQueryParams } from "../../../../../utils/queryParamUtils";

const CatProdSidebar = ({
  filters,
  setFilters,
  filtersIsLoading,
  resetFilters,
  trigger,
  setTrigger,
  filtersBlock
}) => {

  return (
    <div className="md:block hidden max-w-[220px] min-w-[220px] w-full mr-5">
      <SidebarCategoryTree />
      <SidebarFilters
        // setOpen={setOpen}
        isLoading={filtersIsLoading}
        filters={filters}
        setFilters={setFilters}
        trigger={trigger}
        setTrigger={setTrigger}
resetFilters={resetFilters}
filtersBlock={filtersBlock}
      />
    </div>
  );
};

export default CatProdSidebar;
