import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
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

const CDatePicker = ({ ...props }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledDatePicker
        {...props}
        slotProps={{ textField: { size: 'small', fullWidth: true } }}
        onChange={(value) => console.log(dayjs(value).format('DD-MM-YYYY'))}
      />
    </LocalizationProvider>
  );
};

export default CDatePicker;
