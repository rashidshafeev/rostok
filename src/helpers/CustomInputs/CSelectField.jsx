import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const CSelectField = (props) => {
  return (
    <FormControl fullWidth variant='outlined' size='small'>
      <InputLabel
        sx={{
          '&.Mui-focused': {
            color: props.labelColor || '#15765B',
          },
        }}
      >
        {props.label}
      </InputLabel>
      <Select
        {...props}
        label={props.label}
        name={props.name}
        inputProps={{
          ...props.inputProps,
          sx: {
            paddingRight: 0,
          },
        }}
      >
        {props.options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CSelectField;
