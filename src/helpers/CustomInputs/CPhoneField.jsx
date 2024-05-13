// CPhoneField.jsx

import InputMask from 'react-input-mask';
import TextField from '@mui/material/TextField';
import { forwardRef } from 'react';
import { InputAdornment } from '@mui/material';
import { CancelRounded, CheckCircleRounded } from '@mui/icons-material';
// eslint-disable-next-line react/display-name
const CPhoneField = forwardRef(({ value, onChange, loading, success, fail, ...props }, ref) => {
  const unformatPhoneNumber = (formattedValue) => {
    // eslint-disable-next-line no-useless-escape
    return formattedValue.replace(/[\s\(\)-]/g, '');
  };
  console.log(success)
  return (

    
    <InputMask
      mask='+7 (999) 999-99-99'
      value={value}
      onChange={(e) => onChange(unformatPhoneNumber(e.target.value))}
      {...props}
    >
      {() => (
        <TextField
          size='small'
          fullWidth
          variant='outlined'
          InputProps={{
            sx: {
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
            },
            endAdornment: loading ? <LoadingSmall extraStyle='#15765B' /> : success ? <CheckCircleRounded className='text-colGreen' /> : fail ? <CancelRounded className='text-red-500' /> : null ,
          }}
          InputLabelProps={{
            sx: {
              '&.Mui-focused': {
                color: '#15765B',
              },
            },
          }}
          {...props}
          ref={ref}
        />
      )}
    </InputMask>
  );
});

export default CPhoneField;
