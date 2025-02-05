import React, { useState, useEffect } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { CTextField } from '@/shared/ui/inputs/CTextField';
import { LoadingSmall } from '@/shared/ui/Loader';

import { useAuthWithEmail } from '../../hooks/useAuthWithEmail';
import { useSyncUserData } from '../../hooks/useSyncUserData';
import { CPhoneField } from '@/shared/ui';

export const AuthWithEmail = ({
  hideModal,
  setContent,
  login: enteredLogin,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange', defaultValues: { login: enteredLogin?.login } });

  const [isShow, setIsShow] = useState(false);

  const cart = useSelector((state) => state.cart.cart);
  const comparison = useSelector((state) => state.comparison.comparison);
  const favorite = useSelector((state) => state.favorite.favorite);
  console.log('enteredLogin:', enteredLogin);
  const {
    authenticate,
    responseError,
    isLoading: authLoading,
  } = useAuthWithEmail(hideModal);
  const { syncOnLogin, isLoading: syncLoading } = useSyncUserData();

  const isLoading = authLoading || syncLoading;

  const onSubmitAuthWithEmail = async (data) => {
    const success = await authenticate(data);
    if (success) {
      await syncOnLogin(cart, comparison, favorite);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitAuthWithEmail)}>
      <Controller
        name="login"
        control={control}
        render={({ field }) => (
          <CPhoneField
            label="Телефон"
            type="text"
            required={true}
            {...field}
          />
        )}
      />
      <div className="flex relative mt-5">
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CTextField
              label="Пароль"
              type={isShow ? 'text' : 'password'}
              required={true}
              {...field}
            />
          )}
        />
        {isShow ? (
          <VisibilityOff
            onClick={() => setIsShow(false)}
            className="absolute top-1/2 -translate-y-1/2 right-3 opacity-60 cursor-pointer"
          />
        ) : (
          <Visibility
            onClick={() => setIsShow(true)}
            className="absolute top-1/2 -translate-y-1/2 right-3 opacity-60 cursor-pointer"
          />
        )}
      </div>
      {responseError ? <p className="text-xs mt-1">{responseError}</p> : null}

      <button
        className="w-full h-10 px-6 bg-colGreen rounded mt-5 text-white font-semibold flex justify-center items-center"
        disabled={!isValid || isLoading}
      >
        {!isLoading ? <>Войти</> : null}
        {isLoading ? <LoadingSmall extraStyle="white" /> : null}
      </button>
      <p
        onClick={() => setContent('resetPassword')}
        className="text-center mt-4 text-colGray2 font-medium cursor-pointer"
      >
        Забыли пароль?
      </p>
    </form>
  );
};
