import TextField from '@mui/material/TextField';

const CTextField = ({ inputRef, ...props }) => {
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
      ref={inputRef}
    />
  );
};

export default CTextField;
