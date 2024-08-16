import React from 'react';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

const FilterItem = ({ type, filter, onFilterChange }) => {
  const handlePriceChange = (event, newValue) => {
    onFilterChange({ min_price: newValue[0], max_price: newValue[1] });
  };

  const handleCheckboxChange = (event) => {
    onFilterChange({ [type]: event.target.checked ? event.target.value : null });
  };

  const handleRadioChange = (event) => {
    onFilterChange({ [type]: event.target.value });
  };

  if (type === 'price') {
    return (
      <Slider
        value={[filter.current_values.min, filter.current_values.max]}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={filter.min}
        max={filter.max}
      />
    );
  }

  if (type === 'tag' || type === 'brand') {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={filter.is_selected}
            onChange={handleCheckboxChange}
            value={filter.tag || filter.id}
          />
        }
        label={filter.name || filter.tag}
      />
    );
  }

  if (type === 'color' || type === 'text') {
    return (
      <RadioGroup value={filter.id} onChange={handleRadioChange}>
        {filter.values.map((value) => (
          <FormControlLabel
            key={value.id}
            value={value.id}
            control={<Radio />}
            label={value.text}
            style={{ backgroundColor: value.color }}
          />
        ))}
      </RadioGroup>
    );
  }

  return null;
};

export default FilterItem;
