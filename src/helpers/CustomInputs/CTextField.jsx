import TextField from '@mui/material/TextField';

const CTextField = ({
  borderColor,
  focusedBorderColor,
  labelColor,
  ...props
}) => {
  return (
    <TextField
      size='small'
      fullWidth
      variant='outlined'
      {...props}
      InputProps={{
        sx: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
            borderColor: borderColor || '#222',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
            borderColor: borderColor || '#222',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: focusedBorderColor || '#15765B',
            borderWidth: '1px',
          },
        },
      }}
      InputLabelProps={{
        sx: {
          '&.Mui-focused': {
            color: labelColor || '#15765B',
          },
        },
      }}
      {...props}
    />
  );
};

export default CTextField;
