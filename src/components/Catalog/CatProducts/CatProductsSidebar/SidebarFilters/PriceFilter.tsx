import { Filters } from '@/types/Filters/Filters';
import { useState, useRef } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import { Slider } from '@mui/material';
import { CTextField } from '@/components/CTextField';
import { ArrowIcon } from '@/components/ArrowIcon';

interface PriceFilterProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  trigger: string;
  setTrigger: (trigger: string) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ filters, setFilters, trigger, setTrigger }) => {
  const previousValues = useRef({});

  const [priceFilter, setPriceFilter] = useState([
    filters?.basics?.price?.current_values?.min || 0,
    filters?.basics?.price?.current_values?.max || 0,
  ]);
  
  const [sliderValue, setSliderValue] = useState([
    priceFilter[0],
    priceFilter[1],
  ]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number[]);
    setPriceFilter(newValue as number[]);
  };

  const handleChangeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(priceFilter[1], Number(event.target.value));
    setPriceFilter([newMin, priceFilter[1]]);
    setSliderValue([newMin, priceFilter[1]]);
  };

  const handleChangeMax = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(priceFilter[0], Number(event.target.value));
    setPriceFilter([priceFilter[0], newMax]);
    setSliderValue([priceFilter[0], newMax]);
  };

  const validateAndSetMin = (event: React.FocusEvent<HTMLInputElement>) => {
    const newMin = Math.min(priceFilter[1], Number(event.target.value));
    setPriceFilter([newMin, priceFilter[1]]);
    setSliderValue([newMin, priceFilter[1]]);
  };

  const validateAndSetMax = (event: React.FocusEvent<HTMLInputElement>) => {
    const newMax = Math.max(priceFilter[0], Number(event.target.value));
    setPriceFilter([priceFilter[0], newMax]);
    setSliderValue([priceFilter[0], newMax]);
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