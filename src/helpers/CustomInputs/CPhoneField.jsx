import InputMask from 'react-input-mask';
import TextField from '@mui/material/TextField';
import { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const CPhoneField = forwardRef(({ ...props }, ref) => {
  const { ...textFieldProps } = props;

  return (
    <InputMask
      mask='+7 (999) 999-99-99'
      value={props.value}
      onChange={props.onChange}
      {...props}
    >
      {() => (
        <TextField
          size='small'
          fullWidth
          {...textFieldProps}
          variant='outlined'
          {...props}
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
      )}
    </InputMask>
  );
});

export default CPhoneField;
