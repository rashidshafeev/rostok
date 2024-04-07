import { Box, Modal } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

function ReviewModal({open, handleClose}) {



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

  return (
    <Modal open={open}
    onClose={handleClose} 
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>

<Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none py-10 px-8 max-w-[500px] w-full'>
<span
                  onClick={handleClose}
                  className='absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4'
                >
                  &times;
                </span>
</Box>
    </Modal>
  )
}

export default ReviewModal