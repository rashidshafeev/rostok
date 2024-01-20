import { Checkbox, FormControlLabel } from '@mui/material';
import { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const CLabelField = forwardRef(({ label, ...props }, ref) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          {...props}
          sx={{
            color: '#15765B',
            '&.Mui-checked': {
              color: '#15765B',
            },
          }}
          inputRef={ref}
        />
      }
      label={<span className='text-xs font-medium'>{label}</span>}
    />
  );
});

export default CLabelField;
