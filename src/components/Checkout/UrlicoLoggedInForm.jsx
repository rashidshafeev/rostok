import { FormControl, InputLabel, ListSubheader, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import CPhoneField from '@/shared/ui/inputs/CPhoneField'
import { CancelRounded, CheckCircleRounded } from '@mui/icons-material'
import { Controller, useFormContext } from 'react-hook-form'
import { LoadingSmall } from '@/shared/ui/Loader'

import fizlico from '@/shared/assets/icons/fizlico-inactive.svg';
import urlico from '@/shared/assets/icons/urlico-inactive.svg';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CSelectField from '@/shared/ui/inputs/CSelectField'

import AddOrganizationModal from '@helpers/CModal/AddOrganizationModal'
import CTextField from '@/shared/ui/inputs/CTextField'


function UrlicoLoggedInForm({ user, organizations, isCode, handleSendVerificationCode, handleConfirmVerificationCode, miniLoading }) {

  const [openAddOrgModal, setOpenAddOrgModal] = useState(faZlse);

  const handleOpenAddOrgModal = () => {
    setOpenAddOrgModal(true);
  
  }

  const handleCloseAddOrgModal = () => {
    setOpenAddOrgModal(false);
  
  }


  



  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    formState: { errors, isValid },
  } = useFormContext()

  return (
    <>
    <div className='flex flex-wrap gap-3'>
      <FormControl className='md:w-[340px] w-full' variant='outlined' size='small' >
        <InputLabel
          sx={{
            '&.Mui-focused': {
              color: '#15765B',
            },
          }}>Покупатель</InputLabel>
        <Controller
          name='name'
          control={control}
          defaultValue=""
          rules={{
            required: 'Поле обязательно к заполнению!',
          }}
          render={({ field }) => (
            <Select {...field}
            className='md:w-[340px] w-full'

              label='Покупатель'
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderWidth: '1px',
                  borderColor: '#B5B5B5',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderWidth: '1px',
                  borderColor: '#B5B5B5',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#15765B',
                  borderWidth: '1px',
                },
                '&.Mui-focused': {
                  color: '#15765B',
                },
                paddingRight: 0,
              }}>
              <MenuItem value={'user'}>
                <div className='flex items-center'>
                  <img src={fizlico} className='h-4 w-4 mr-1' alt="" srcset="" />
                  <div>{user?.user?.name}<span className='text-xs text-colDarkGray'> (физ лицо)</span></div>
                </div>
              </MenuItem>
              {organizations.length !== 0 && <ListSubheader>Мои организации</ListSubheader>}
              {
                organizations?.map(org => (
                  <MenuItem value={org.inn}>
                    <div className='flex items-center'>
                      <img src={urlico} className='h-4 w-4 mr-1' alt="" srcset="" />
                      <div>{org.name}</div>
                    </div></MenuItem>
                ))
              }
            </Select>
          )}
        />
      </FormControl>
        <button onClick={handleOpenAddOrgModal} className='flex items-center text-colGray cursor-pointer'>
          <AddRoundedIcon/>
          <div className=' font-semibold'>Добавить новую организацию</div>
          </button>
          <AddOrganizationModal open={openAddOrgModal} close={handleCloseAddOrgModal} organizations={organizations}/>


      
    </div>

    <div className='flex flex-wrap gap-3'>
    <div className='md:w-[340px] w-full'>
    <Controller
                  name='inn'
                  control={control}
                  rules={{
                    validate: {
                      // exists: (value) => {
                      //   return !organizations.some( org => org.inn === value) || 'Такая организация уже существует'
                    
                      // }
                    }
                  
                  }}
                  render={({ field }) => (
                    <CTextField
                      {...field}
                      label='ИНН'
                      type='number'
                    />
                  )}
                />
                {errors.inn?.type === 'exists' && (
        <p className='text-red-600 text-sm ' role="alert">{errors.inn?.message}</p>
      )}
      </div>  
    <div className='md:w-[340px] w-full'>


        <Controller
        
          name='phone'
          control={control}
          defaultValue={user ? user?.user?.phone : ''}

          rules={{
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
            <CPhoneField   disabled={isCode?.verification?.success || user?.user?.phone} success={isCode?.verification?.success || user?.user?.phone} fail={!(isCode?.verification === null) && !(isCode?.verification?.success || user?.user?.phone)} loading={miniLoading}  label='Телефон' {...field} />
          )}
        />
        {errors?.phone && (
          <p className='text-red-500 mt-1 text-xs font-medium'>
            {errors?.phone?.message || 'Error!'}
          </p>
        )}
      </div>
      {isCode?.sendCode?.success === 'ok' || user?.user?.phone ? (
        <div className={`${isCode?.verification?.success || user?.user?.phone ? 'hidden' : 'relative'} `}>
          <input
            type='text'
            placeholder='Код из смс'
            onChange={handleConfirmVerificationCode}
            maxLength={4}
            className={` min-w-[140px] h-10 px-4 rounded border outline-none border-colBlack lining-nums proportional-nums font-medium text-sm`}
          />
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
    <div className='flex flex-wrap gap-3'>
    <div className='md:w-[340px] w-full'>
        <Controller
          name='contact'
          control={control}
          rules={{
            validate: {
              exists: (value) => {
                return !organizations.some(org => org.inn === value) || 'Такая организация уже существует'

              }
            }

          }}
          render={({ field }) => (
            <CTextField
              {...field}
              label='ФИО контактного лица'
              type='text'
              required={true}
            />
          )}
        />
        {errors.contact?.type === 'exists' && (
          <p className='text-red-600 text-sm ' role="alert">{errors.contact?.message}</p>
        )}

        


      </div>  

     
      <div className='md:w-[340px] w-full'>

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







    </>
  )
}

export default UrlicoLoggedInForm