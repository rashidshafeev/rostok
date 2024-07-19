// src/components/SimpleCheckoutForm.tsx
import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CTextField from '../../helpers/CustomInputs/CTextField';
import PhoneVerificationField from '../../helpers/PhoneVerificationField/PhoneVerificationField';
// import PhoneVerificationField from './PhoneVerificationField';

function SimpleCheckoutForm({ user }) {
  const { control, reset, formState: { errors } } = useFormContext();

  useEffect(() => {
    if (user?.success) {
      reset({
        name: user?.user?.name || '',
        email: user?.user?.email || '',
        phone: user?.user?.phone || ''
      });
    }
  }, [user, reset]);

  return (
    <>
      <div className='flex flex-wrap gap-2'>
        <div className='md:w-[340px] w-full'>
          <Controller
            name='name'
            control={control}
            defaultValue=''
            rules={{
              required: 'Поле обязательно к заполнению!',
            }}
            render={({ field }) => (
              <CTextField label='Имя' type='text' {...field} />
            )}
          />
          {errors?.name && (
            <p className='text-red-500 mt-1 text-xs font-medium'>
              {errors?.name?.message || 'Error!'}
            </p>
          )}
        </div>
        <div className='md:w-[340px] w-full'>
          <Controller
            name='email'
            control={control}
            defaultValue=''
            rules={{
              required: 'Поле обязательно к заполнению!',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Введите корректный адрес электронной почты',
              },
            }}
            render={({ field }) => (
              <CTextField label='Электронная почта' type='email' {...field} />
            )}
          />
          {errors?.email && (
            <p className='text-red-500 mt-1 text-xs font-medium'>
              {errors?.email?.message || 'Error!'}
            </p>
          )}
        </div>
      </div>
      <PhoneVerificationField user={user} />
    </>
  );
}

export default SimpleCheckoutForm;
