import { Box, Modal } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { updateOrganization } from '../../redux/slices/organizationsSlice';
import { useDispatch } from 'react-redux';
import CTextField from '../CustomInputs/CTextField';
import { YoutubeSearchedFor } from '@mui/icons-material';


function UpdateOrganizationModal({ open, close, item }) {
  
    const {
        control,
        handleSubmit,
        reset,
        register,
        watch,
        formState: { errors, isValid },
      } = useForm({
        mode: 'onChange',
        defaultValues: {
            inn: item?.inn,
            kpp: item?.kpp,
            name: item?.name,
            yurAddress: item?.yurAddress,
            faqAddress: item?.faqAddress,
            ogrn: item?.ogrn,
            rasSchet: item?.rasSchet,
            bikBanka: item?.bikBanka,
            korrSchet: item?.korrSchet,
            bankName: item?.bankName,
        }
      });

      const dispatch = useDispatch()

      const handleUpdateOrganization = (data) => {
        dispatch(updateOrganization({organization: item, data}))
        close()
      }

  return (
    <Modal open={open}
    onClose={close} 
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>

<Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none py-10 px-8 max-w-[500px] w-full'>
<span
                  onClick={close} 
                  className='absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4'
                >
                  &times;
                </span>
                <h1 className='text-3xl text-colBlack text-center pb-2 font-semibold'>
            Редактирование организации
          </h1>
          <h4 className='text-xl text-center font-semibold pb-4 text-colBlack'>
            {item?.name}
          </h4>
          <form onSubmit={handleSubmit(handleUpdateOrganization)}>
            <div className='w-full space-y-3'>
                  <div className='grid grid-cols-2 gap-3'>
                    <Controller
                      name='inn'

                      control={control}
                      rules={{
                      }}
                      render={({ field }) => (
                        <CTextField
                          {...field}
                          label='ИНН'
                        //   defaultValue={content.item.inn}
                          type='number'
                          borderColor='#222'
                          focusedBorderColor='#15765B'
                          labelColor='#15765B'
                          required={true}
                        />
                      )}
                    />
                    <Controller
                      name='kpp'


                      control={control}
                      rules={{
                      }}
                      render={({ field }) => (
                        <CTextField
                          {...field}
                          label='КПП'
                        //   defaultValue={content.item.kpp}
                          type='number'
                          borderColor='#222'
                          focusedBorderColor='#15765B'
                          labelColor='#15765B'
                          required={true}
                        />
                      )}
                    />


                  </div>
                  <Controller
                    name='name'
                    control={control}
                    rules={{
                    }}
                    render={({ field }) => (
                      <CTextField
                        {...field}
                        label='Название организации'
                        // defaultValue={content.item.name}
                        type='text'
                        required={true}
                      />
                    )}
                  />

                  <Controller
                    name='yurAddress'
                    control={control}
                    rules={{
                    }}
                    render={({ field }) => (
                      <CTextField
                        {...field}
                        label='Юридический адрес'
                        // defaultValue={content.item.yurAddress}
                        type='text'
                        required={true}
                      />
                    )}
                  />

                  <Controller
                    name='faqAddress'

                    control={control}
                    rules={{
                    }}
                    render={({ field }) => (
                      <CTextField
                        {...field}
                        label='Фактический адрес'
                        // defaultValue={content.item.faqAddress}

                        type='text'
                        required={true}
                      />
                    )}
                  />

                  <Controller
                    name='ogrn'


                    control={control}
                    rules={{
                    }}
                    render={({ field }) => (
                      <CTextField
                        {...field}
                        label='ОГРН'
                        // defaultValue={org.ogrn}
                        // onChange={(e) => {setOrg({...org, ogrn: e.target.value})}}
                        type='number'
                        required={true}
                      />
                    )}
                  />




                  <div className='grid grid-cols-2 gap-3'>

                    <Controller
                      name='rasSchet'
                      control={control}
                      rules={{
                      }}
                      render={({ field }) => (
                        <CTextField
                          {...field}
                          label='Расчётный счёт'
                        //   defaultValue={content.item.rasShet}

                          type='number'
                          borderColor='#222'
                          focusedBorderColor='#15765B'
                          labelColor='#15765B'
                          required={true}
                        />
                      )}
                    />

                    <Controller
                      name='bikBanka'
                      control={control}
                      rules={{
                      }}
                      render={({ field }) => (
                        <CTextField
                          {...field}
                          label='БИК Банка'
                        //   defaultValue={content.item.bikBanka}
                          type='number'
                          borderColor='#222'
                          focusedBorderColor='#15765B'
                          labelColor='#15765B'
                          required={true}
                        />
                      )}
                    />

                    <Controller
                      name='korrSchet'
                      control={control}
                      rules={{
                      }}
                      render={({ field }) => (
                        <CTextField
                          {...field}
                          label='Корр. счёт'
                        //   defaultValue={content.item.korrSchet}
                          type='number'
                          borderColor='#222'
                          focusedBorderColor='#15765B'
                          labelColor='#15765B'
                          required={true}
                        />
                      )}
                    />

                    <Controller
                      name='bankName'
                      control={control}
                      rules={{
                      }}
                      render={({ field }) => (
                        <CTextField
                          {...field}
                          label='Наименование банка'
                        //   defaultValue={content.item.bankName}
                          type='number'
                          borderColor='#222'
                          focusedBorderColor='#15765B'
                          labelColor='#15765B'
                          required={true}
                        />
                      )}
                    />


                
                
              </div>
            </div>
            <button
              className='w-full h-[38px] px-6 bg-colGray rounded mt-5 text-white font-semibold'
            >
              Сохранить
            </button>
          </form>
</Box>
    </Modal>
  )
}


export default UpdateOrganizationModal