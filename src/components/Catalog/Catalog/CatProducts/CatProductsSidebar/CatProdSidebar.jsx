

import SidebarCategoryTree from "./SidebarCategoryTree";
import SidebarFilters from "./SidebarFilters/SidebarFilters";

const CatProdSidebar = ({ filters, setFilters, resetFilters, filtersIsLoading, setOpen }) => {


 

  return (
    <div className="md:block hidden max-w-[220px] min-w-[220px] w-full mr-5">
      <SidebarCategoryTree />
      <SidebarFilters
        setOpen={setOpen}
        isLoading={filtersIsLoading}
        filters={filters}
        setFilters={setFilters}
resetFilters={resetFilters}
      />
    </div>
  );
};

export default CatProdSidebar;
