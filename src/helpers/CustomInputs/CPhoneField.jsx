/* eslint-disable no-useless-escape */
/* eslint-disable react/display-name */
import InputMask from 'react-input-mask';
import TextField from '@mui/material/TextField';
import { forwardRef } from 'react';
import { CancelRounded, CheckCircleRounded } from '@mui/icons-material';
import { LoadingSmall } from '../Loader/Loader';

const CPhoneField = forwardRef(
  ({ value, onChange, loading, success, fail, ...props }, ref) => {
    const unformatPhoneNumber = (formattedValue) => {
      return formattedValue.replace(/[\s\(\)-]/g, '');
    };
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
              endAdornment: loading ? (
                <LoadingSmall extraStyle='#15765B' />
              ) : success ? (
                <CheckCircleRounded className='text-colGreen' />
              ) : fail ? (
                <CancelRounded className='text-red-500' />
              ) : null,
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
  }
);

export default CPhoneField;
