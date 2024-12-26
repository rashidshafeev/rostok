/* eslint-disable react/display-name */
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { forwardRef } from 'react';
import styled from 'styled-components';

const StyledDatePicker = styled(DatePicker)(() => ({
  '& .MuiInputBase-root': {
    '& fieldset': {
      borderColor: '#B5B5B5',
      borderWidth: '1px',
    },
    '&:hover fieldset': {
      borderColor: '#B5B5B5',
      borderWidth: '1px',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#15765B',
      borderWidth: '1px',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#222',
    '&.Mui-focused': {
      color: '#15765B',
    },
  },
  '& .MuiInputBase-input': {
    color: '#222',
  },
}));

const CDatePicker = forwardRef(({ value, onChange, label }, ref) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledDatePicker
        ref={ref}
        label={label}
        value={value}
        onChange={(date) => {
          onChange(date);
        }}
        slotProps={{ textField: { size: 'small', fullWidth: true } }}
      />
    </LocalizationProvider>
  );
});

export default CDatePicker;
