import { Box, Checkbox, FormControlLabel, Modal, Slider } from '@mui/material';
import { useState } from 'react';
import { ArrowIcon } from '../Icons';
import { Loading } from '../Loader/Loader';
import ErrorServer from '../Errors/ErrorServer';
import ErrorEmpty from '../Errors/ErrorEmpty';
import { fetchCategoryProducts } from '../../api/catalog';

import CTextField from '../CustomInputs/CTextField';
import { useGetFiltersOfProductsQuery } from '../../redux/api/productEndpoints';

const AllFiltersModal = ({
  open,
  setOpen,
  category,
  setCatProducts,
  allFilters,
  setFilters,
}) => {
  const {
    isLoading,
    isError,
    data: filters,
  } = useGetFiltersOfProductsQuery(category);

  const [accordion, setAccordion] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [selectedValuesTwo, setSelectedValuesTwo] = useState({
    brands: [],
    tags: [],
    min_price: Number(filters?.basics?.price?.min) || 0,
    max_price: Number(filters?.basics?.price?.max) || 0,
  });

  const toggleValue = (filterId, valueId) => {
    setSelectedValues((prevState) => ({
      ...prevState,
      [filterId]: prevState[filterId]
        ? prevState[filterId].includes(valueId)
          ? prevState[filterId].filter((id) => id !== valueId)
          : [...prevState[filterId], valueId]
        : [valueId],
    }));
  };

  const handleChange = (name, value) => {
    let updatedFilters = { ...selectedValuesTwo };

    if (name === 'min_price' && parseInt(value) > selectedValuesTwo.max_price) {
      updatedFilters = {
        ...updatedFilters,
        min_price: parseInt(value),
        max_price: parseInt(value),
      };
    } else if (
      name === 'max_price' &&
      parseInt(value) < selectedValuesTwo.min_price
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

    setSelectedValuesTwo(updatedFilters);
  };

  const handleSliderChange = (newValue) => {
    const [newMinPrice, newMaxPrice] = newValue;
    const updatedFilters = {
      ...selectedValuesTwo,
      min_price: newMinPrice,
      max_price: newMaxPrice,
    };
    setSelectedValuesTwo(updatedFilters);
  };

  const handleCheckboxChange = (name, value) => {
    const updatedFilters = {
      ...selectedValuesTwo,
      [name]: selectedValuesTwo[name].includes(value)
        ? selectedValuesTwo[name].filter((item) => item !== value)
        : [...selectedValuesTwo[name], value],
    };
    setSelectedValuesTwo(updatedFilters);
  };

  const toggleAccordion = (id) => {
    const updatedAccordion = accordion ? [...accordion] : [];

    const index = updatedAccordion.indexOf(id);

    if (index !== -1) {
      updatedAccordion.splice(index, 1);
    } else {
      updatedAccordion.push(id);
    }

    setAccordion(updatedAccordion);
  };

  const handleClearFilter = () => {
    setSelectedValues({});
    setSelectedValuesTwo({
      brands: [],
      tags: [],
      min_price: 0,
      max_price: 900000,
    });
  };
  const onSubmit = async () => {
    setIsFilterLoading(true);
    const { success, data } = await fetchCategoryProducts(
      category,
      allFilters.filterOptions,
      allFilters.sortOption,
      selectedValues,
      selectedValuesTwo
    );
    if (success) {
      setOpen(false);
      setCatProducts(data);
      setIsFilterLoading(false);
    }
    setFilters((prev) => ({
      ...prev,
      selectedValues: selectedValues,
      selectedValuesTwo: selectedValuesTwo,
    }));
    setIsFilterLoading(false);
  };

  const dynamicFilters = filters?.dynamics?.filter(
    (el) => el?.display_in_filters !== '1'
  );

  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full mm:w-[95%] lg:w-[85%] h-full mm:h-[95%] lg:h-[90%] lining-nums proportional-nums bg-white outline-none rounded-lg border-none p-[12px_4px_12px_12px] lg:p-[24px_4px_24px_24px] overflow-hidden'>
        <div className='flex flex-col justify-between h-full'>
          <div className='h-[90%]'>
            <div className='flex justify-between items-center pr-3 lg:pr-5'>
              <h2 className='text-colBlack text-2xl lg:text-3xl font-semibold'>
                Все фильтры
              </h2>
              <span
                onClick={() => setOpen(false)}
                className='text-4xl lg:text-5xl text-colGray font-light cursor-pointer'
              >
                &times;
              </span>
            </div>
            {console.log(filters)}
            {isLoading || isFilterLoading ? (
              <Loading />
            ) : isError ? (
              <ErrorServer errorMessage='Что-то пошло не так! Пожалуйста, повторите попытку еще раз.' />
            ) : filters?.basics &&
              Object.keys(filters.basics).length > 0 &&
              filters?.dynamics &&
              filters.dynamics.length > 0 ? (
              <div className='mt-2 pr-2 lg:pr-5 md:border-t border-b border-[#EBEBEB] overflow-y-scroll scrollable overflow-hidden h-[calc(100vh_-_124px)] mm:h-[calc(100vh_-_185px)] lg:h-[92%]'>
                <div className='pt-5'>
                  <div className='grid mm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 lg:gap-8'>
                    <div className='md:hidden border-b pb-2'>
                      <div
                        className='flex justify-between items-center cursor-pointer'
                        onClick={() => toggleAccordion('cost')}
                      >
                        <span className='text-colBlack font-semibold'>
                          Цена, ₽
                        </span>
                        <ArrowIcon
                          className={`!m-0 !w-4 !h-4 ${
                            accordion?.includes('cost')
                              ? 'rotate-[0deg]'
                              : 'rotate-[180deg]'
                          }`}
                        />
                      </div>
                      {accordion?.includes('cost') && (
                        <>
                          <div className='grid grid-cols-2 gap-3 py-3 pl-2'>
                            <CTextField
                              label={`от ${filters?.basics?.price?.min}`}
                              name='min_price'
                              type='number'
                              value={selectedValuesTwo.min_price}
                              onChange={(e) =>
                                handleChange('min_price', e.target.value)
                              }
                            />
                            <CTextField
                              label={`до ${filters?.basics?.price?.max}`}
                              name='max_price'
                              type='number'
                              value={selectedValuesTwo.max_price}
                              onChange={(e) =>
                                handleChange('max_price', e.target.value)
                              }
                            />
                          </div>
                          <Box sx={{ padding: '0 8px 0 14px' }}>
                            <Slider
                              sx={{ color: '#15765B' }}
                              size='small'
                              getAriaLabel={() => 'Price range'}
                              value={[
                                selectedValuesTwo?.min_price,
                                selectedValuesTwo?.max_price,
                              ]}
                              min={Number(filters?.basics?.price?.min)}
                              max={Number(filters?.basics?.price?.max)}
                              onChange={(event, newValue) =>
                                handleSliderChange(newValue)
                              }
                              valueLabelDisplay='auto'
                            />
                          </Box>
                        </>
                      )}
                    </div>
                    {filters?.basics?.brands?.length > 0 && (
                      <div className='md:hidden border-b pb-3'>
                        <div
                          className='flex justify-between items-center cursor-pointer'
                          onClick={() => toggleAccordion('brand')}
                        >
                          <span className='text-colBlack font-semibold'>
                            Производитель
                          </span>
                          <ArrowIcon
                            className={`!m-0 !w-4 !h-4 ${
                              accordion?.includes('brand')
                                ? 'rotate-[0deg]'
                                : 'rotate-[180deg]'
                            }`}
                          />
                        </div>
                        {accordion?.includes('brand') &&
                          filters?.basics?.brands?.map((el) => (
                            <div className='pl-2' key={el?.id}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    style={{
                                      color: '#15765B',
                                      padding: '5px 4px 5px 8px',
                                    }}
                                    name='brands'
                                    checked={selectedValuesTwo.brands.includes(
                                      el?.id
                                    )}
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
                      </div>
                    )}
                    {filters?.basics?.tags?.length > 0 && (
                      <div className='md:hidden border-b pb-3'>
                        <div
                          className='flex justify-between items-center cursor-pointer'
                          onClick={() => toggleAccordion('status')}
                        >
                          <span className='text-colBlack font-semibold'>
                            Статус
                          </span>
                          <ArrowIcon
                            className={`!m-0 !w-4 !h-4 ${
                              accordion?.includes('status')
                                ? 'rotate-[0deg]'
                                : 'rotate-[180deg]'
                            }`}
                          />
                        </div>
                        {accordion?.includes('status') &&
                          filters?.basics?.tags?.map((el, index) => (
                            <div className='pt-2 pl-2' key={index}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    style={{
                                      color: '#15765B',
                                      padding: '1px 4px 1px 8px',
                                    }}
                                    checked={selectedValuesTwo.tags.includes(
                                      el?.tag
                                    )}
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
                      </div>
                    )}
                    {dynamicFilters > 0 &&
                      dynamicFilters?.map((el) => (
                        <div
                          className='border-b md:border-b-0 pb-2'
                          key={el?.id}
                        >
                          <div
                            className='flex justify-between items-center cursor-pointer'
                            onClick={() => toggleAccordion(el?.id)}
                          >
                            <span className='text-colBlack font-semibold'>
                              {el?.name}
                            </span>
                            <ArrowIcon
                              className={`!m-0 !w-4 !h-4 ${
                                accordion?.includes(el?.id)
                                  ? 'rotate-[0deg]'
                                  : 'rotate-[180deg]'
                              }`}
                            />
                          </div>
                          {accordion?.includes(el?.id) &&
                            el?.values?.length > 0 && (
                              <div
                                className={`${
                                  el?.values?.length > 10 &&
                                  'h-[274px] overflow-hidden overflow-y-scroll scrollable'
                                } `}
                              >
                                {el?.values?.map((val) => (
                                  <div key={val?.id}>
                                    <FormControlLabel
                                      style={{ margin: 0 }}
                                      control={
                                        <Checkbox
                                          style={{
                                            color: '#15765B',
                                            padding: '2px 3px',
                                          }}
                                          checked={
                                            selectedValues[el?.id]?.includes(
                                              val?.id
                                            ) || false
                                          }
                                          onChange={() =>
                                            toggleValue(el?.id, val?.id)
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
                                          <p className='text-sm font-medium text-colBlack'>
                                            {val?.text}
                                          </p>
                                        </div>
                                      }
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <ErrorEmpty
                title='Список пуст!'
                desc='К сожалению, для этой категории нет фильтров.'
                height='420px'
              />
            )}
          </div>
          <div className='flex space-x-3 h-10 bg-white z-[999]'>
            <span
              onClick={handleClearFilter}
              className='bg-white text-colGreen border border-colGreen rounded-md py-2 px-4 font-semibold w-max text-sm cursor-pointer'
            >
              Сбросить
            </span>
            <button
              onClick={onSubmit}
              className='bg-colGreen text-white rounded-md py-2 px-4 font-semibold w-max text-sm'
            >
              Применить
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default AllFiltersModal;
