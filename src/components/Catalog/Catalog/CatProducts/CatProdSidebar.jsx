import { NavLink, useNavigate, useParams } from 'react-router-dom';
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
import AllFiltersModal from '../../../../helpers/CModal/AllFiltersModal';
import {
  useGetCategoryTreeQuery,
  useGetFiltersOfProductsQuery,
} from '../../../../redux/api/api';

const CatProdSidebar = ({
  setBreadCrumps,
  handleFetchProducts,
  handleFetchAllProducts,
}) => {
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

  const { categoryId } = useParams();
  const navigate = useNavigate();

  const { isLoading, data: categories } = useGetCategoryTreeQuery(categoryId);
  const { data: filters } = useGetFiltersOfProductsQuery(categoryId);

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
    handleFetchProducts(categoryId, updatedFilters);
  };

  const handleSliderChange = (newValue) => {
    const [newMinPrice, newMaxPrice] = newValue;
    const updatedFilters = {
      ...filtersState,
      min_price: newMinPrice,
      max_price: newMaxPrice,
    };
    setFiltersState(updatedFilters);
    handleFetchProducts(categoryId, updatedFilters);
  };

  const handleCheckboxChange = (name, value) => {
    const updatedFilters = {
      ...filtersState,
      [name]: filtersState[name].includes(value)
        ? filtersState[name].filter((item) => item !== value)
        : [...filtersState[name], value],
    };
    setFiltersState(updatedFilters);
    handleFetchProducts(categoryId, updatedFilters);
  };

  const handleClearFilters = () => {
    const initialFiltersState = {
      highRating: true,
      brands: [],
      tags: [],
      min_price: 0,
      max_price: 900000,
    };
    handleFetchProducts(categoryId, initialFiltersState);
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
            <li className='text-colBlack leading-5 font-semibold'>
              <button
                onClick={() => navigate(-1)}
                className='flex items-center bg-white'
              >
                <ArrowIcon className='cursor-pointer !m-0 !w-4 !h-4 mr-1 rotate-[-90deg]' />
                Назад
              </button>
            </li>
            <li>
              <NavLink
                to={`/catalog/${categories?.category?.slug}`}
                className='flex  text-colBlack leading-5 font-semibold bg-[#EBEBEB] rounded py-1 px-2 cursor-pointer'
              >
                {categories?.category?.name || 'Не указано'}
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
        category={categoryId}
        handleFetchAllProducts={handleFetchAllProducts}
      />
    </div>
  );
};

export default CatProdSidebar;
