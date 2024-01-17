import TextField from '@mui/material/TextField';

const CTextField = ({ ...props }) => {
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
    />
  );
};

export default CTextField;
