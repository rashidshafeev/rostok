import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import image from '@/shared/assets/images/want-to-be-partner.png'
import { CTextField } from '@/shared/ui/inputs/CTextField';
import { CPhoneField } from '@/shared/ui/inputs/CPhoneField';

function WantToBePartnerFrom() {
  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmitAuthCheck = async (data) => {
    reset();
  }

  const InputProps = {
    sx: {
      '& .MuiInputBase-input::placeholder': {
        color: 'white',
        opacity: 1, // Ensures the white color is fully opaque
      },
      '&::placeholder': {
        color: 'white',
        opacity: 1, // Ensures the white color is fully opaque
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: '1px',
        borderColor: '#FFF',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderWidth: '1px',
        borderColor: '#FFF',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#FFF',
        borderWidth: '1px',
      },
      '.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': {
        paddingRight: '14px',
      },
      color: 'white',
    },
  }

  const InputLabelProps = {
    sx: {
      '&.Mui-focused': {
        color: '#FFF',
      },
        color: '#FFF',
    },
  }

  return (
    <div className='flex flex-col md:flex-row gap-5 my-10 md:my-[70px] px-4 md:px-0'>
      <div className='w-full md:basis-[calc(30%-20px/2)] rounded-2xl bg-colGreen p-5 md:p-7'>
        <div className='text-white text-2xl md:text-4xl font-semibold mb-2 md:mb-3'>Хотите стать поставщиком?</div>
        <div className='text-white text-sm md:text-base mb-3'>Оставьте заявку и менеджер свяжется с вами в ближайшее время, чтобы обсудить все условия</div>
        <form onSubmit={handleSubmit(onSubmitAuthCheck)} className='flex flex-col gap-3'>
          <Controller
            name='name'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <CTextField
                label='Имя'
                type='text'
                required={true}
                onChange={field.onChange}
                value={field.value}
                InputProps={InputProps}
                InputLabelProps={InputLabelProps}
                size="small"
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            defaultValue=''
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
                required={true}
                {...field}      

                InputProps={InputProps}
                InputLabelProps={InputLabelProps}
                size="small"
              />
            )}
          />
          <Controller
            name='phone'
            control={control}
            defaultValue=''
            rules={{
              required: 'Поле обязательно к заполнению!',
              pattern: {
                value:
                  /^((\+7|7|8)[\s\-]?)?(\(?\d{3}\)?[\s\-]?)?[\d\s\-]{10}$/,
                message: 'Введите корректный номер телефона',
              },
            }}
            render={({ field }) => (
              <CPhoneField
              label='Телефон' {...field}

              InputProps={InputProps}
                InputLabelProps={InputLabelProps}
                size="small"
               />
            )} />
          <Controller
            name='comment'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <CTextField

                multiline
                minRows={3}
                label='Комментарий'
                type='text'
                onChange={field.onChange}
                value={field.value}

                InputProps={InputProps}
                InputLabelProps={InputLabelProps}
                size="small"
          
              />
            )}
          />
          <button className='bg-white rounded p-3 text-colGreen font-semibold text-sm md:text-base hover:bg-opacity-90 transition-all'>
            Оставить заявку
          </button>
        </form>
      </div>
      <div className='hidden md:block md:basis-[calc(70%-20px/2)] rounded-2xl overflow-hidden'>
        <img src={image} alt="Стать поставщиком Росток" className='w-full h-full object-cover' />
      </div>
    </div>
  )
}

export default WantToBePartnerFrom