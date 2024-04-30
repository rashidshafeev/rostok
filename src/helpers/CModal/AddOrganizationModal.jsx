import { Box, Modal } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { addOrganization } from '../../redux/slices/organizationsSlice';
import { useDispatch } from 'react-redux';
import CTextField from '../CustomInputs/CTextField';

function AddOrganizationModal({ open, close, organizations}) {

    const {
        control,
        handleSubmit,
        reset,
        register,
        watch,
        formState: { errors, isValid },
    } = useForm({
        // mode: 'onChange',
    });


const dispatch = useDispatch();

    const handleAddOrganization = (data) => {
        console.log(data)
        dispatch(addOrganization(data));
        setOpen(false)
      }

      const handleAddError = (errors) => {
        console.log('onAddError')
        console.log(errors)
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
                <h1 className='text-3xl text-colBlack text-center pb-5 font-semibold'>
            Добавление организации
          </h1>
          <form onSubmit={handleSubmit(handleAddOrganization, handleAddError)}>
            <div className='w-full space-y-5'>

                <Controller
                  name='name'
                  control={control}
                  rules={{
                  }}
                  render={({ field }) => (
                    <CTextField
                      {...field}
                      label='Название организации'
                      type='text'
                      required={true}
                    />
                  )}
                />

                <Controller
                  name='inn'
                  control={control}
                  rules={{
                    validate: {
                      exists: (value) => {
                        return !organizations.some( org => org.inn === value) || 'Такая организация уже существует'
                    
                      }
                    }
                  
                  }}
                  render={({ field }) => (
                    <CTextField
                      {...field}
                      label='ИНН'
                      type='number'
                      required={true}
                    />
                  )}
                />
                {errors.inn?.type === 'exists' && (
        <p className='text-red-600 text-sm ' role="alert">{errors.inn?.message}</p>
      )}


              
            </div>
            {/* <h4 className='text-xl font-semibold text-colBlack'>
              {content?.item?.name}
            </h4> */}
            <button
              disabled={!watch('name') ||!watch('inn')}
              className={` w-full h-[38px] px-6 ${ !watch('name') ||!watch('inn') ? 'bg-colGray' : 'bg-colGreen'} rounded mt-5 text-white font-semibold`}
            >
              Сохранить
            </button>
          </form>
            </Box>
        </Modal>
    )
}

export default AddOrganizationModal