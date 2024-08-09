// src/components/PriceFilter.jsx

import React, { useEffect, useState } from "react";
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
import { setPriceFilter as setPriceFilterStore } from "../../../../../../redux/slices/filterSlice";

import { useDebounce } from "react-use";

function PriceFilter({ filters }) {
  const dispatch = useDispatch();

  const [priceFilter, setPriceFilter] = useState({
    min: filters?.basics?.price?.min || "",
    max: filters?.basics?.price?.max || "",
  });

  const [sliderValue, setSliderValue] = useState([
    priceFilter.min || filters?.basics?.price?.min,
    priceFilter.max || filters?.basics?.price?.max,
  ]);

  useEffect(() => {
    setPriceFilter({
      min: filters?.basics?.price?.min || "",
      max: filters?.basics?.price?.max || "",
    });
    setSliderValue([filters?.basics?.price?.min, filters?.basics?.price?.max]);
  }, []);

  useEffect(() => {
    setSliderValue([
      priceFilter.min || filters?.basics?.price?.min,
      priceFilter.max || filters?.basics?.price?.max,
    ]);
  }, [priceFilter]);

  useDebounce(
    () => {
        console.log("priceFilter", priceFilter);

      dispatch(
        setPriceFilterStore({
          min: priceFilter.min,
          max: priceFilter.max,
        })
      );
    },
    500,
    [priceFilter]
  );

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
    const min = priceFilter.min === "" ? filters?.basics?.price?.min : Number(priceFilter.min);
    setPriceFilter((prev) => ({
      ...prev,
      min: Math.max(min, filters?.basics?.price?.min),
    }));
  };

  const validateAndSetMax = () => {
    const max = priceFilter.max === "" ? filters?.basics?.price?.max : Number(priceFilter.max);
    setPriceFilter((prev) => ({
      ...prev,
      max: Math.min(max, filters?.basics?.price?.max),
    }));
  };

  const handleSliderChange = (event, newValue) => {
    setPriceFilter({ min: newValue[0], max: newValue[1] });
  };

  const handleSliderChangeCommitted = (event, newValue) => {
    setPriceFilter({ min: newValue[0], max: newValue[1] });
    // Handle any side effects when slider changes are committed
  };

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
          onChangeCommitted={handleSliderChangeCommitted}
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
