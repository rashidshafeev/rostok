import React from 'react';

import { Box, Checkbox, FormControlLabel, Modal, Slider } from '@mui/material';

import { IOSSwitch } from '@/shared/ui';
import BrandsFilter from '@components/Catalog/CatalogSidebar/SidebarFilters/BrandsFilter';
import DynamicFilters from '@components/Catalog/CatalogSidebar/SidebarFilters/DynamicFilters';
import PriceFilter from '@components/Catalog/CatalogSidebar/SidebarFilters/PriceFilter';
import TagsFilters from '@components/Catalog/CatalogSidebar/SidebarFilters/TagsFilters';
import SidebarFiltersSkeleton from '@components/Catalog/CatalogSidebar/SidebarFiltersSkeleton';

export const AllFiltersModal = ({
  categoryTree,
  open,
  setOpen,
  filters,
  setFilters,
  trigger,
  setTrigger,
  resetFilters,
  filtersIsLoading,
  filtersBlock,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full mm:w-[95%] lg:w-[85%] h-full mm:h-[95%] lg:h-[90%] lining-nums proportional-nums bg-white outline-none rounded-lg border-none p-[12px_4px_12px_12px] lg:p-[24px_4px_24px_24px] overflow-x-auto">
        <div className="flex flex-col justify-between h-full">
          <div className="h-[90%]">
            <div className="flex justify-between items-center pr-3 lg:pr-5">
              <h2 className="text-colBlack text-2xl lg:text-3xl font-semibold">
                {/* {!categoryTreeIsLoading &&
          categoryTreeIsSuccess &&
          categoryTree?.category?.name} */}
                {categoryTree?.category?.name}
              </h2>

              <span
                onClick={() => setOpen(false)}
                className="text-4xl lg:text-5xl text-colGray font-light cursor-pointer"
              >
                &times;
              </span>
            </div>
            {filtersIsLoading ? <SidebarFiltersSkeleton /> : null}
            <div
              className={`${
                filtersIsLoading ? 'hidden' : ''
              }  border border-colSuperLight rounded-2xl px-3 pb-5 shadow-[0px_15px_20px_0px_rgba(0,_0,_0,_0.05)] mt-2 relative flex flex-wrap gap-5`}
            >
              {filtersBlock ? (
                <div className=" cursor-wait absolute top-0 left-0 w-full h-full bg-white opacity-30 z-10"></div>
              ) : null}
              {filters?.basics?.price ? (
                <div className=" sm:basis-[calc(33%-(20px*2/3))] md:basis-[calc(25%-(20px*3/4))]">
                  <PriceFilter
                    filters={filters}
                    setFilters={setFilters}
                    trigger={trigger}
                    setTrigger={setTrigger}
                  />
                </div>
              ) : null}

              {filters?.basics?.brands?.length > 0 ? (
                <div className="sm:basis-[calc(33%-(20px*2/3))] md:basis-[calc(25%-(20px*3/4))]">
                  <BrandsFilter filters={filters} setFilters={setFilters} />
                </div>
              ) : null}
              {filters?.basics?.tags?.length > 0 ? (
                <div className="sm:basis-[calc(33%-(20px*2/3))] md:basis-[calc(25%-(20px*3/4))]">
                  <TagsFilters filters={filters} setFilters={setFilters} />
                </div>
              ) : null}
              {filters?.dynamics?.length > 0 ? (
                <DynamicFilters
                  filters={filters}
                  setFilters={setFilters}
                  hideAdditional={false}
                />
              ) : null}
              <FormControlLabel
                sx={{ margin: '10px 0' }}
                control={
                  <IOSSwitch
                    sx={{ m: 1 }}
                    defaultChecked
                    onChange={(e) =>
                      handleChange('highRating', e.target.checked)
                    }
                  />
                }
                labelPlacement="start"
                label={
                  <p className="text-sm font-semibold text-colBlack">
                    Высокий рейтинг
                  </p>
                }
              />
              {filters?.more?.length > 0 ? (
                <button
                  onClick={() => setOpen(true)}
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
          </div>
        </div>
      </Box>
    </Modal>
  );
};

