import { NavLink, useParams } from 'react-router-dom';
import CTextField from '../../../../helpers/CustomInputs/CTextField';
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
import { Loading } from '../../../../helpers/Loader/Loader';
import { IOSSwitch } from '../../../Favorites/styledComponents/IOSSwitch';
import { ArrowIcon } from '../../../../helpers/Icons';
import {
  useGetCategoryTreeQuery,
  useGetFiltersOfProductsQuery,
} from '../../../../redux/api/productEndpoints';

const CatProdSidebar = ({ setBreadCrumps, handleFetchByFilter, setOpen }) => {
  const { categoryId } = useParams();

  const { isLoading, data: categories } = useGetCategoryTreeQuery(categoryId);
  const { data: filters } = useGetFiltersOfProductsQuery(categoryId);

  const filtersInColumn = filters?.dynamics?.filter(
    (el) => el?.display_in_filters === '1'
  );

  const [accordion, setAccordion] = useState({
    parent: null,
    child: null,
    childLast: null,
  });
  const [filtersState, setFiltersState] = useState({
    highRating: true,
    brands: [],
    tags: [],
    min_price: Number(filters?.basics?.price?.min) || 0,
    max_price: Number(filters?.basics?.price?.max) || 0,
  });

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
    handleFetchByFilter(categoryId, updatedFilters);
  };

  const handleSliderChange = (newValue) => {
    const [newMinPrice, newMaxPrice] = newValue;
    const updatedFilters = {
      ...filtersState,
      min_price: newMinPrice,
      max_price: newMaxPrice,
    };
    setFiltersState(updatedFilters);
    handleFetchByFilter(categoryId, updatedFilters);
  };

  const handleCheckboxChange = (name, value) => {
    const updatedFilters = {
      ...filtersState,
      [name]: filtersState[name]?.includes(value)
        ? filtersState[name].filter((item) => item !== value)
        : [...(filtersState[name] || []), value],
    };

    if (
      updatedFilters[name].length === 0 &&
      filtersInColumn.some((el) => el.id === name)
    ) {
      delete updatedFilters[name];
    }

    setFiltersState(updatedFilters);
    handleFetchByFilter(categoryId, updatedFilters);
  };

  const handleClearFilters = () => {
    const initialFiltersState = {
      highRating: true,
      brands: [],
      tags: [],
      min_price: 0,
      max_price: 900000,
    };
    handleFetchByFilter(categoryId, initialFiltersState);
    setFiltersState(initialFiltersState);
  };

  const toggleAccordion = (type, id) => {
    setAccordion((prevState) => ({
      ...prevState,
      [type]: prevState[type] === id ? null : id,
    }));
  };

  useEffect(() => {
    setBreadCrumps(filters?.category_chain);
  }, [filters?.category_chain]);

  return (
    <div className='md:block hidden max-w-[220px] min-w-[220px] w-full mr-5'>
      {isLoading ? (
        <Loading extraStyle='240px' />
      ) : (
        <>
          <ul className='space-y-2'>
            <li>
              <NavLink
                to={`/catalog/${categories?.category?.slug}`}
                className='flex text-colBlack leading-5 font-semibold bg-colSuperLight rounded py-1 px-2 cursor-pointer'
              >
                {categories?.category?.name || 'Не указано'}
                <span className='text-colDarkGray font-[400] text-xs pl-2'>
                  {categories?.category?.product_count}
                </span>
              </NavLink>
            </li>
            {categories?.children?.map((el) => (
              <li key={el?.id} className='pl-3'>
                <div className='flex justify-between'>
                  <NavLink
                    to={`/catalog/${el?.slug}`}
                    className='text-colBlack leading-5 font-semibold cursor-pointer'
                  >
                    <p className='relative max-w-[170px]'>
                      {el?.name}
                      <span className='absolute text-colGray font-[400] text-xs pl-2'>
                        {el?.product_count}
                      </span>
                    </p>
                  </NavLink>
                  {el?.children?.length && (
                    <ArrowIcon
                      onClick={() => toggleAccordion('parent', el?.id)}
                      className={`${
                        accordion.parent !== el?.id && 'rotate-[180deg]'
                      } cursor-pointer !m-0 !w-4 !h-4`}
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
                        <NavLink
                          to={`/catalog/${child?.slug}`}
                          className='text-colBlack text-sm leading-4 font-semibold cursor-pointer'
                        >
                          <p className='relative max-w-[140px] w-full'>
                            {child?.name}
                            <span className='absolute text-colGray font-[400] text-xs pl-2'>
                              {child?.product_count}
                            </span>
                          </p>
                        </NavLink>
                        {child?.children?.length && (
                          <ArrowIcon
                            onClick={() => toggleAccordion('child', child?.id)}
                            className={`${
                              accordion.child !== child?.id && 'rotate-[180deg]'
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
                              <NavLink
                                to={`/catalog/${item?.slug}`}
                                className='text-colBlack leading-5 text-sm cursor-pointer relative flex'
                              >
                                <p className='relative max-w-[140px] w-full leading-4'>
                                  {item?.name}
                                  <span className='absolute text-colGray font-[400] text-xs pl-2'>
                                    {item?.product_count}
                                  </span>
                                </p>
                              </NavLink>
                              {item?.children?.length && (
                                <ArrowIcon
                                  onClick={() =>
                                    toggleAccordion('childLast', item?.id)
                                  }
                                  className={`${
                                    accordion.childLast !== item?.id &&
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
                                <NavLink
                                  to={`/catalog/${itemChild?.slug}`}
                                  key={itemChild?.id}
                                  className='text-colBlack leading-5 text-sm cursor-pointer relative flex'
                                >
                                  <p className='relative max-w-[140px] w-full'>
                                    {itemChild?.name}
                                    <span className='absolute text-colGray font-[400] text-xs pl-2'>
                                      {itemChild?.product_count}
                                    </span>
                                  </p>
                                </NavLink>
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
                    label={`от ${filters?.basics?.price?.min}`}
                    name='min_price'
                    type='number'
                    value={Number(filtersState.min_price)}
                    onChange={(e) => handleChange('min_price', e.target.value)}
                  />
                  <CTextField
                    label={`до ${filters?.basics?.price?.max}`}
                    name='max_price'
                    type='number'
                    value={Number(filtersState.max_price)}
                    onChange={(e) => handleChange('max_price', e.target.value)}
                  />
                </div>
                <Box>
                  <Slider
                    sx={{ color: '#15765B' }}
                    size='small'
                    getAriaLabel={() => 'Price range'}
                    value={[filtersState?.min_price, filtersState?.max_price]}
                    min={Number(filters?.basics?.price?.min)}
                    max={Number(filters?.basics?.price?.max)}
                    onChange={(event, newValue) => handleSliderChange(newValue)}
                    valueLabelDisplay='auto'
                  />
                </Box>
              </AccordionDetails>
            </Accordion>
            {filters?.basics?.brands?.length > 0 && (
              <Accordion
                sx={{
                  margin: '0',
                  boxShadow: 'none',
                  '&:before': {
                    display: 'none',
                  },
                }}
                defaultExpanded
              >
                <AccordionSummary
                  style={{ minHeight: 0, padding: 0 }}
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
                            checked={filtersState.tags.includes(el?.tag)}
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
            {filtersInColumn?.map((el, index) => (
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
                                checked={filtersState[el?.id]?.includes(
                                  val?.id
                                )}
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
    </div>
  );
};

export default CatProdSidebar;
