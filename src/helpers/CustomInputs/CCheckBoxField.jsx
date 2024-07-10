import { Checkbox, FormControlLabel } from '@mui/material';
import { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const CCheckBoxField = forwardRef(({ label, styles, ...props }, ref) => {
  
  return (
    <FormControlLabel
      control={
        <Checkbox
          {...props}
          sx={{
            color: '#15765B',
            marginRight: '0',
            '&.Mui-checked': {
              color: '#15765B',
            },
          }}
          inputRef={ref}
        />
      }
      label={<span className={`${styles}`}>{label}</span>}
      sx={{ marginRight: 0 }}
    />
  );
});

export default CCheckBoxField;
