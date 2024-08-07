import CTextField from '../../helpers/CustomInputs/CTextField';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Slider,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Loading } from '../../helpers/Loader/Loader';
import { IOSSwitch } from '../Favorites/styledComponents/IOSSwitch';
import { ArrowIcon } from '../../helpers/Icons';
import { fetchSearchFilters } from '../../api/searchProducts';
import { useLocation } from 'react-router-dom';
import SearchFiltersModal from '../../helpers/CModal/SearchFiltersModal';

const SRSidebar = ({
  filtersValue,
  setFiltersValue,
  setCategories,
  open,
  setOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({});

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  const [sliderValue, setSliderValue] = useState([
    filtersValue.min_price,
    filtersValue.max_price,
  ]);

  const handleSliderChangeCommitted = () => {
    const [newMinPrice, newMaxPrice] = sliderValue;
    const updatedFilters = {
      ...filtersValue,
      min_price: newMinPrice,
      max_price: newMaxPrice,
    };
    setFiltersValue(updatedFilters);
  };

  const handleChange = (name, value) => {
    let updatedFilters = { ...filtersValue };

    if (name === 'min_price' && parseInt(value) > filtersValue.max_price) {
      updatedFilters = {
        ...updatedFilters,
        min_price: parseInt(value),
        max_price: parseInt(value),
      };
    } else if (
      name === 'max_price' &&
      parseInt(value) < filtersValue.min_price
    ) {
      updatedFilters = {
        ...updatedFilters,
        max_price: parseInt(value),
        min_price: parseInt(value),
      };
    } else {
      updatedFilters = {
        ...updatedFilters,
        [name]: value,
      };
    }

    setFiltersValue(updatedFilters);
  };

  const handleCheckboxChange = (name, value) => {
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
    };
    setFiltersValue(true);
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
    <div className='max-w-[220px] min-w-[220px] w-full mr-5 hidden md:block'>
      {isLoading ? (
        <Loading extraStyle='240px' />
      ) : (
        <>
          <div className='sticky top-[70px] border border-colSuperLight rounded-2xl px-3 pb-5 shadow-[0px_15px_20px_0px_rgba(0,_0,_0,_0.05)] mt-2'>
            {filters?.basics?.price && (
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
                  expandIcon={
                    <ArrowIcon className='!w-4 !h-4 rotate-[180deg]' />
                  }
                >
                  <span className='font-semibold text-colBlack'>Цена, ₽</span>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0 }}>
                  <div className='grid grid-cols-2 gap-3 pb-3'>
                    <CTextField
                      label={`от ${filters?.basics?.price?.min}`}
                      name='min_price'
                      type='number'
                      value={filtersValue.min_price}
                      onChange={(e) =>
                        handleChange('min_price', e.target.value)
                      }
                    />
                    <CTextField
                      label={`до ${filters?.basics?.price?.max}`}
                      name='max_price'
                      type='number'
                      value={filtersValue.max_price}
                      onChange={(e) =>
                        handleChange('max_price', e.target.value)
                      }
                    />
                  </div>
                  <Box>
                    <Slider
                      sx={{ color: '#15765B' }}
                      size='small'
                      getAriaLabel={() => 'Price range'}
                      value={[filtersValue?.min_price, filtersValue?.max_price]}
                      min={Number(filters?.basics?.price?.min)}
                      max={Number(filters?.basics?.price?.max)}
                      onChange={(event, newValue) => setSliderValue(newValue)}
                      onMouseUp={handleSliderChangeCommitted}
                      valueLabelDisplay='auto'
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
            )}
            {filters?.basics?.brands?.length > 0 && (
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
                  expandIcon={
                    <ArrowIcon className='!w-4 !h-4 rotate-[180deg]' />
                  }
                >
                  <span className='font-semibold text-colBlack'>
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
                            name='brands'
                            checked={filtersValue.brands.includes(
                              Number(el?.id)
                            )}
                            onChange={() =>
                              handleCheckboxChange(
                                'brands',
                                Number(el?.id) || ''
                              )
                            }
                          />
                        }
                        label={
                          <p className='text-sm font-medium text-colBlack'>
                            {el?.name}
                          </p>
                        }
                      />
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
            )}
            {filters?.basics?.tags?.length > 0 && (
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
                    <ArrowIcon className='!w-4 !h-4 rotate-[180deg]' />
                  }
                >
                  <span className='font-semibold text-colBlack'>Статус</span>
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
                            onChange={() =>
                              handleCheckboxChange('tags', el?.tag)
                            }
                          />
                        }
                        label={
                          <span
                            style={{
                              color: el?.text_color,
                              backgroundColor: el?.background_color,
                            }}
                            className='py-1 px-2 uppercase text-xs font-bold rounded-xl'
                          >
                            {el?.tag}
                          </span>
                        }
                      />
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
            )}
            {filters?.dynamics?.length > 0 &&
              filters?.dynamics?.map((el, index) => (
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
                        <ArrowIcon className='!w-4 !h-4 rotate-[180deg]' />
                      }
                    >
                      <p className='font-semibold text-colBlack line-clamp-2 break-all leading-[120%]'>
                        {el?.name}
                      </p>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: 0 }}>
                      <div className='max-h-40 overflow-hidden overflow-y-scroll scrollable2'>
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
                                <div className='flex space-x-2 items-center'>
                                  {el?.type === 'color' && (
                                    <span
                                      style={{
                                        backgroundColor: val?.color,
                                      }}
                                      className='w-5 h-5 min-w-[20px] rounded-full border border-colGray'
                                    ></span>
                                  )}
                                  <p className='text-sm font-medium text-colBlack line-clamp-1 break-all'>
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
              ))}
            <FormControlLabel
              sx={{ margin: '10px 0' }}
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  defaultChecked
                  onChange={(e) => handleChange('highRating', e.target.checked)}
                />
              }
              labelPlacement='start'
              label={
                <p className='text-sm font-semibold text-colBlack'>
                  Высокий рейтинг
                </p>
              }
            />
            {filters?.more?.length > 0 && (
              <button
                onClick={() => setOpen(true)}
                className='bg-white border border-colGreen w-full rounded-md mb-3 p-2 text-colBlack font-semibold outline-none'
              >
                Все фильтры
              </button>
            )}
            <span
              onClick={handleClearFilters}
              className='text-colDarkGray font-semibold flex justify-center cursor-pointer'
            >
              Очистить фильтр
            </span>
          </div>
        </>
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

export default SRSidebar;
