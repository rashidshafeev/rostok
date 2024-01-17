import TextField from '@mui/material/TextField';
import InputMask from 'react-input-mask';

const CPhoneField = ({ ...props }) => {
  return (
    <InputMask
      mask='+7 (999) 999-99-99'
      defaultValue={props.defaultValue}
      onChange={props.onChange}
    >
      {() => (
        <TextField
          size='small'
          fullWidth
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
        />
      )}
    </InputMask>
  );
};

export default CPhoneField;
