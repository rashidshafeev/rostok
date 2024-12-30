import { useState } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export const CSelectField = (props) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel
        sx={{
          '&.Mui-focused': {
            color: props?.labelColor || '#15765B',
          },
        }}
      >
        {props?.label}
      </InputLabel>
      <Select
        label={props?.label}
        name={props?.name}
        value={selectedValue}
        onChange={handleChange}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
            borderColor: '#B5B5B5',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
            borderColor: '#B5B5B5',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#15765B',
            borderWidth: '1px',
          },
          '&.Mui-focused': {
            color: '#15765B',
          },
          paddingRight: 0,
        }}
      >
        {props.children}
        {props?.options?.map((el, index) => (
          <MenuItem key={index} value={el?.value}>
            {el?.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
