// src/components/PriceFilter.jsx

import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Slider,
} from "@mui/material";

import { ArrowIcon } from "../../../../../../helpers/Icons";
import CTextField from "../../../../../../helpers/CustomInputs/CTextField";
import { useDispatch } from "react-redux";

import { useDebounce } from "react-use";
import { useParams } from "react-router-dom";

function PriceFilter({ filters, setFilters, trigger, setTrigger}) {
  const previousValues = useRef({});

  const [priceFilter, setPriceFilter] = useState({
    min: filters?.basics?.price?.min || 0,
    max: filters?.basics?.price?.max || 0,
  });

  const [sliderValue, setSliderValue] = useState([
    priceFilter.min || filters?.basics?.price?.min,
    priceFilter.max || filters?.basics?.price?.max,
  ]);

  // Синхронизация и правильная работа отобржаения и установления значений

  const handleChangeMin = (event) => {
    const newMin = event.target.value;
    setPriceFilter((prev) => ({
      ...prev,
      min: newMin,
    }));
  };

  const handleChangeMax = (event) => {
    const newMax = event.target.value;
    setPriceFilter((prev) => ({
      ...prev,
      max: newMax,
    }));
  };

  const validateAndSetMin = () => {
    let min =
      priceFilter.min === ""
        ? filters?.basics?.price?.min
        : Number(priceFilter.min);
    min = Math.max(min, filters?.basics?.price?.min);

    if (min > priceFilter.max) {
      min = priceFilter.max; // Ensure min is not greater than max
    }

    setPriceFilter((prev) => ({
      ...prev,
      min: min,
    }));

    setSliderValue([min, priceFilter.max]);
  };

  const validateAndSetMax = () => {
    let max =
      priceFilter.max === ""
        ? filters?.basics?.price?.max
        : Number(priceFilter.max);
    max = Math.min(max, filters?.basics?.price?.max);

    if (max < priceFilter.min) {
      max = priceFilter.min; // Ensure max is not less than min
    }

    setPriceFilter((prev) => ({
      ...prev,
      max: max,
    }));

    setSliderValue([priceFilter.min, max]);
  };

  const handleSliderChange = (event, newValue) => {
    setPriceFilter({ min: newValue[0], max: newValue[1] });
    setSliderValue([newValue[0], newValue[1]]);
  };

//Логика отправки/изменения стейта

  useEffect(() => {

    if ((previousValues.current[0] !== filters?.basics?.price?.current_values?.min) || (previousValues.current[1] !== filters?.basics?.price?.current_values?.max) ) {
  console.log("previousValues.current 3")
  console.log(previousValues.current, filters, priceFilter)

    setPriceFilter({
      min: filters?.basics?.price?.current_values?.min || 0,
      max: filters?.basics?.price?.current_values?.max || 0,
    });
    setSliderValue([filters?.basics?.price?.current_values?.min, filters?.basics?.price?.current_values?.max]);

    }

  }, [filters]);



  useEffect(() => {
    //Чтобы установить значения фильтров по максимуму при смене категорий
    if (trigger === "categoryId") {
      // console.log("filters", filters, {
      //   min: filters?.basics?.price?.min || 0,
      //   max: filters?.basics?.price?.max || 0,
      // })
      setPriceFilter({
        min: filters?.basics?.price?.current_values?.min || 0,
        max: filters?.basics?.price?.current_values?.max || 0,
      });
      setSliderValue([filters?.basics?.price?.current_values?.min, filters?.basics?.price?.current_values?.max]);
      // setPriceFilter({
      //   min: filters?.basics?.price?.min || 0,
      //   max: filters?.basics?.price?.max || 0,
      // });
      // setSliderValue([filters?.basics?.price?.min, filters?.basics?.price?.max]);

      //Чтобы не было отправления после первого изменения чекбоксов(после первичной загрузки)
      previousValues.current = [filters?.basics?.price?.min, filters?.basics?.price?.max];
      
  console.log("previousValues.current 1")
  console.log(previousValues.current, filters, priceFilter)
    }
 
  }, [trigger]);

  useDebounce(
    () => {
      //Чтобы не было отправления при первичной инициализации и после смены категории(особенно при переключении с категории без цены на категорию с ценой - это как перчиная инициалзация)
      if (trigger === "categoryId") {
        setTrigger("");
        return

      console.log("not categoryId")

      };
      console.log("previousValues.current 2")
      console.log(previousValues.current, filters, priceFilter)

      //Чтобы не было отправления после первого изменеия чекбоксов
      if ((Number(previousValues.current[0]) === Number(priceFilter.min)) && (Number(previousValues.current[1]) === Number(priceFilter.max)) ) {
        return
      }

      const currentState = JSON.parse(JSON.stringify(filters));

      currentState.basics.price.current_values = {
        min: priceFilter.min,
        max: priceFilter.max,
      };

      currentState.lastChanged = {
        type: "basics",
        filter: "price",
      };
      previousValues.current = [priceFilter.min, priceFilter.max];
      setFilters(currentState);
    },
    1000,
    [priceFilter]
  );

  return (
    <Accordion
      sx={{
        boxShadow: "none",
        padding: 0,
        margin: 0,
        border: "none",
        "&:before": {
          display: "none",
        },
        "&.Mui-expanded": {
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
        <Slider
          sx={{ color: "#15765B" }}
          size="small"
          getAriaLabel={() => "Price range"}
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
              value={priceFilter?.min}
              onChange={handleChangeMin}
              onBlur={validateAndSetMin}
            />
            <CTextField
              label={`до ${filters?.basics?.price?.max}`}
              name="max_price"
              type="number"
              value={priceFilter?.max}
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
