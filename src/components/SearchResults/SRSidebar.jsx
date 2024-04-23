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
  handleFetchAllProducts,
  filtersValue,
  setFiltersValue,
  setCategories,
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

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

  const handleSliderChange = (newValue) => {
    const [newMinPrice, newMaxPrice] = newValue;
    const updatedFilters = {
      ...filtersValue,
      min_price: newMinPrice,
      max_price: newMaxPrice,
    };
    setFiltersValue(updatedFilters);
  };

  const handleCheckboxChange = (name, value) => {
    const updatedFilters = {
      ...filtersValue,
      [name]: filtersValue[name].includes(value)
        ? filtersValue[name].filter((item) => item !== value)
        : [...filtersValue[name], value],
    };
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
        setCategories(data?.categories);
        setIsLoading(false);
      } else {
        setFilters(data);
        setCategories([]);
        setIsLoading(false);
      }
    };
    handleSearchResults();
  }, [searchQuery, setCategories]);

  return (
    <div className='max-w-[220px] min-w-[220px] w-full mr-5'>
      {isLoading ? (
        <Loading extraStyle='240px' />
      ) : (
        <>
          <div className='sticky top-[70px] border border-colSuperLight rounded-2xl px-3 pb-5 shadow-[0px_15px_20px_0px_rgba(0,_0,_0,_0.05)] mt-2'>
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
                expandIcon={<ArrowIcon className='!w-4 !h-4 rotate-[180deg]' />}
              >
                <span className='font-semibold text-colBlack'>Цена, ₽</span>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                <div className='grid grid-cols-2 gap-3 pb-3'>
                  <CTextField
                    label='от 0'
                    name='min_price'
                    type='number'
                    value={filtersValue.min_price}
                    onChange={(e) => handleChange('min_price', e.target.value)}
                  />
                  <CTextField
                    label='до 900 000'
                    name='max_price'
                    type='number'
                    value={filtersValue.max_price}
                    onChange={(e) => handleChange('max_price', e.target.value)}
                  />
                </div>
                <Box>
                  <Slider
                    sx={{ color: '#15765B' }}
                    size='small'
                    getAriaLabel={() => 'Price range'}
                    value={[filtersValue?.min_price, filtersValue?.max_price]}
                    min={0}
                    max={900000}
                    onChange={(event, newValue) => handleSliderChange(newValue)}
                    valueLabelDisplay='auto'
                  />
                </Box>
              </AccordionDetails>
            </Accordion>
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
                expandIcon={<ArrowIcon className='!w-4 !h-4 rotate-[180deg]' />}
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
                          checked={filtersValue.brands.includes(Number(el?.id))}
                          onChange={() =>
                            handleCheckboxChange('brands', Number(el?.id) || '')
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
                expandIcon={<ArrowIcon className='!w-4 !h-4 rotate-[180deg]' />}
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
                          onChange={() => handleCheckboxChange('tags', el?.tag)}
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
            <button
              onClick={() => setOpen(true)}
              className='bg-white border border-colGreen w-full rounded-md mb-3 p-2 text-colBlack font-semibold outline-none'
            >
              Все фильтры
            </button>
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
        filters={filters?.dynamics}
        isLoading={isLoading}
        searchQuery={searchQuery}
        handleFetchAllProducts={handleFetchAllProducts}
      />
    </div>
  );
};

export default SRSidebar;
