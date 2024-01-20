import { forwardRef } from 'react';
import TextField from '@mui/material/TextField';

// eslint-disable-next-line react/display-name
const CTextField = forwardRef((props, ref) => {
  return (
    <TextField
      size='small'
      fullWidth
      variant='outlined'
      InputProps={{
        sx: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
            borderColor: '#222',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
            borderColor: '#222',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#15765B',
            borderWidth: '1px',
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
      {...props}
      ref={ref}
    />
  );
});

export default CTextField;
