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
import { useState } from 'react';
import { Loading } from '../../helpers/Loader/Loader';
import { IOSSwitch } from '../Favorites/styledComponents/IOSSwitch';
import { ArrowIcon } from '../../helpers/Icons';
import AllFiltersModal from '../../helpers/CModal/AllFiltersModal';

const CatProdSidebar = ({ handleFetchProducts, handleFetchAllProducts }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filtersState, setFiltersState] = useState({
    highRating: true,
    brands: [],
    tags: [],
    min_price: 0,
    max_price: 900000,
  });

  const filters = [];

  const handleChange = (name, value) => {
    let updatedFilters = { ...filtersState };

    if (name === 'min_price' && parseInt(value) > filtersState.max_price) {
      updatedFilters = {
        ...updatedFilters,
        min_price: parseInt(value),
        max_price: parseInt(value),
      };
    } else if (
      name === 'max_price' &&
      parseInt(value) < filtersState.min_price
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

    setFiltersState(updatedFilters);
    handleFetchProducts('', updatedFilters);
  };

  const handleSliderChange = (newValue) => {
    const [newMinPrice, newMaxPrice] = newValue;
    const updatedFilters = {
      ...filtersState,
      min_price: newMinPrice,
      max_price: newMaxPrice,
    };
    setFiltersState(updatedFilters);
    handleFetchProducts('', updatedFilters);
  };

  const handleCheckboxChange = (name, value) => {
    const updatedFilters = {
      ...filtersState,
      [name]: filtersState[name].includes(value)
        ? filtersState[name].filter((item) => item !== value)
        : [...filtersState[name], value],
    };
    setFiltersState(updatedFilters);
    handleFetchProducts('', updatedFilters);
  };

  const handleClearFilters = () => {
    const initialFiltersState = {
      highRating: true,
      brands: [],
      tags: [],
      min_price: 0,
      max_price: 900000,
    };
    handleFetchProducts('', initialFiltersState);
    setFiltersState(initialFiltersState);
  };

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
                    value={filtersState.min_price}
                    onChange={(e) => handleChange('min_price', e.target.value)}
                  />
                  <CTextField
                    label='до 900 000'
                    name='max_price'
                    type='number'
                    value={filtersState.max_price}
                    onChange={(e) => handleChange('max_price', e.target.value)}
                  />
                </div>
                <Box>
                  <Slider
                    sx={{ color: '#15765B' }}
                    size='small'
                    getAriaLabel={() => 'Price range'}
                    value={[filtersState?.min_price, filtersState?.max_price]}
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
                          checked={filtersState.brands.includes(el?.id)}
                          onChange={() =>
                            handleCheckboxChange('brands', el?.id)
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
                          checked={filtersState.tags.includes(el?.tag)}
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
      <AllFiltersModal
        open={open}
        setOpen={setOpen}
        // category={category}
        handleFetchAllProducts={handleFetchAllProducts}
      />
    </div>
  );
};

export default CatProdSidebar;
