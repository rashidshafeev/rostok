import type React from 'react';
import type { SetStateAction, Dispatch } from 'react';
import { useState, useEffect } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Slider,
} from '@mui/material';
import { useLocation } from 'react-router-dom';

import SearchFiltersModal from '@/features/modals/ui/modals/SearchFiltersModal';
import { IOSSwitch } from '@/shared/ui';
import { ArrowIcon } from '@/shared/ui/icons';
import { CTextField } from '@/shared/ui/inputs/CTextField';
import { Loading } from '@/shared/ui/Loader';

import { fetchSearchFilters } from '../../api/searchProducts';

import type { ProductListCategoryChain } from '@/entities/category/ProductListCategoryChain';

interface Filters {
  basics?: {
    price?: { min: number; max: number };
    brands?: { id: number; name: string }[];
    tags?: { tag: string; text_color: string; background_color: string }[];
  };
  dynamics?: {
    id: string;
    name: string;
    type: string;
    values: { id: number; text: string; color?: string }[];
  }[];
  more?: any[];
}

interface SRSidebarProps {
  filtersValue: {
    highRating: boolean;
    brands: number[];
    tags: string[];
    min_price: number;
    max_price: number;
    category_id: string;
  };
  setFiltersValue: Dispatch<
    SetStateAction<{
      highRating: boolean;
      brands: number[];
      tags: string[];
      min_price: number;
      max_price: number;
      category_id: string;
    }>
  >;
  setCategories: Dispatch<SetStateAction<ProductListCategoryChain[]>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const SRSidebar: React.FC<SRSidebarProps> = ({
  filtersValue,
  setFiltersValue,
  setCategories,
  open,
  setOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({});

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  const [sliderValue, setSliderValue] = useState([
    filtersValue.min_price,
    filtersValue.max_price,
  ]);

  const handleSliderChangeCommitted = (event: any, newValue: number[]) => {
    setSliderValue(newValue);
    setFiltersValue({
      ...filtersValue,
      min_price: newValue[0],
      max_price: newValue[1],
    });
  };

  const handleChange = (name: string, value: string | number | boolean) => {
    setFiltersValue({
      ...filtersValue,
      [name]: value,
    });
  };

  const handleCheckboxChange = (name: string, value: number | string) => {
    const updatedFilters = {
      ...filtersValue,
      [name]: filtersValue[name]?.includes(value)
        ? filtersValue[name].filter((item) => item !== value)
        : [...(filtersValue[name] || []), value],
    };

    if (
      updatedFilters[name].length === 0 &&
      filters?.dynamics?.some((el) => el.id === name)
    ) {
      delete updatedFilters[name];
    }

    setFiltersValue(updatedFilters);
  };

  const handleClearFilters = () => {
    const initialFiltersState = {
      highRating: true,
      brands: [],
      tags: [],
      min_price: 0,
      max_price: 900000,
      category_id: '',
    };
    setFiltersValue(initialFiltersState);
  };

  useEffect(() => {
    const handleSearchResults = async () => {
      setIsLoading(true);
      const { success, data } = await fetchSearchFilters(searchQuery);
      if (success) {
        setFilters(data);
        setFiltersValue((prev) => ({
          ...prev,
          min_price: Number(data?.basics?.price?.min || prev.min_price),
          max_price: Number(data?.basics?.price?.max || prev.max_price),
        }));
        setCategories(data?.categories);
        setIsLoading(false);
      } else {
        setFilters(data);
        setCategories([]);
        setIsLoading(false);
      }
    };
    handleSearchResults();
  }, [searchQuery, setCategories, setFiltersValue]);

  return (
    <div className="max-w-[220px] min-w-[220px] w-full mr-5 hidden md:block">
      {isLoading ? (
        <Loading extraStyle="240px" />
      ) : (
        <div className="sticky top-[70px] border border-colSuperLight rounded-2xl px-3 pb-5 shadow-[0px_15px_20px_0px_rgba(0,_0,_0,_0.05)] mt-2">
          {filters?.basics?.price ? (
            <Accordion
              sx={{
                boxShadow: 'none',
                padding: 0,
                margin: 0,
                border: 'none',
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  margin: 0,
                },
              }}
              defaultExpanded
            >
              <AccordionSummary
                sx={{ padding: 0, minHeight: 0 }}
                expandIcon={<ArrowIcon className="!w-4 !h-4 rotate-[180deg]" />}
              >
                <span className="font-semibold text-colBlack">Цена, ₽</span>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                <div className="grid grid-cols-2 gap-3 pb-3">
                  <CTextField
                    label={`от ${filters?.basics?.price?.min}`}
                    name="min_price"
                    type="number"
                    value={filtersValue.min_price}
                    onChange={(e) => handleChange('min_price', e.target.value)}
                  />
                  <CTextField
                    label={`до ${filters?.basics?.price?.max}`}
                    name="max_price"
                    type="number"
                    value={filtersValue.max_price}
                    onChange={(e) => handleChange('max_price', e.target.value)}
                  />
                </div>
                <Box>
                  <Slider
                    sx={{ color: '#15765B' }}
                    size="small"
                    getAriaLabel={() => 'Price range'}
                    value={[filtersValue.min_price, filtersValue.max_price]}
                    min={Number(filters?.basics?.price?.min)}
                    max={Number(filters?.basics?.price?.max)}
                    onChange={handleSliderChangeCommitted}
                    valueLabelDisplay="auto"
                  />
                </Box>
              </AccordionDetails>
            </Accordion>
          ) : null}
          {filters?.basics?.brands?.length > 0 ? (
            <Accordion
              sx={{
                boxShadow: 'none',
                '&:before': {
                  display: 'none',
                },
              }}
              defaultExpanded
            >
              <AccordionSummary
                sx={{
                  padding: 0,
                }}
                style={{ minHeight: 0 }}
                expandIcon={<ArrowIcon className="!w-4 !h-4 rotate-[180deg]" />}
              >
                <span className="font-semibold text-colBlack">
                  Производитель
                </span>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                {filters?.basics?.brands?.map((el) => (
                  <div key={el?.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          style={{
                            color: '#15765B',
                            padding: '5px',
                          }}
                          name="brands"
                          checked={filtersValue.brands.includes(Number(el?.id))}
                          onChange={() =>
                            handleCheckboxChange('brands', Number(el?.id) || 0)
                          }
                        />
                      }
                      label={
                        <p className="text-sm font-medium text-colBlack">
                          {el?.name}
                        </p>
                      }
                    />
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          ) : null}
          {filters?.basics?.tags?.length > 0 ? (
            <Accordion
              sx={{
                boxShadow: 'none',
                padding: 0,
              }}
              defaultExpanded
            >
              <AccordionSummary
                sx={{ padding: 0 }}
                style={{ minHeight: 0 }}
                expandIcon={<ArrowIcon className="!w-4 !h-4 rotate-[180deg]" />}
              >
                <span className="font-semibold text-colBlack">Статус</span>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                {filters?.basics?.tags?.map((el, index) => (
                  <div key={index}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          style={{
                            color: '#15765B',
                            padding: '5px',
                          }}
                          checked={filtersValue.tags.includes(el?.tag)}
                          onChange={() => handleCheckboxChange('tags', el?.tag)}
                        />
                      }
                      label={
                        <span
                          style={{
                            color: el?.text_color,
                            backgroundColor: el?.background_color,
                          }}
                          className="py-1 px-2 uppercase text-xs font-bold rounded-xl"
                        >
                          {el?.tag}
                        </span>
                      }
                    />
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          ) : null}
          {filters?.dynamics?.length > 0
            ? filters?.dynamics?.map((el, index) => (
                <div key={index}>
                  <Accordion
                    sx={{
                      boxShadow: 'none',
                      padding: 0,
                    }}
                    defaultExpanded
                  >
                    <AccordionSummary
                      sx={{ padding: 0 }}
                      style={{ minHeight: 0 }}
                      expandIcon={
                        <ArrowIcon className="!w-4 !h-4 rotate-[180deg]" />
                      }
                    >
                      <p className="font-semibold text-colBlack line-clamp-2 break-all leading-[120%]">
                        {el?.name}
                      </p>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: 0 }}>
                      <div className="max-h-40 overflow-hidden overflow-y-scroll scrollable2">
                        {el?.values?.map((val) => (
                          <div key={val?.id}>
                            <FormControlLabel
                              sx={{ margin: '0' }}
                              control={
                                <Checkbox
                                  style={{
                                    color: '#15765B',
                                    padding: '5px',
                                  }}
                                  name={el?.name}
                                  onChange={() =>
                                    handleCheckboxChange(el?.id, val?.id)
                                  }
                                />
                              }
                              label={
                                <div className="flex space-x-2 items-center">
                                  {el?.type === 'color' ? (
                                    <span
                                      style={{
                                        backgroundColor: val?.color,
                                      }}
                                      className="w-5 h-5 min-w-[20px] rounded-full border border-colGray"
                                    ></span>
                                  ) : null}
                                  <p className="text-sm font-medium text-colBlack line-clamp-1 break-all">
                                    {val?.text}
                                  </p>
                                </div>
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              ))
            : null}
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
          {filters?.more?.length > 0 ? (
            <button
              onClick={() => setOpen(true)}
              className="bg-white border border-colGreen w-full rounded-md mb-3 p-2 text-colBlack font-semibold outline-none"
            >
              Все фильтры
            </button>
          ) : null}
          <span
            onClick={handleClearFilters}
            className="text-colDarkGray font-semibold flex justify-center cursor-pointer"
          >
            Очистить фильтр
          </span>
        </div>
      )}
      <SearchFiltersModal
        open={open}
        setOpen={setOpen}
        filters={filters}
        filterLoading={isLoading}
        setFiltersValue={setFiltersValue}
      />
    </div>
  );
};
