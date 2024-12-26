// src/components/Catalog/CatalogSidebar/SidebarFilters/PriceFilter.tsx

import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Slider,
} from "@mui/material";

import { ArrowIcon } from "@helpers/Icons";
import CTextField from '@/shared/ui/inputs/CTextField';
import { useDebounce } from "react-use";


function PriceFilter({ filters, setFilters }) {
  const [priceFilter, setPriceFilter] = useState([0, 0]);
  const [sliderValue, setSliderValue] = useState([0, 0]);
  const [debouncedValue, setDebouncedValue] = useState([0, 0]);
  const isInternalUpdate = useRef(false);

  // Update local state when filters change
  useEffect(() => {
    if (!isInternalUpdate.current && filters?.basics?.price) {
      const min = filters.basics.price.current_values?.min || filters.basics.price.min || 0;
      const max = filters.basics.price.current_values?.max || filters.basics.price.max || 0;
      
      setPriceFilter([min, max]);
      setSliderValue([min, max]);
      setDebouncedValue([min, max]);
    }
    isInternalUpdate.current = false;
  }, [filters?.basics?.price]);

  const updateFilters = (min: number, max: number) => {
    isInternalUpdate.current = true;
    const currentState = JSON.parse(JSON.stringify(filters));
    currentState.basics.price.current_values = { min, max };
    setFilters(currentState);
  };

  const handleChangeMin = (event) => {
    const newMin = Number(event.target.value);
    setPriceFilter((prev) => [newMin, prev[1]]);
  };

  const handleChangeMax = (event) => {
    const newMax = Number(event.target.value);
    setPriceFilter((prev) => [prev[0], newMax]);
  };

  const validateAndSetMin = () => {
    let min = priceFilter[0] === "" ? filters?.basics?.price?.min : Number(priceFilter[0]);
    min = Math.max(min, filters?.basics?.price?.min);
    min = Math.min(min, priceFilter[1]);

    setPriceFilter((prev) => [min, prev[1]]);
    setSliderValue([min, priceFilter[1]]);
    updateFilters(min, priceFilter[1]);
  };

  const validateAndSetMax = () => {
    let max = priceFilter[1] === "" ? filters?.basics?.price?.max : Number(priceFilter[1]);
    max = Math.min(max, filters?.basics?.price?.max);
    max = Math.max(max, priceFilter[0]);

    setPriceFilter((prev) => [prev[0], max]);
    setSliderValue([priceFilter[0], max]);
    updateFilters(priceFilter[0], max);
  };

  const handleSliderChange = (event, newValue) => {
    setPriceFilter(newValue);
    setSliderValue(newValue);
    setDebouncedValue(newValue);
  };

  const handleKeyDown = (event, validateFn) => {
    if (event.key === 'Enter') {
      validateFn();
    }
  };

  // Debounce slider updates
  useDebounce(
    () => {
      if (debouncedValue[0] !== filters?.basics?.price?.current_values?.min || 
          debouncedValue[1] !== filters?.basics?.price?.current_values?.max) {
        updateFilters(debouncedValue[0], debouncedValue[1]);
      }
    },
    500,
    [debouncedValue]
  );

  if (!filters?.basics?.price) {
    return null;
  }

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
      disableGutters
    >
      <AccordionSummary
        sx={{ padding: 0, flexDirection: "row-reverse", gap: "8px" }}
        style={{ minHeight: 0 }}
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
              value={priceFilter[0]}
              onChange={handleChangeMin}
              onBlur={validateAndSetMin}
              onKeyDown={(e) => handleKeyDown(e, validateAndSetMin)}
            />
            <CTextField
              label={`до ${filters?.basics?.price?.max}`}
              name="max_price"
              type="number"
              value={priceFilter[1]}
              onChange={handleChangeMax}
              onBlur={validateAndSetMax}
              onKeyDown={(e) => handleKeyDown(e, validateAndSetMax)}
            />
          </div>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default PriceFilter;
