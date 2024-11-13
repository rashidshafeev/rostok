import { Box, Modal } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import RatingStars from '../RatingStars';
import { NavLink } from 'react-router-dom';
import CTextField from '../CustomInputs/CTextField';
import { useSelector } from 'react-redux';
import { useSubmitReviewMutation } from '../../redux/api/reviewEndpoints';

function ReviewModal({ product, open, handleClose }) {
  const [rating, setRating] = useState(5);

  const { user } = useSelector((state) => state.user);

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


    // Use mutation for form submission
    const [submitReview, { isLoading, isError, error }] = useSubmitReviewMutation()

    const onSubmit = async (data) => {
      // Prepare data to send
      const reviewData = {
        id: product.id,
        rating: rating,
        text: data.text,
        advantages: data.advantages,
        disadvantages: data.disadvantages,
      };
  
      // Submit data
      try {
        await submitReview(reviewData).unwrap();
        reset();
        handleClose();
      } catch (err) {
        console.error('Error submitting review:', err);
      }
    };

    // id (text): Идентификатор продукта.
    // text (text): Текст отзыва.
    // advantages (text): Преимущества продукта.
    // disadvantages (text): Недостатки продукта.
    // rating (number): Оценка продукта.


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
        <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
          <div className=' font-semibold text-3xl'>Ваш отзыв о товаре</div>


          <div className='flex p-2'>
            <div className='w-20 h-20 rounded mr-5'>


              <NavLink
                to={`/catalog/'${product.category.slug}'/${product.slug}`}
                className='cursor-pointer min-w-[56px] w-14 h-14 overflow-hidden bg-gray-100 rounded-md'>
                <img
                  className='w-full h-full object-contain'
                  src={product?.files[0]?.large || noImg}
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src = noImg;
                  }}
                  alt='*'
                />
              </NavLink>


            </div>
            <div className='flex flex-col gap-2 '>
              <div className='text-sm font-medium'>{`${product.groupName} ${product.name}`}</div>
              <div className='text-xs font-medium text-colDarkGray flex items-center space-x-1'>{product.sku}</div>

              <div className='flex gap-x-2 flex-wrap'>
                {product.attributes && product?.attributes?.map((attribute, index) => (
                  <p key={index} className='text-xs font-medium text-colDarkGray flex items-center space-x-1'>
                    <span >{attribute?.name}:</span>
                    <span className='font-semibold' >{attribute.color ? (<div style={{ backgroundColor: `${attribute.color}` }} className={`w-3 h-3 rounded-full border`}></div>) : (attribute.text)}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className='flex items-center gap-3 '>
            <div className=' font-semibold text-lg'>Общая оценка</div>
            <div className='flex'><RatingStars totalStars={5} initialRating={rating} isActive={true} handleSetRating={setRating} /></div>
          </div>

          <div>
            <div className=' font-semibold text-lg mb-3'>Мнение о товаре</div>
            <Controller
              name='text'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <CTextField

                  multiline
                  minRows={2}
                  label='Напишите ваше мнение'
                  type='text'
                  onChange={field.onChange}
                  value={field.value}


                />
              )}
            />
          </div>
          <div>
            <div className=' font-semibold text-lg mb-3'>Плюсы</div>
            <Controller
              name='advantages'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <CTextField

                  multiline
                  minRows={2}
                  label='Напишите ваше мнение'
                  type='text'
                  onChange={field.onChange}
                  value={field.value}


                />
              )}
            />
          </div>
          <div>
            <div className=' font-semibold text-lg mb-3'>Минусы</div>
            <Controller
              name='disadvantages'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <CTextField

                  multiline
                  minRows={2}
                  label='Напишите ваше мнение'
                  type='text'
                  onChange={field.onChange}
                  value={field.value}


                />
              )}
            />
          </div>
          {/* <div>
            <div className=' font-semibold text-lg mb-3'>Вы оставляете отзыв, как</div>
            <div className='flex gap-2'>
              <Controller
                name='name'
                control={control}
                defaultValue={user ? user?.user?.name : ''}
                rules={{
                  required: 'Поле обязательно к заполнению!',
                }}
                render={({ field }) => (


                  <CTextField
                    required={true}

                    label='Имя'
                    type='text'
                    {...field} />
                )}
              />
              {errors?.name && (
                <p className='text-red-500 mt-1 text-xs font-medium'>
                  {errors?.name?.message || 'Error!'}
                </p>
              )}
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
                    required={true}
                    {...field}
                  />
                )}
              />
            </div>
            <div className='text-xs mt-1 text-colDarkGray'>Заполните, чтобы получать ответы на ваш отзыв. Ваша электронная почта не будет видна другим пользователям</div>

          </div> */}
          <button className='py-3 flex justify-center text-white font-semibold bg-colGreen w-full rounded cursor-pointer'
          >Отправить отзыв</button>
        </form>
      </Box>
    </Modal>
  )
}

export default ReviewModal