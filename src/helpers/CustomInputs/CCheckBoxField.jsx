import { Checkbox, FormControlLabel } from '@mui/material';
import { forwardRef } from 'react';
// import checked from "../../assets/icons/form-check-input-rect-checked.svg";
import checked from "../../assets/icons/form-check-input-rect-checked.svg";
import unchecked from "../../assets/icons/form-check-input-rect-unchecked.svg";

// eslint-disable-next-line react/display-name
const CCheckBoxField = forwardRef(({ label, styles, ...props }, ref) => {
  
  return (
    <FormControlLabel
      control={
        <Checkbox
          {...props}
          sx={{
            cursor: `${props.isLoading ? 'wait' : 'pointer'}`,
            color: '#15765B',
            marginRight: '0',
            '&.Mui-checked': {
              color: '#15765B',
            },
          }}
          // icon={checked}
          // checkedIcon={unchecked}
          inputRef={ref}
        
        />
      }
      label={<span className={`${styles}`}>{label}</span>}
      sx={{ marginRight: 0 }}
    />
  );
});

export default CCheckBoxField;
