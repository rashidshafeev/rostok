// src/components/PhoneVerificationField.tsx

import React, { useState, useEffect } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import {
  useConfirmVerificationCodeMutation,
  useSendVerificationCodeMutation,
} from '@/features/auth';
import {CPhoneField} from '@/shared/ui/inputs/CPhoneField';

export const PhoneVerificationField = ({
  user,
  stretchOnSuccess = false,
  defaultValue = false,
}) => {
  const {
    control,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext();
  const phone = watch('phone');

  const [timer, setTimer] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [retryDisabled, setRetryDisabled] = useState(false);
  const [verification, setVerification] = useState({
    sent: null,
    verificationSuccess: null,
    notification: null,
  });

  const [
    sendVerificationCode,
    {
      isLoading: sendVerificationIsLoading,
      isSuccess: sendVerificationIsSuccess,
    },
  ] = useSendVerificationCodeMutation();
  const [
    confirmVerificationCode,
    {
      isLoading: confirmVerificationIsLoading,
      isSuccess: confirmVerificationIsSuccess,
    },
  ] = useConfirmVerificationCodeMutation();

  const handleSendVerificationCode = async () => {
    const response = await sendVerificationCode({ phone });
    console.log("verification", response);
    let data = {}
    if (response?.data) {
      data = response?.data
    } else if (response?.error) {
      data = response?.error?.data
    }
    console.log("data", data);

    if (data?.success === 'ok') {
      setVerification({
        ...verification,
        sent: 'ok',
        notification: data?.data?.text,
      });
      setTimer(data?.data?.timeoutPeriod);
      setRetryDisabled(true);
    } else if (data?.err_code === 'user__sendsms__wait') {
      setVerification({ ...verification, sent: 'ok', notification: data?.err });
      const serverTime = new Date(data?.err_desc).getTime();
      const currentTime = new Date().getTime();
      const waitTime = Math.max(
        60 - Math.floor((currentTime - serverTime) / 1000),
        0
      );
      setTimer(waitTime);
      setRetryDisabled(true);
    } else if (data?.success !== 'ok') {
      setVerification({
        ...verification,
        sent: false,
        notification: data?.err,
      });
    }
  };

  const handleConfirmVerificationCode = async (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue) && inputValue.length === 4) {
      const { data } = await confirmVerificationCode({
        phone,
        code: inputValue,
      });
      if (data?.success === 'ok') {
        setValue('isPhoneVerified', true);
        setVerification({ ...verification, verificationSuccess: data?.success });
        await trigger(['phone', 'isPhoneVerified']);
      } else {
        setVerification({ ...verification, notification: data?.err });
      }
    }
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setRetryDisabled(false);
      // setIsButtonDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (verification?.verificationSuccess === 'ok') {
      trigger('phone'); // Trigger validation once the phone is confirmed
    }
  }, [verification?.verificationSuccess, trigger]);

  useEffect(() => {
    if (user?.user?.phone) {
      setVerification({ ...verification, success: 'ok' });
    }
  }, []);

  useEffect(() => {
    setValue('isPhoneVerified', false);
    trigger(['phone', 'isPhoneVerified']);
  }, [phone, setValue, trigger]);

  return (
    <div className="flex flex-wrap gap-2">
      <div className="grow w-full">
        <Controller
          name="phone"
          control={control}
          defaultValue={defaultValue || ''}
          rules={{
            required: 'Поле обязательно к заполнению!',
            pattern: {
              value: /^((\+7|7|8)[\s\-]?)?(\(?\d{3}\)?[\s\-]?)?[\d\s\-]{10}$/,
              message: 'Введите корректный номер телефона',
            },
            validate: {
              confirmed: () => {
                if (
                  user?.user?.phone ||
                  verification?.verificationSuccess === 'ok'
                ) {
                  return null;
                } else {
                  return 'Подтвердите номер телефона';
                }
              },
            },
          }}
          render={({ field }) => (
            <CPhoneField
              disabled={
                verification?.verificationSuccess === 'ok' || retryDisabled
              }
              success={verification?.verificationSuccess === 'ok'}
              label="Телефон"
              {...field}
            />
          )}
        />
        {errors?.phone ? (
          <p className="text-xs text-red-400">{errors?.phone?.message || 'Error!'}</p>
        ) : null}
      </div>
      {!verification?.sent && verification?.verificationSuccess !== 'ok' ? (
        <div
          onClick={handleSendVerificationCode}
          disabled={isButtonDisabled}
          className={`min-w-[140px] w-full h-10 px-4 rounded text-white font-semibold flex justify-center items-center
            ${errors?.phone?.type === 'pattern' || isButtonDisabled ? 'pointer-events-none bg-colGray' : 'cursor-pointer bg-colGreen'}`}
        >
          {isButtonDisabled ? `00:${timer}` : 'Получить код'}
        </div>
      ) : null}
      <div className="flex flex-col w-full">
        <div className="flex gap-2 w-full">
          {verification?.sent === 'ok' &&
          verification?.verificationSuccess !== 'ok' ? (
            <input
              type="text"
              placeholder="Код подтверждения"
              onChange={handleConfirmVerificationCode}
              maxLength={4}
              className="min-w-[140px] basis-[calc(50%-4px)] h-10 px-4 rounded border outline-none border-colGray focus:border-colGreen lining-nums proportional-nums font-medium text-sm"
            />
          ) : null}
          {verification?.sent === 'ok' &&
          verification?.verificationSuccess !== 'ok' ? (
            <div
              onClick={handleSendVerificationCode}
              disabled={retryDisabled}
              className={`min-w-[140px] basis-[calc(50%-4px)] h-10 px-4 rounded text-white font-semibold flex justify-center items-center
            ${errors?.phone?.type === 'pattern' || retryDisabled ? 'pointer-events-none bg-colGray' : 'cursor-pointer bg-colGreen'}`}
            >
              {retryDisabled
                ? `00:${timer < 10 ? `0${timer}` : timer}`
                : 'Попробовать снова'}
            </div>
          ) : null}
        </div>

        {/* {(!sendVerificationIsSuccess && verification?.sent === 'ok' && verification?.verificationSuccess !== 'ok') && */}

        {verification?.notification ? (
          <p className="text-xs">{verification?.notification || 'Ошибка'}</p>
        ) : null}
      </div>
    </div>
  );
};

