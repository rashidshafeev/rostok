// src/AuthModal/CheckAuth.tsx

import { useState } from 'react';

import { KeyboardArrowRight } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';

import { useRegistrationCheckMutation } from '@/features/auth';
import { getErrorMessage } from '@/shared/lib/errors';
import { Alert, AlertDescription } from '@/shared/ui/alert';
import { CPhoneField } from '@/shared/ui/inputs/CPhoneField';
import { LoadingSmall } from '@/shared/ui/Loader';

export const CheckAuth = ({ setContent, setLogin }) => {
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const [registrationCheck, { isLoading }] = useRegistrationCheckMutation();

  const onSubmitAuthCheck = async (data) => {
    setError(null);
    console.log('Form data:', data);
    try {
      const check = await registrationCheck(data);
      console.log('API response:', check);
      if (check.data) {
        if (
          check.data.login_type === 'email' ||
          check.data.login_type === 'phone'
        ) {
          setLogin({ type: check.data.login_type, login: data.login });
          setContent('authWithEmail');
        }
      } else {
        setError(check.err);
        setLogin({ type: 'phone', login: data.login });
        setContent('register');
      }
    } catch (error) {
      setError(getErrorMessage(error));
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-2xl mm:text-3xl text-colBlack text-center pt-2 pb-8 font-semibold">
        Вход или Регистрация
      </h1>
      <form onSubmit={handleSubmit(onSubmitAuthCheck)}>
        <Controller
          name="login"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CPhoneField
              label="Введите телефон"
              type="text"
              required={true}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
        {error ? (
          <p className="text-xs text-red-400">{error || 'Error!'}</p>
        ) : null}
        <button
          disabled={isLoading}
          className="w-full h-10 px-6 bg-colGreen rounded mt-5 text-white font-semibold flex justify-center items-center"
        >
          {!isLoading ? (
            <>
              Продолжить
              <KeyboardArrowRight className="!w-5" />
            </>
          ) : null}
          {isLoading ? <LoadingSmall extraStyle="white" /> : null}
        </button>
      </form>
    </>
  );
};
