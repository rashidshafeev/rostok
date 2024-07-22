// src/components/PhoneVerificationField.tsx

import React, { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CPhoneField from '../../helpers/CustomInputs/CPhoneField';
import { useConfirmVerificationCodeMutation, useSendVerificationCodeMutation } from '../../redux/api/userEndpoints';

const PhoneVerificationField = ({ user }) => {
  const { control, watch, trigger, formState: { errors } } = useFormContext();
  const phone = watch('phone');

  const [timer, setTimer] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
//   const [miniLoading, setMiniLoading] = useState(false);
  const [verification, setVerification] = useState({ verification: null });

  const [sendVerificationCode, { isLoading: sendVerificationIsLoading, isSuccess: sendVerificationIsSuccess }] = useSendVerificationCodeMutation();
  const [confirmVerificationCode, { isLoading: confirmVerificationIsLoading, isSuccess: confirmVerificationIsSuccess }] = useConfirmVerificationCodeMutation();

  const handleSendVerificationCode = async () => {
    const data = await sendVerificationCode({ phone });
    if (data?.data?.success === 'ok') {
      // Handle success
    } else if (data?.data?.err_code === 'user__sendsms__wait') {
      const serverTime = new Date(data?.data?.err_desc).getTime();
      const currentTime = new Date().getTime();
      const waitTime = Math.max(60 - Math.floor((currentTime - serverTime) / 1000), 0);
      setTimer(waitTime);
      setIsButtonDisabled(true);
    }
  };

  const handleConfirmVerificationCode = async (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue) && inputValue.length === 4) {
      const data = await confirmVerificationCode({ phone, code: inputValue });
      setVerification(data?.data);
    }
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setIsButtonDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
            trigger('phone');

  }, [verification]);

  return (
    <div className='flex flex-wrap gap-2'>
      <div className='md:w-[340px] w-[calc(100%-148px)]'>
        <Controller
          name='phone'
          control={control}
          defaultValue=''
          rules={{
            required: 'Поле обязательно к заполнению!',
            pattern: {
              value: /^((\+7|7|8)[\s\-]?)?(\(?\d{3}\)?[\s\-]?)?[\d\s\-]{10}$/,
              message: 'Введите корректный номер телефона',
            },
            validate: {
              confirmed: (value) => {
                if (user?.user?.phone || verification?.success === 'ok') {
                  return null;
                } else {
                  return 'Подтвердите номер телефона';
                }
              },
            }
          }}
          render={({ field }) => (
            <CPhoneField
              disabled={verification?.success === 'ok' || user?.user?.phone}
              success={verification?.success === 'ok' || user?.user?.phone}
            //   fail={!(verification?.verification === null) && !(verification?.verification || user?.user?.phone)}
            //   loading={miniLoading}
              label='Телефон' {...field} />
          )}
        />
        {errors?.phone && (
          <p className='text-red-500 mt-1 text-xs font-medium'>
            {errors?.phone?.message || 'Error!'}
          </p>
        )}
      </div>
      {(!sendVerificationIsSuccess && verification?.success !== 'ok') &&
        <button
          onClick={handleSendVerificationCode}
          disabled={isButtonDisabled}
          className={`min-w-[140px] h-10 px-4 rounded text-white font-semibold flex justify-center items-center
            ${errors?.phone?.type === 'pattern' || isButtonDisabled ? 'pointer-events-none bg-colGray' : 'cursor-pointer bg-colGreen'}`}>
          {isButtonDisabled ? `00:${timer}` : 'Получить код'}
        </button>
      }
      <div className='flex flex-col'>
      {((sendVerificationIsSuccess || user?.user?.phone) && verification?.success !== 'ok') && 
          <input
            type='text'
            placeholder='Код из смс'
            onChange={handleConfirmVerificationCode}
            maxLength={4}
            className='min-w-[140px] h-10 px-4 rounded border outline-none border-colGray focus:border-colGreen lining-nums proportional-nums font-medium text-sm'
          />
      }
      {(confirmVerificationIsSuccess && verification?.err) && (
          <p className='text-red-500 mt-1 text-xs font-medium'>
            {verification?.err || 'Ошибка'}
          </p>
        )}
      </div>
      
    </div>
  );
};

export default PhoneVerificationField;
