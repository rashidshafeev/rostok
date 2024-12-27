import React from 'react';

import { FormControlLabel } from '@mui/material';

import { IOSSwitch } from '@components/common/styledComponents/IOSSwitch';

import SidebarFiltersSkeleton from '../SidebarFiltersSkeleton';

import BrandsFilter from './BrandsFilter';
import DynamicFilters from './DynamicFilters';
import PriceFilter from './PriceFilter';
import TagsFilters from './TagsFilters';

function SidebarFilters({
  setFiltersModalOpen,
  filters,
  setFilters,
  resetFilters,
  isLoading,
  trigger,
  setTrigger,
  filtersBlock,
}) {
  return (
    <>
      {isLoading ? <SidebarFiltersSkeleton /> : null}
      <div
        className={`${
          isLoading ? 'hidden' : ''
        }  border border-colSuperLight rounded-2xl px-3 pb-5 shadow-[0px_15px_20px_0px_rgba(0,_0,_0,_0.05)] mt-2 relative`}
      >
        {filtersBlock ? (
          <div className=" cursor-wait absolute top-0 left-0 w-full h-full bg-white opacity-30 z-10"></div>
        ) : null}
        {filters?.basics?.price ? (
          <PriceFilter
            filters={filters}
            setFilters={setFilters}
            trigger={trigger}
            setTrigger={setTrigger}
          />
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
        <FormControlLabel
          sx={{ margin: '10px 0' }}
          control={
            <IOSSwitch
              sx={{ m: 1 }}
              defaultChecked
              onChange={(e) => handleChange('highRating', e.target.checked)}
            />
          }
          labelPlacement="start"
          label={
            <p className="text-sm font-semibold text-colBlack">
              Высокий рейтинг
            </p>
          }
        />
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
          className="text-colDarkGray font-semibold flex justify-center cursor-pointer"
        >
          Очистить фильтр
        </span>
      </div>
    </>
  );
}

export default SidebarFilters;
