import React from 'react';

import SidebarFiltersSkeleton from '../SidebarFiltersSkeleton';

import BrandsFilter from './BrandsFilter';
import DynamicFilters from './DynamicFilters';
import { HighRatingFilter } from './HighRatingFilter';
import PriceFilter from './PriceFilter';
import TagsFilters from './TagsFilters';

function SidebarFilters({
  setFiltersModalOpen,
  filters,
  setFilters,
  resetFilters,
  isLoading,
  filtersBlock,
}) {
  // const handleChange = (key: string, value: any) => {
  //   setFilters((prev: any) => ({
  //     ...prev,
  //     [key]: value,
  //   }));
  // };

  return (
    <>
      {isLoading ? <SidebarFiltersSkeleton /> : null}
      <div
        className={`${
          isLoading ? 'hidden' : ''
        }  border border-colSuperLight rounded-2xl px-3 pb-5 shadow-[0px_15px_20px_0px_rgba(0,_0,_0,_0.05)] mt-2 relative`}
      >
        {filtersBlock ? (
          <div className="cursor-wait absolute top-0 left-0 w-full h-full bg-white opacity-30 z-10"></div>
        ) : null}
        {filters?.basics?.price ? (
          <PriceFilter filters={filters} setFilters={setFilters} />
        ) : null}
        {filters?.basics?.brands?.length > 0 ? (
          <BrandsFilter filters={filters} setFilters={setFilters} />
        ) : null}
        {filters?.basics?.tags?.length > 0 ? (
          <TagsFilters filters={filters} setFilters={setFilters} />
        ) : null}
        {filters?.dynamics?.length > 0 ? (
          <DynamicFilters filters={filters} setFilters={setFilters} />
        ) : null}
        {/* <HighRatingFilter
          onChange={(checked) => handleChange("highRating", checked)}
          defaultChecked={true}
        /> */}
        {filters?.dynamics?.some((obj) => obj.additional_filter === true) >
        0 ? (
          <button
            onClick={() => setFiltersModalOpen(true)}
            className="bg-white border border-colGreen w-full rounded-md mb-3 p-2 text-colBlack font-semibold outline-none"
          >
            Все фильтры
          </button>
        ) : null}
        <span
          onClick={resetFilters}
          className="text-colDarkGray font-semibold flex justify-center cursor-pointer mt-2"
        >
          Очистить фильтр
        </span>
      </div>
    </>
  );
}

export default SidebarFilters;
