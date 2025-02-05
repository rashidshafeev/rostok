// src/components/SimpleCheckoutForm.tsx
import React, { useEffect } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { PhoneVerificationField } from '@/features/auth/ui/components/PhoneVerificationField';
import { CPhoneField } from '@/shared/ui/inputs/CPhoneField';
import { CTextField } from '@/shared/ui/inputs/CTextField';
// import PhoneVerificationField from './PhoneVerificationField';

const SimpleCheckoutForm = ({ user }) => {
  const {
    control,
    reset,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (user?.success) {
      reset({
        name: user?.user?.name || '',
        email: user?.user?.email || '',
        phone: user?.user?.phone || '',
      });
    }
  }, [user, reset]);

  return (
    <div className="flex flex-wrap gap-2">
      <div className="md:w-[340px] w-full">
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{
            required: 'Поле обязательно к заполнению!',
          }}
          render={({ field }) => (
            <CTextField label="Имя" type="text" {...field} />
          )}
        />
        {errors?.name ? (
          <p className="text-red-500 mt-1 text-xs font-medium">
            {errors?.name?.message || 'Error!'}
          </p>
        ) : null}
      </div>
      <div className="md:w-[340px] w-full">
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: 'Поле обязательно к заполнению!',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Введите корректный адрес электронной почты',
            },
          }}
          render={({ field }) => (
            <CTextField label="Электронная почта" type="email" {...field} />
          )}
        />
        {errors?.email ? (
          <p className="text-red-500 mt-1 text-xs font-medium">
            {errors?.email?.message || 'Error!'}
          </p>
        ) : null}
      </div>
      <div className="md:w-[340px] w-full">
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          // rules={{
          //   required: 'Поле обязательно к заполнению!',
          //   pattern: {
          //     value: /^((\+7|7|8)[\s\-]?)?(\(?\d{3}\)?[\s\-]?)?[\d\s\-]{10}$/,
          //     message: 'Введите корректный номер телефона',
          //   },
          //   validate: {
          //     confirmed: (value) => {
          //       if (user?.user?.phone || verification?.verificationSuccess === 'ok') {
          //         return null;
          //       } else {
          //         return 'Подтвердите номер телефона';
          //       }
          //     },
          //   }
          // }}
          render={({ field }) => (
            <CPhoneField
              // disabled={verification?.success === 'ok' || sendVerificationIsLoading || sendVerificationIsSuccess}
              // disabled={verification?.verificationSuccess === 'ok' || retryDisabled}
              // success={verification?.verificationSuccess === 'ok'}
              //   fail={!(verification?.verification === null) && !(verification?.verification || user?.user?.phone)}
              //   loading={miniLoading}
              label="Телефон"
              {...field}
            />
          )}
        />
      </div>
    </div>
  );
};

export default SimpleCheckoutForm;
