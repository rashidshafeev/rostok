import { useNavigate, useParams } from 'react-router-dom';
import CTextField from '../../../../../helpers/CustomInputs/CTextField';
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
import { Loading } from '../../../../../helpers/Loader/Loader';
import { IOSSwitch } from '../../../../Favorites/styledComponents/IOSSwitch';
import { fetchFilters } from '../../../../../api/filters';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowIcon } from '../../../../../helpers/Icons';
import AllFiltersModal from '../../../../../helpers/CModal/AllFiltersModal';
import { useGetCategoryTreeQuery } from '../../../../../redux/api/api';

const CatProdSidebar = ({ handleFetchProducts, handleFetchAllProducts }) => {
  const { filters } = useSelector((state) => state?.filters);
  const [categoryID, setCategoryID] = useState('');
  const [open, setOpen] = useState(false);
  const [accordion, setAccordion] = useState({
    parent: null,
    child: null,
    childLast: null,
  });
  const [filtersState, setFiltersState] = useState({
    highRating: true,
    brands: [],
    tags: [],
    min_price: 0,
    max_price: 900000,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId } = useParams();

  const { isLoading, data: categories } = useGetCategoryTreeQuery(categoryId);

  useEffect(() => {
    setCategoryID(categoryId);
  }, [categoryId]);

  const handleChange = (name, value) => {
    if (name === 'min_price' && parseInt(value) > filtersState.max_price) {
      setFiltersState((prevState) => ({
        ...prevState,
        min_price: parseInt(value),
        max_price: parseInt(value),
      }));
    } else if (
      name === 'max_price' &&
      parseInt(value) < filtersState.min_price
    ) {
      setFiltersState((prevState) => ({
        ...prevState,
        max_price: parseInt(value),
        min_price: parseInt(value),
      }));
    } else {
      setFiltersState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSliderChange = (newValue) => {
    const [newMinPrice, newMaxPrice] = newValue;
    setFiltersState((prevState) => ({
      ...prevState,
      min_price: newMinPrice,
      max_price: newMaxPrice,
    }));
  };

  const handleCheckboxChange = (name, value) => {
    const updatedFilters = {
      ...filtersState,
      [name]: filtersState[name].includes(value)
        ? filtersState[name].filter((item) => item !== value)
        : [...filtersState[name], value],
    };
    setFiltersState(updatedFilters);
  };

  const handleClearFilters = () => {
    const initialFiltersState = {
      highRating: true,
      brands: [],
      tags: [],
      min_price: 0,
      max_price: 900000,
    };
    handleFetchProducts(categoryID, initialFiltersState);
    setFiltersState(initialFiltersState);
  };

  const toggleAccordion = (type, id) => {
    setAccordion((prevState) => ({
      ...prevState,
      [type]: prevState[type] === id ? null : id,
    }));
  };

  useEffect(() => {
    handleFetchProducts(categoryID, filtersState);
  }, [categoryID, filtersState]);

  useEffect(() => {
    (async () => {
      await fetchFilters(dispatch, categoryID);
    })();
  }, [dispatch, categoryID]);

  return (
    <div className='max-w-[220px] min-w-[220px] w-full mr-5'>
      {isLoading ? (
        <Loading extraStyle='240px' />
      ) : (
        <>
          <ul className='space-y-2'>
            <li className='text-colBlack leading-5 font-semibold'>
              <button
                onClick={() => navigate(-1)}
                className='flex items-center bg-white'
              >
                <ArrowIcon className='cursor-pointer !m-0 !w-4 !h-4 mr-1 rotate-[-90deg]' />
                Назад
              </button>
            </li>
            <li className='text-colBlack leading-5 font-semibold bg-[#EBEBEB] rounded py-1 px-2'>
              {categories?.category?.name || 'Не указано'}
            </li>
            {categories?.children?.map((el) => (
              <li key={el?.id} className='pl-3'>
                <div className='flex justify-between'>
                  <span
                    onClick={() => {
                      handleFetchProducts(el?.id);
                      setCategoryID(el?.id);
                    }}
                    className='text-colBlack leading-5 font-semibold cursor-pointer'
                  >
                    <p className='relative max-w-[170px]'>
                      {el?.name}
                      <span className='absolute text-colGray font-[400] text-xs pl-2'>
                        {el?.product_count}
                      </span>
                    </p>
                  </span>
                  {el?.children?.length && (
                    <ArrowIcon
                      onClick={() => toggleAccordion('parent', el?.id)}
                      className={`${
                        accordion.parent === el?.id && 'rotate-[0deg]'
                      } cursor-pointer !m-0 !w-4 !h-4 rotate-[180deg]`}
                    />
                  )}
                </div>
                <div
                  className={`${
                    accordion.parent === el?.id ? 'block' : 'hidden'
                  } pl-5 pt-1 space-y-1`}
                >
                  {el?.children?.map((child) => (
                    <div key={child?.id}>
                      <div className='flex justify-between items-center'>
                        <span
                          onClick={() => {
                            handleFetchProducts(child?.id);
                            setCategoryID(child?.id);
                          }}
                          className='text-colBlack text-sm leading-4 font-semibold cursor-pointer'
                        >
                          <p className='relative max-w-[140px] w-full'>
                            {child?.name}
                            <span className='absolute text-colGray font-[400] text-xs pl-2'>
                              {child?.product_count}
                            </span>
                          </p>
                        </span>
                        {child?.children?.length && (
                          <ArrowIcon
                            onClick={() => toggleAccordion('child', child?.id)}
                            className={`${
                              accordion.child === child?.id && 'rotate-[180deg]'
                            } cursor-pointer !m-0 !w-4 !h-4`}
                          />
                        )}
                      </div>
                      <div
                        className={`${
                          accordion.child === child?.id ? 'block' : 'hidden'
                        } pl-5 pb-2 space-y-1`}
                      >
                        {child?.children?.map((item) => (
                          <div key={item?.id}>
                            <div className='flex justify-between'>
                              <span
                                onClick={() => {
                                  handleFetchProducts(item?.id);
                                  setCategoryID(item?.id);
                                }}
                                className='text-colBlack leading-5 text-sm cursor-pointer relative flex'
                              >
                                <p className='relative max-w-[140px] w-full leading-4'>
                                  {item?.name}
                                  <span className='absolute text-colGray font-[400] text-xs pl-2'>
                                    {item?.product_count}
                                  </span>
                                </p>
                              </span>
                              {item?.children?.length && (
                                <ArrowIcon
                                  onClick={() =>
                                    toggleAccordion('childLast', item?.id)
                                  }
                                  className={`${
                                    accordion.childLast === item?.id &&
                                    'rotate-[180deg]'
                                  } cursor-pointer !m-0 !w-4 !h-4`}
                                />
                              )}
                            </div>
                            <div
                              className={`${
                                accordion.childLast === item?.id
                                  ? 'block'
                                  : 'hidden'
                              } pl-2 pb-2 pt-1`}
                            >
                              {item?.children?.map((itemChild) => (
                                <span
                                  key={itemChild?.id}
                                  onClick={() => {
                                    handleFetchProducts(itemChild?.id);
                                    setCategoryID(itemChild?.id);
                                  }}
                                  className='text-colBlack leading-5 text-sm cursor-pointer relative flex'
                                >
                                  <p className='relative max-w-[140px] w-full'>
                                    {itemChild?.name}
                                    <span className='absolute text-colGray font-[400] text-xs pl-2'>
                                      {itemChild?.product_count}
                                    </span>
                                  </p>
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
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
        category={categoryID}
        handleFetchAllProducts={handleFetchAllProducts}
      />
    </div>
  );
};

export default CatProdSidebar;