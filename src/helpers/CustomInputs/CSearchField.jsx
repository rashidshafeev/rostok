import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const CSearchField = (props) => {
  return (
    <TextField
      size='small'
      fullWidth
      variant='outlined'
      name={props?.name}
      label={props?.label}
      type={props?.type}
      InputProps={{
        endAdornment: (
          <SearchIcon
            sx={{
              marginLeft: 1,
              marginRight: 1,
              color: '#15765B',
            }}
          />
        ),
        sx: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
            borderColor: props.borderColor || '#222',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
            borderColor: props.borderColor || '#222',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: props.focusedBorderColor || '#15765B',
            borderWidth: '1px',
          },
          paddingRight: 0,
        },
      }}
      InputLabelProps={{
        sx: {
          '&.Mui-focused': {
            color: props.labelColor || '#15765B',
          },
        },
      }}
    />
  );
};

export default CSearchField;
