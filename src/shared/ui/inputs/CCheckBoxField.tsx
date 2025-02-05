import { forwardRef } from 'react';

import { Checkbox, FormControlLabel } from '@mui/material';

export const CCheckBoxField = forwardRef(({ label, styles, ...props }, ref) => {
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
