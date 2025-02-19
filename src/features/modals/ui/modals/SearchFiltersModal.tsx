import { useState } from 'react';

import { Box, Checkbox, FormControlLabel, Modal, Slider } from '@mui/material';

import ErrorEmpty from '@/helpers/Errors/ErrorEmpty';
import { ArrowIcon } from '@/shared/ui/icons';
import { CTextField } from '@/shared/ui/inputs/CTextField';
import { Loading } from '@/shared/ui/Loader';

const SearchFiltersModal = ({
  open,
  setOpen,
  filters,
  filterLoading,
  setFiltersValue,
}) => {
  const [accordion, setAccordion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState({});
  const [selectedValuesTwo, setSelectedValuesTwo] = useState({
    brands: [],
    tags: [],
    min_price: Number(filters?.basics?.price?.min || 0),
    max_price: Number(filters?.basics?.price?.max || 0),
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

  const toggleAccordion = (id) => {
    setAccordion(accordion === id ? null : id);
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
    setIsLoading(true);
    setFiltersValue((prev) => ({ ...prev, ...selectedValues }));
    setOpen(false);
    setIsLoading(false);
  };

  const dynamicFilters = filters?.dynamics?.filter(
    (el) => el?.display_in_filters !== '1'
  );

  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full mm:w-[95%] lg:w-[85%] h-full mm:h-[95%] lg:h-[90%] lining-nums proportional-nums bg-white outline-none rounded-lg border-none p-3 md:p-6 overflow-hidden">
        <div className="flex flex-col justify-between h-full">
          <div className="h-[90%]">
            <div className="flex justify-between items-center">
              <h2 className="text-colBlack text-2xl lg:text-3xl font-semibold">
                Все фильтры
              </h2>
              <span
                onClick={() => setOpen(false)}
                className="text-4xl lg:text-5xl text-colGray font-light cursor-pointer pr-2"
              >
                &times;
              </span>
            </div>
            {isLoading || filterLoading ? (
              <Loading />
            ) : (filters?.basics && Object.keys(filters.basics).length > 0) ||
              filters.dynamics.length > 0 ||
              filters.more.length > 0 ? (
              <div className="mt-2 pr-3 md:border-t md:border-b border-[#EBEBEB] overflow-y-scroll overflow-hidden h-[calc(100vh_-_136px)] md:h-[calc(100vh_-_205px)] lg:h-[92%]">
                <div className="pt-5">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 lg:gap-8">
                    <div className="md:hidden border-b pb-2">
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleAccordion('cost')}
                      >
                        <span className="text-colBlack font-semibold">
                          Цена, ₽
                        </span>
                        <ArrowIcon
                          className={`!m-0 !w-4 !h-4 ${
                            accordion === 'cost'
                              ? 'rotate-[0deg]'
                              : 'rotate-[180deg]'
                          }`}
                        />
                      </div>
                      {accordion === 'cost' ? (
                        <>
                          <div className="grid grid-cols-2 gap-3 py-3 pl-2">
                            <CTextField
                              label={`от ${filters?.basics?.price?.min}`}
                              name="min_price"
                              type="number"
                              value={selectedValuesTwo.min_price}
                              onChange={(e) =>
                                handleChange('min_price', e.target.value)
                              }
                            />
                            <CTextField
                              label={`до ${filters?.basics?.price?.max}`}
                              name="max_price"
                              type="number"
                              value={selectedValuesTwo.max_price}
                              onChange={(e) =>
                                handleChange('max_price', e.target.value)
                              }
                            />
                          </div>
                          <Box sx={{ padding: '0 8px 0 14px' }}>
                            <Slider
                              sx={{ color: '#15765B' }}
                              size="small"
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
                              valueLabelDisplay="auto"
                            />
                          </Box>
                        </>
                      ) : null}
                    </div>
                    {filters?.basics?.brands?.length > 0 ? (
                      <div className="md:hidden border-b pb-3">
                        <div
                          className="flex justify-between items-center cursor-pointer"
                          onClick={() => toggleAccordion('brand')}
                        >
                          <span className="text-colBlack font-semibold">
                            Производитель
                          </span>
                          <ArrowIcon
                            className={`!m-0 !w-4 !h-4 ${
                              accordion === 'brand'
                                ? 'rotate-[0deg]'
                                : 'rotate-[180deg]'
                            }`}
                          />
                        </div>
                        {accordion === 'brand'
                          ? filters?.basics?.brands?.map((el) => (
                              <div className="pl-2" key={el?.id}>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      style={{
                                        color: '#15765B',
                                        padding: '5px 4px 5px 8px',
                                      }}
                                      name="brands"
                                      checked={selectedValuesTwo.brands.includes(
                                        el?.id
                                      )}
                                      onChange={() =>
                                        handleCheckboxChange('brands', el?.id)
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
                            ))
                          : null}
                      </div>
                    ) : null}
                    {filters?.basics?.tags?.length > 0 ? (
                      <div className="md:hidden border-b pb-3">
                        <div
                          className="flex justify-between items-center cursor-pointer"
                          onClick={() => toggleAccordion('status')}
                        >
                          <span className="text-colBlack font-semibold">
                            Статус
                          </span>
                          <ArrowIcon
                            className={`!m-0 !w-4 !h-4 ${
                              accordion === 'status'
                                ? 'rotate-[0deg]'
                                : 'rotate-[180deg]'
                            }`}
                          />
                        </div>
                        {accordion === 'status'
                          ? filters?.basics?.tags?.map((el, index) => (
                              <div className="pt-2 pl-2" key={index}>
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
                                      className="py-1 px-2 uppercase text-xs font-bold rounded-xl"
                                    >
                                      {el?.tag}
                                    </span>
                                  }
                                />
                              </div>
                            ))
                          : null}
                      </div>
                    ) : null}
                    {window.innerWidth > 768
                      ? dynamicFilters?.map((el) => (
                          <div
                            className="border-b md:border-b-0 pb-2"
                            key={el?.id}
                          >
                            <div
                              className="flex justify-between items-center cursor-pointer"
                              onClick={() => toggleAccordion(el?.id)}
                            >
                              <span className="text-colBlack font-semibold">
                                {el?.name}
                              </span>
                              <ArrowIcon
                                className={`!m-0 !w-4 !h-4 ${
                                  accordion === el?.id
                                    ? 'rotate-[0deg]'
                                    : 'rotate-[180deg]'
                                }`}
                              />
                            </div>
                            {accordion === el?.id && el?.values?.length > 0 ? (
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
                                        <div className="flex space-x-2 items-center">
                                          {el?.type === 'color' ? (
                                            <span
                                              style={{
                                                backgroundColor: val?.color,
                                              }}
                                              className="w-5 h-5 min-w-[20px] rounded-full border border-colGray"
                                            ></span>
                                          ) : null}
                                          <p className="text-sm font-medium text-colBlack">
                                            {val?.text}
                                          </p>
                                        </div>
                                      }
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        ))
                      : filters?.dynamics?.map((el) => (
                          <div
                            className="border-b md:border-b-0 pb-2"
                            key={el?.id}
                          >
                            <div
                              className="flex justify-between items-center cursor-pointer"
                              onClick={() => toggleAccordion(el?.id)}
                            >
                              <span className="text-colBlack font-semibold">
                                {el?.name}
                              </span>
                              <ArrowIcon
                                className={`!m-0 !w-4 !h-4 ${
                                  accordion === el?.id
                                    ? 'rotate-[0deg]'
                                    : 'rotate-[180deg]'
                                }`}
                              />
                            </div>
                            {accordion === el?.id && el?.values?.length > 0 ? (
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
                                        <div className="flex space-x-2 items-center">
                                          {el?.type === 'color' ? (
                                            <span
                                              style={{
                                                backgroundColor: val?.color,
                                              }}
                                              className="w-5 h-5 min-w-[20px] rounded-full border border-colGray"
                                            ></span>
                                          ) : null}
                                          <p className="text-sm font-medium text-colBlack">
                                            {val?.text}
                                          </p>
                                        </div>
                                      }
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        ))}
                  </div>
                </div>
              </div>
            ) : (
              <ErrorEmpty
                title="Список пуст!"
                desc="К сожалению, для этой категории нет фильтров."
                height="420px"
              />
            )}
          </div>
          <div className="flex space-x-3 h-10">
            <span
              onClick={handleClearFilter}
              className="bg-white text-colGreen border border-colGreen rounded-md py-2 px-4 font-semibold w-max text-sm cursor-pointer"
            >
              Сбросить
            </span>
            <button
              onClick={onSubmit}
              className="bg-colGreen text-white rounded-md py-2 px-4 font-semibold w-max text-sm"
            >
              Применить
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default SearchFiltersModal;
