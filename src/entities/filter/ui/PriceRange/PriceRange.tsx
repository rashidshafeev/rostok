// src/entities/filter/ui/PriceRange/PriceRange.tsx

import { memo, useEffect, useState } from 'react';
import { Slider, Box } from '@mui/material';
import { useDebounce } from 'react-use';
import { CTextField } from '@/shared/ui/inputs';

interface PriceRangeProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  className?: string;
}

export const PriceRange = memo(({
  min,
  max,
  value,
  onChange,
  className = ''
}: PriceRangeProps) => {
  const [localValue, setLocalValue] = useState(value);

  // Debounce value changes
  useDebounce(
    () => {
      if (localValue[0] !== value[0] || localValue[1] !== value[1]) {
        onChange(localValue);
      }
    },
    1000,
    [localValue]
  );

  // Update local value when props change
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className={className}>
      <Slider
        value={localValue}
        onChange={(_, newValue) => setLocalValue(newValue as [number, number])}
        min={min}
        max={max}
        sx={{ color: '#15765B' }}
      />
      
      <Box className="grid grid-cols-2 gap-3">
        <CTextField
          label={`от ${min}`}
          type="number"
          value={localValue[0]}
          onChange={(e) => setLocalValue([Number(e.target.value), localValue[1]])}
        />
        <CTextField
          label={`до ${max}`}
          type="number"
          value={localValue[1]}
          onChange={(e) => setLocalValue([localValue[0], Number(e.target.value)])}
        />
      </Box>
    </div>
  );
});

PriceRange.displayName = 'PriceRange';
