import { FormControl, InputLabel, ListSubheader, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import CPhoneField from '../../helpers/CustomInputs/CPhoneField'
import { CancelRounded, CheckCircleRounded } from '@mui/icons-material'
import { Controller, useFormContext } from 'react-hook-form'
import { LoadingSmall } from '../../helpers/Loader/Loader'

import fizlico from '../../assets/icons/fizlico-inactive.svg';
import urlico from '../../assets/icons/urlico-inactive.svg';
import CSelectField from '../../helpers/CustomInputs/CSelectField'
import CTextField from '../../helpers/CustomInputs/CTextField'


function FizlicoNotLoggedForm({ user, organizations, isCode, handleSendVerificationCode, handleConfirmVerificationCode, miniLoading }) {
  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    formState: { errors, isValid },
  } = useFormContext()

  return (
    <div className='flex gap-2'>
      <div className='flex gap-2'>
        <div className='w-[340px]'>

          <div>
            <Controller
              name='name'
              control={control}
              defaultValue={user ? user?.user?.name : ''}
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

        </div>
        <div className='w-[340px]'>

          <Controller
            name='email'
            control={control}
            defaultValue={user ? user?.user?.email : ''}
            rules={{
              required: 'Поле обязательно к заполнению!',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message:
                  'Введите корректный адрес электронной почты',
              },
            }}
            render={({ field }) => (
              <CTextField
                label='Электронная почта'
                type='email'
                {...field}
              />
            )}
          />
          {errors?.email && (
            <p className='text-red-500 mt-1 text-xs font-medium'>
              {errors?.email?.message || 'Error!'}
            </p>
          )}

        </div>

      </div>



      <div className='w-[340px]'>
        <Controller
          name='phone'
          control={control}
          defaultValue={user ? user?.user?.phone : ''}

          rules={{
            required: 'Поле обязательно к заполнению!',
            pattern: {
              value:
                /^((\+7|7|8)[\s\-]?)?(\(?\d{3}\)?[\s\-]?)?[\d\s\-]{10}$/,
              message: 'Введите корректный номер телефона',

            },
            validate: {
              confirmed: (value) => {
                if (user?.user?.phone || isCode?.verification?.success) {
                  return null
                } else {
                  return 'Подтвердите номер телефона'
                }
              },
            }
          }}
          render={({ field }) => (
            <CPhoneField disabled={isCode?.verification?.success || user?.user?.phone} label='Телефон' {...field} />
          )}
        />
        {errors?.phone && (
          <p className='text-red-500 mt-1 text-xs font-medium'>
            {errors?.phone?.message || 'Error!'}
          </p>
        )}
      </div>
      {isCode?.sendCode?.success === 'ok' || user?.user?.phone ? (
        <div className='relative'>
          <input
            type='text'
            placeholder='Код из смс'
            onChange={handleConfirmVerificationCode}
            maxLength={4}
            className={`${isCode?.verification?.success || user?.user?.phone ? 'hidden' : ''
              } min-w-[140px] h-10 px-4 rounded border outline-none border-colBlack lining-nums proportional-nums font-medium text-sm`}
          />
          {miniLoading ? (
            <div className='absolute top-1/2 right-2 -translate-y-1/2 w-7 h-7 flex justify-center items-center'>
              <LoadingSmall extraStyle='#15765B' />
            </div>
          ) : user?.user?.phone ? (
            <div className='absolute top-1/2 right-3 -translate-y-1/2 w-7 h-7 flex justify-center items-center'>
              <CheckCircleRounded className='text-colGreen' />
            </div>
          ) : isCode?.verification === null ? (
            ''
          ) : isCode?.verification?.success ? (
            <div className='absolute top-1/2 right-3 -translate-y-1/2 w-7 h-7 flex justify-center items-center'>
              <CheckCircleRounded className='text-colGreen' />
            </div>
          ) : (
            <div className='absolute top-1/2 right-2 -translate-y-1/2 w-7 h-7 flex justify-center items-center'>
              <CancelRounded className='text-red-500' />
            </div>
          )}
        </div>
      ) : (
        <span
          onClick={handleSendVerificationCode}
          className={`min-w-[140px] h-10 px-4 rounded text-white font-semibold flex justify-center items-center ${errors.phone
            ? 'cursor-pointer bg-colGreen'
            : 'pointer-events-none bg-colGray'
            }`}
        >
          {miniLoading ? (
            <LoadingSmall extraStyle='#fff' />
          ) : (
            'Получить код'
          )}
        </span>
      )}
    </div>
  )
}

export default FizlicoNotLoggedForm