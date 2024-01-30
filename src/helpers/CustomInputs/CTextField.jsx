import TextField from '@mui/material/TextField';
import { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const CTextField = forwardRef(({ ...props }, ref) => {
  return (
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
          '.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': {
            paddingRight: props.icon === 'true' ? '42px' : '14px',
          },
        },
      }}
      InputLabelProps={{
        sx: {
          '&.Mui-focused': {
            color: '#15765B',
          },
        },
      }}
      inputProps={props.inputProps}
      {...props}
      ref={ref}
    />
  );
});

export default CTextField;
