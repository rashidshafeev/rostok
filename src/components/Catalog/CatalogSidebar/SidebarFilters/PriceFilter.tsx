// src/components/PriceFilter.jsx

import React, { useEffect, useRef, useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Slider,
} from '@mui/material';
import { useDebounce } from 'react-use';

import { ArrowIcon } from '@/shared/ui/icons';
import CTextField from '@/shared/ui/inputs/CTextField';

function PriceFilter({ filters, setFilters, trigger, setTrigger }) {
  const previousValues = useRef({});

  const [priceFilter, setPriceFilter] = useState([
    filters?.basics?.price?.min || 0,
    filters?.basics?.price?.max || 0,
  ]);

  const [sliderValue, setSliderValue] = useState([
    priceFilter.min || filters?.basics?.price?.min,
    priceFilter.max || filters?.basics?.price?.max,
  ]);

  // Синхронизация и правильная работа отобржаения и установления значений

  const handleChangeMin = (event) => {
    const newMin = event.target.value;
    setPriceFilter((prev) => [newMin, prev[1]]);
  };

  const handleChangeMax = (event) => {
    const newMax = event.target.value;
    setPriceFilter((prev) => [prev[0], newMax]);
  };

  const validateAndSetMin = () => {
    let min =
      priceFilter[0] === ''
        ? filters?.basics?.price?.min
        : Number(priceFilter[0]);
    min = Math.max(min, filters?.basics?.price?.min);

    if (min > priceFilter[1]) {
      min = priceFilter[1]; // Ensure min is not greater than max
    }

    setPriceFilter((prev) => [min, prev[1]]);
    setSliderValue([min, priceFilter[1]]);

    // debouncedSetFilters(min, priceFilter.max);
  };

  const validateAndSetMax = () => {
    let max =
      priceFilter[1] === ''
        ? filters?.basics?.price?.max
        : Number(priceFilter[1]);
    max = Math.min(max, filters?.basics?.price?.max);

    if (max < priceFilter[0]) {
      max = priceFilter[0]; // Ensure max is not less than min
    }

    setPriceFilter((prev) => [prev[0], max]);
    setSliderValue([priceFilter[0], max]);

    // debouncedSetFilters(priceFilter.min, max);
  };

  const handleSliderChange = (event, newValue) => {
    setPriceFilter(newValue);
    setSliderValue(newValue);
    // debouncedSetFilters(newValue[0], newValue[1]);
  };

  //Логика отправки/изменения стейта

  // // Custom debounce function
  // const debounce = (func, wait) => {
  //   let timeout;
  //   return function (...args) {
  //     const context = this;
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => func.apply(context, args), wait);
  //   };
  // };

  // // Debounced function to update the state
  // const debouncedSetFilters = useRef(
  //   debounce((min, max) => {

  //     const currentState = JSON.parse(JSON.stringify(filters));

  //     currentState.basics.price.current_values = {
  //       min: min,
  //       max: max,
  //     };

  //     currentState.lastChanged = {
  //       type: "basics",
  //       filter: "price",
  //     };
  //     previousValues.current = [priceFilter.min, priceFilter.max];
  //     setFilters(currentState);
  //   }, 1000)
  // ).current;

  //При изменении фильтров устанваливает текущее значение фильтра цен
  useEffect(() => {
    if (
      previousValues.current[0] !==
        filters?.basics?.price?.current_values?.min ||
      previousValues.current[1] !== filters?.basics?.price?.current_values?.max
    ) {
      setPriceFilter([
        filters?.basics?.price?.current_values?.min || 0,
        filters?.basics?.price?.current_values?.max || 0,
      ]);
      setSliderValue([
        filters?.basics?.price?.current_values?.min,
        filters?.basics?.price?.current_values?.max,
      ]);
    }
  }, [filters]);

  useEffect(() => {
    // Чтобы установить значения фильтров по максимуму при смене категорий
    if (
      trigger === 'categoryId' ||
      trigger === 'tags' ||
      trigger === 'brands'
    ) {
      setPriceFilter([
        filters?.basics?.price?.current_values?.min || 0,
        filters?.basics?.price?.current_values?.max || 0,
      ]);

      setSliderValue([
        filters?.basics?.price?.current_values?.min,
        filters?.basics?.price?.current_values?.max,
      ]);

      // Чтобы не было отправления после первого изменения чекбоксов(после первичной загрузки)
      previousValues.current = [
        filters?.basics?.price?.min,
        filters?.basics?.price?.max,
      ];
    }
  }, [trigger]);

  useDebounce(
    () => {
      // Чтобы не было отправления при первичной инициализации и после смены категории(особенно при переключении с категории без цены на категорию с ценой - это как перчиная инициалзация)
      if (
        trigger === 'categoryId' ||
        trigger === 'tags' ||
        trigger === 'brands'
      ) {
        setTrigger('');
        return;
      }

      // Чтобы не было отправления после первого изменения чекбоксов
      if (
        Number(previousValues.current[0]) === Number(priceFilter[0]) &&
        Number(previousValues.current[1]) === Number(priceFilter[1])
      ) {
        return;
      }

      const currentState = JSON.parse(JSON.stringify(filters));

      currentState.basics.price.current_values = {
        min: priceFilter[0],
        max: priceFilter[1],
      };

      currentState.lastChanged = {
        type: 'basics',
        filter: 'price',
      };
      previousValues.current = priceFilter;
      setFilters(currentState);
    },
    1000,
    [priceFilter]
  );

  return (
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
      disableGutters
    >
      <AccordionSummary
        sx={{ padding: 0, flexDirection: 'row-reverse', gap: '8px' }}
        style={{ minHeight: 0 }}
        expandIcon={<ArrowIcon className="!w-4 !h-4 rotate-[180deg]" />}
      >
        <span className="font-semibold text-colBlack">Цена, ₽</span>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>
        <Slider
          sx={{ color: '#15765B' }}
          size="small"
          getAriaLabel={() => 'Price range'}
          value={sliderValue}
          min={filters?.basics?.price?.min}
          max={filters?.basics?.price?.max}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
        />
        <Box>
          <div className="grid grid-cols-2 gap-3 pb-3">
            <CTextField
              label={`от ${filters?.basics?.price?.min}`}
              name="min_price"
              type="number"
              value={priceFilter[0]}
              onChange={handleChangeMin}
              onBlur={validateAndSetMin}
            />
            <CTextField
              label={`до ${filters?.basics?.price?.max}`}
              name="max_price"
              type="number"
              value={priceFilter[1]}
              onChange={handleChangeMax}
              onBlur={validateAndSetMax}
            />
          </div>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default PriceFilter;
