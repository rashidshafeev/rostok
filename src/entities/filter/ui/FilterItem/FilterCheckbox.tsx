// src/entities/filter/ui/FilterItem/FilterCheckbox.tsx

import { memo } from 'react';

import { FormControlLabel, Checkbox } from '@mui/material';

interface FilterCheckboxProps {
  label: React.ReactNode;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  className?: string;
}

export const FilterCheckbox = memo(
  ({
    label,
    checked,
    onChange,
    disabled = false,
    className = '',
  }: FilterCheckboxProps) => {
    return (
      <FormControlLabel
        className={`m-0 ${className} ${disabled ? 'opacity-40' : ''}`}
        control={
          <Checkbox
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            style={{
              color: '#15765B',
              padding: '5px',
            }}
          />
        }
        label={<div className="text-sm font-medium text-colBlack">{label}</div>}
      />
    );
  }
);

FilterCheckbox.displayName = 'FilterCheckbox';
