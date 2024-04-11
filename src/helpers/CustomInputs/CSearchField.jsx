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

      onChange={props?.handleFilter}

      InputProps={{
        endAdornment: (
          <SearchIcon
            sx={{
              marginLeft: 1,
              marginRight: 1,
              color: '#15765B',
              backgroundColor: '#fff',
            }}
          />
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
          paddingRight: 0,
        },
      }}
      InputLabelProps={{
        sx: {
          '&.Mui-focused': {
            color: '#15765B',
          },
        },
      }}
      xs={{ borderColor: 'red' }}
    />
  );
};

export default CSearchField;
