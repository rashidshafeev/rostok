

import SidebarCategoryTree from "./SidebarCategoryTree";
import SidebarFilters from "./SidebarFilters/SidebarFilters";

import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import FilterItem from "./SidebarFilters/FilterItem";
import { useQueryParams } from "../../../../../utils/queryParamUtils";
import { useFilters } from "../../../../../hooks/useFilters";
const CatProdSidebar = ({ basics, dynamics }) => {

  const { filters, updateFilters, resetAllFilters } = useFilters();
  const { setQueryParams, getQueryParams, resetQueryParams } = useQueryParams();

  useEffect(() => {
    const queryParams = getQueryParams();
    // Check if the filters need to be updated to avoid unnecessary updates
    if (Object.keys(queryParams).length > 0 && JSON.stringify(queryParams) !== JSON.stringify(filters)) {
      // updateFilters(queryParams);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleFilterChange = (filter) => {
    updateFilters(filter);
    setQueryParams(filter);
  };

  const handleResetFilters = () => {
    resetAllFilters();
    resetQueryParams();
  };

  return (
    <div>
      {basics.price && (
        <FilterItem
          type="price"
          filter={basics.price}
          onFilterChange={handleFilterChange}
        />
      )}
      {basics.tags && basics.tags.map((tag, index) => (
        <FilterItem
          key={index}
          type="tag"
          filter={tag}
          onFilterChange={handleFilterChange}
        />
      ))}
      {basics.brands && basics.brands.map((brand, index) => (
        <FilterItem
          key={index}
          type="brand"
          filter={brand}
          onFilterChange={handleFilterChange}
        />
      ))}
      {dynamics && dynamics.map((dynamicFilter, index) => (
        <FilterItem
          key={index}
          type={dynamicFilter.type}
          filter={dynamicFilter}
          onFilterChange={handleFilterChange}
        />
      ))}
      <Button variant="contained" color="secondary" onClick={handleResetFilters}>
        Reset Filters
      </Button>
    </div>
  );
};
 

//   return (
//     <div className="md:block hidden max-w-[220px] min-w-[220px] w-full mr-5">
//       <SidebarCategoryTree />
//       <SidebarFilters
//         setOpen={setOpen}
//         isLoading={filtersIsLoading}
//         filters={filters}
//         setFilters={setFilters}
// resetFilters={resetFilters}
//       />
//     </div>
//   );
// };

export default CatProdSidebar;
