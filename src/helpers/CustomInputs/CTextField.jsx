import TextField from '@mui/material/TextField';
import { forwardRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// eslint-disable-next-line react/display-name
const CTextField = forwardRef(({ icon, type, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      size='small'
      fullWidth
      variant='outlined'
      type={showPassword ? 'text' : type}
      InputProps={{
        endAdornment: icon && (
          <InputAdornment position='end'>
            <IconButton onClick={togglePasswordVisibility} edge='end'>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
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
            paddingRight: icon ? '42px' : '14px',
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
