import React, { useState } from 'react'
import { Box, Modal } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom';
import CTextField from '../CustomInputs/CTextField';
import CPhoneField from '../CustomInputs/CPhoneField';
import { useModal } from '@/context/ModalContext';

function FastOrderModal() {

const { hideModal, isModalVisible, modalContent} = useModal();

    const [privacyPolicy, setPrivacyPolicy] = useState(true);

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


    return (

        <Modal open={isModalVisible && modalContent.type === 'fastOrder'}
            onClose={hideModal}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'>

            <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none py-10 px-8 max-w-[500px] w-full'>
                <span
                    onClick={hideModal}
                    className='absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4'
                >
                    &times;
                </span>
                <div className=' font-semibold text-3xl mb-3'>  Быстрый заказ</div>
                <div className='mb-5'>Укажите контактные данные, менеджер свяжется в ближайшее время для уточнения деталей</div>
                <form onSubmit={handleSubmit(onSubmitAuthCheck)} className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-4'>

                        <div className=''>
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
                                    />
                                )}
                            />
                        </div>

                        <div className=''>
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
                                        required={true}
                                        label='Телефон' {...field}
                                    />
                                )} />
                        </div>
                    </div>

                    <button className=' bg-colGreen rounded p-3 text-white font-semibold'>Отправить</button>

                    <input className='hidden' type='checkbox' id='checkbox' />
                    <label
                        htmlFor='checkbox'
                        onClick={() => setPrivacyPolicy(!privacyPolicy)}
                        className='text-sm flex cursor-pointer mm:items-center w-full'
                    >
                        <div className='w-5 h-5 min-w-[20px] mr-2 flex justify-center items-center bg-colGreen rounded-sm'>
                            {privacyPolicy && (
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='12'
                                    height='9'
                                    viewBox='0 0 12 9'
                                    fill='none'
                                >
                                    <g clipPath='url(#clip0_701_1390)'>
                                        <path
                                            fillRule='evenodd'
                                            clipRule='evenodd'
                                            d='M11.8546 0.646894C11.9012 0.693339 11.9381 0.748515 11.9633 0.80926C11.9886 0.870005 12.0015 0.935127 12.0015 1.00089C12.0015 1.06666 11.9886 1.13178 11.9633 1.19253C11.9381 1.25327 11.9012 1.30845 11.8546 1.35489L4.85463 8.35489C4.80819 8.40146 4.75301 8.4384 4.69227 8.46361C4.63152 8.48881 4.5664 8.50179 4.50063 8.50179C4.43486 8.50179 4.36974 8.48881 4.309 8.46361C4.24825 8.4384 4.19308 8.40146 4.14663 8.35489L0.646631 4.85489C0.552745 4.76101 0.5 4.63367 0.5 4.50089C0.5 4.36812 0.552745 4.24078 0.646631 4.14689C0.740518 4.05301 0.867856 4.00026 1.00063 4.00026C1.13341 4.00026 1.26075 4.05301 1.35463 4.14689L4.50063 7.29389L11.1466 0.646894C11.1931 0.600331 11.2483 0.563388 11.309 0.538181C11.3697 0.512975 11.4349 0.5 11.5006 0.5C11.5664 0.5 11.6315 0.512975 11.6923 0.538181C11.753 0.563388 11.8082 0.600331 11.8546 0.646894Z'
                                            fill='white'
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id='clip0_701_1390'>
                                            <rect
                                                width='11.5015'
                                                height='8.00179'
                                                fill='white'
                                                transform='translate(0.5 0.5)'
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                            )}
                        </div>
                        <p className='text-[10px] leading-3 text-colDarkGray'>
                            Я даю согласие на обработку моих персональных данных и
                            принимаю условия
                            <NavLink
                                className='ml-1 text-colGreen'
                                tablet='_blank'
                                to='#'
                            >
                                Пользовательского соглашения и Политики обработки
                                персональных данных
                            </NavLink>
                        </p>
                    </label>
                </form>
            </Box>
        </Modal>
    )
}

export default FastOrderModal