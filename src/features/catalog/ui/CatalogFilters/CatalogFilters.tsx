// src/features/catalog/ui/CatalogFilters/CatalogFilters.tsx

import { memo } from 'react';

import { FormControlLabel } from '@mui/material';

import { FilterGroup, FilterCheckbox, PriceRange } from '@/entities/filter/ui';
import { checkCloseToWhite } from '@/shared/lib';
import { IOSSwitch } from '@/shared/ui';

import type { FiltersState } from '@/entities/filter';

interface CatalogFiltersProps {
  filters: FiltersState;
  onFilterChange: (
    filterType: string,
    filterId: number | string,
    value: any
  ) => void;
  onPriceChange: (values: { min: number; max: number }) => void;
  onReset: () => void;
  onShowMore?: () => void;
  isLoading?: boolean;
  className?: string;
}

export const CatalogFilters = memo(
  ({
    filters,
    onFilterChange,
    onPriceChange,
    onReset,
    onShowMore,
    isLoading,
    className = '',
  }: CatalogFiltersProps) => {
    if (isLoading) {
      return (
        <div className="flex flex-col gap-2 mt-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-24 mb-2" />
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <div className="h-4 w-4 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded w-32" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    const hasMoreFilters = filters.dynamics?.some(
      (obj) => obj.additional_filter === true
    );

    return (
      <div
        className={`${className} border border-colSuperLight rounded-2xl px-3 pb-5 shadow-[0px_15px_20px_0px_rgba(0,_0,_0,_0.05)]`}
      >
        {/* Price Filter */}
        {filters.basics?.price ? (
          <FilterGroup title="Цена, ₽">
            <PriceRange
              min={filters.basics.price.min}
              max={filters.basics.price.max}
              value={[
                filters.basics.price.current_values?.min ||
                  filters.basics.price.min,
                filters.basics.price.current_values?.max ||
                  filters.basics.price.max,
              ]}
              onChange={(values) => onPriceChange(values)}
            />
          </FilterGroup>
        ) : null}

        {/* Brands Filter */}
        {filters.basics?.brands?.length > 0 ? (
          <FilterGroup title="Бренд">
            <div className="max-h-40 overflow-y-auto scrollable2">
              {filters.basics.brands.map((brand) => (
                <FilterCheckbox
                  key={brand.id}
                  label={brand.name}
                  checked={brand.is_selected}
                  disabled={!brand.is_active}
                  onChange={() =>
                    onFilterChange('brand', brand.id, !brand.is_selected)
                  }
                  className="w-full"
                />
              ))}
            </div>
          </FilterGroup>
        ) : null}

        {/* Tags Filter */}
        {filters.basics?.tags?.length > 0 ? (
          <FilterGroup title="Статус">
            {filters.basics.tags.map((tag, index) => (
              <FilterCheckbox
                key={index}
                label={
                  <span
                    style={{
                      color: tag.text_color,
                      backgroundColor: tag.background_color,
                    }}
                    className="py-1 px-2 uppercase text-xs font-bold rounded-xl"
                  >
                    {tag.tag}
                  </span>
                }
                checked={tag.is_selected}
                disabled={!tag.is_active}
                onChange={() =>
                  onFilterChange('tag', tag.tag, !tag.is_selected)
                }
                className="w-full"
              />
            ))}
          </FilterGroup>
        ) : null}

        {/* Dynamic Filters */}
        {filters.dynamics?.map((filter) => {
          if (filter.additional_filter) return null;

          return (
            <FilterGroup key={filter.id} title={filter.name}>
              <div className="max-h-40 overflow-y-auto scrollable2">
                {filter.values.map((value) => (
                  <FilterCheckbox
                    key={value.id}
                    label={
                      filter.type === 'color' ? (
                        <div className="flex items-center">
                          {value.second_color ? (
                            <div className="flex">
                              <div
                                className={`min-w-[10px] min-h-[20px] rounded-tl-full rounded-bl-full ${
                                  checkCloseToWhite(value.color)
                                    ? 'border-l border-colGray'
                                    : ''
                                }`}
                                style={{ backgroundColor: value.color }}
                              />
                              <div
                                className={`min-w-[10px] min-h-[20px] rounded-tr-full rounded-br-full ${
                                  checkCloseToWhite(value.second_color)
                                    ? 'border-r border-colGray'
                                    : ''
                                }`}
                                style={{ backgroundColor: value.second_color }}
                              />
                            </div>
                          ) : (
                            <span
                              className={`min-w-[20px] min-h-[20px] rounded-full ${
                                checkCloseToWhite(value.color)
                                  ? 'border border-colGray'
                                  : ''
                              }`}
                              style={{ backgroundColor: value.color }}
                            />
                          )}
                          <span className="ml-2">{value.text}</span>
                        </div>
                      ) : (
                        value.text
                      )
                    }
                    checked={value.is_selected}
                    disabled={!value.is_active}
                    onChange={() =>
                      onFilterChange('dynamic', filter.id, value.id)
                    }
                    className="w-full"
                  />
                ))}
              </div>
            </FilterGroup>
          );
        })}

        {/* Rating Filter */}
        <FormControlLabel
          sx={{ margin: '10px 0' }}
          control={
            <IOSSwitch
              sx={{ m: 1 }}
              defaultChecked
              onChange={(e) =>
                onFilterChange('rating', 'high', e.target.checked)
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

        {/* Show More Button */}
        {hasMoreFilters ? (
          <button
            onClick={onShowMore}
            className="bg-white border border-colGreen w-full rounded-md mb-3 p-2 text-colBlack font-semibold outline-none"
          >
            Все фильтры
          </button>
        ) : null}

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="w-full text-colDarkGray font-semibold hover:text-colBlack"
        >
          Очистить фильтр
        </button>
      </div>
    );
  }
);

CatalogFilters.displayName = 'CatalogFilters';
