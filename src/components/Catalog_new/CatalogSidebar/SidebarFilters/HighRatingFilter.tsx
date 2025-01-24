import { FormControlLabel } from '@mui/material';

import { IOSSwitch } from '@/components/common/styledComponents/IOSSwitch';

interface HighRatingFilterProps {
  onChange: (checked: boolean) => void;
  defaultChecked?: boolean;
}

export const HighRatingFilter = ({
  onChange,
  defaultChecked = true,
}: HighRatingFilterProps) => {
  const handleChange = (checked: boolean) => {
    onChange(checked);
  };

  return (
    <FormControlLabel
      sx={{ margin: '10px 0' }}
      control={
        <IOSSwitch
          sx={{ m: 1 }}
          defaultChecked={defaultChecked}
          onChange={(e) => handleChange(e.target.checked)}
        />
      }
      labelPlacement="start"
      label={
        <p className="text-sm font-semibold text-colBlack">Высокий рейтинг</p>
      }
    />
  );
};
