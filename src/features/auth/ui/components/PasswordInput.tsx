import { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Controller } from 'react-hook-form';

import { CTextField } from '@/shared/ui/inputs/CTextField';

interface PasswordInputProps {
  name: string;
  label: string;
  control: Control<any>;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordInput = ({
  name,
  label,
  control,
  error,
  onChange,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <CTextField
            {...field}
            label={label}
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => {
              field.onChange(e);
              onChange?.(e);
            }}
          />
        )}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-1/2 -translate-y-1/2 right-3 opacity-60 cursor-pointer"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </button>
      {error ? (
        <p className="text-red-500 mt-1 text-xs font-medium">{error}</p>
      ) : null}
    </div>
  );
};
