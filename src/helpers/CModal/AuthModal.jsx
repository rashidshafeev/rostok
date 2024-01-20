import { useDispatch } from 'react-redux';
import { Box, Modal } from '@mui/material';
import {
  KeyboardArrowRight,
  KeyboardArrowLeft,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import CTextField from '../CustomInputs/CTextField';
import CPhoneField from '../CustomInputs/CPhoneField';
import { postAuthCheck, postAuthWithEmail } from '../../api/user';
import modalLogo from '../../assets/images/modal-logo.svg';
import { useState } from 'react';
import { Loading } from '../Loader/Loader';

const AuthModal = ({ open, setOpen, content, setContent }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isShowTwo, setIsShowTwo] = useState(false);
  const [errors, setErrors] = useState(null);
  const { control, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmitAuthCheck = async (data) => {
    setIsLoading(true);
    const { success, loginType } = await postAuthCheck(dispatch, data);
    if (success) {
      if (loginType === 'email' || loginType === 'phone') {
        setContent('authWithEmail');
      }
      setIsLoading(false);
    } else {
      setContent('register');
      setIsLoading(false);
    }
  };

  const onSubmitAuthWithEmail = async (data) => {
    setIsLoading(true);
    const { success, resData } = await postAuthWithEmail(dispatch, data);
    if (success) {
      setIsLoading(false);
      setOpen(false);
      setErrors(null);
      reset();
    } else {
      setErrors(resData);
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      {content === 'checkAuth' ? (
        <>
          <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none py-10 px-8 max-w-[500px] w-full'>
            {isLoading ? (
              <Loading extraStyle='237px' />
            ) : (
              <>
                <span
                  onClick={() => setOpen(false)}
                  className='absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4'
                >
                  &times;
                </span>
                <img
                  className='w-[116px] mb-4 mx-auto'
                  src={modalLogo}
                  alt='*'
                />
                <h1 className='text-3xl text-colBlack text-center pt-2 pb-8 font-semibold'>
                  Вход или Регистрация
                </h1>
                <form onSubmit={handleSubmit(onSubmitAuthCheck)}>
                  <div className='w-full space-y-5'>
                    <Controller
                      name='login'
                      control={control}
                      defaultValue=''
                      render={({ field }) => (
                        <CTextField
                          label='Эл. почта / телефон'
                          type='text'
                          required={true}
                          onChange={field.onChange}
                          value={field.value}
                        />
                      )}
                    />
                  </div>
                  <button className='w-full h-10 px-6 bg-colGreen rounded mt-5 text-white font-semibold'>
                    Продолжить
                    <KeyboardArrowRight className='!w-5' />
                  </button>
                </form>
              </>
            )}
          </Box>
        </>
      ) : content === 'authWithEmail' ? (
        <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none py-10 px-8 max-w-[500px] w-full'>
          {isLoading ? (
            <Loading extraStyle='296px' />
          ) : (
            <>
              <span
                onClick={() => setContent('checkAuth')}
                className='absolute top-3 left-3 text-sm text-colBlack cursor-pointer pr-4 flex items-center'
              >
                <KeyboardArrowLeft className='!w-5 text-colBlack' />
                Назад
              </span>
              <span
                onClick={() => setOpen(false)}
                className='absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4'
              >
                &times;
              </span>
              <h1 className='text-3xl text-colBlack text-center pt-2 pb-2 font-semibold'>
                Войдите с паролем
              </h1>
              <p className='pb-5 text-center text-colBlack'>
                Для входа на сайт введите пароль:
              </p>
              <form onSubmit={handleSubmit(onSubmitAuthWithEmail)}>
                <div className='w-full'>
                  <Controller
                    name='login'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <CTextField
                        label='Эл. почта / телефон'
                        type='text'
                        required={true}
                        {...field}
                      />
                    )}
                  />
                  {errors?.err_code === 'user_login__invalid_phone_number' && (
                    <p className='text-red-500 text-sm font-medium pt-1'>
                      {errors?.err}
                    </p>
                  )}
                  {errors?.err_code === 'user_login__invalid_email_address' && (
                    <p className='text-red-500 text-sm font-medium pt-1'>
                      {errors?.err}
                    </p>
                  )}
                  <div className='flex relative mt-5'>
                    <Controller
                      name='password'
                      control={control}
                      defaultValue=''
                      render={({ field }) => (
                        <CTextField
                          label='Пароль'
                          type={`${isShow ? 'text' : 'password'}`}
                          required={true}
                          icon='true'
                          {...field}
                        />
                      )}
                    />
                    {isShow ? (
                      <VisibilityOff
                        onClick={() => setIsShow(false)}
                        className='absolute top-1/2 -translate-y-1/2 right-3 opacity-60 cursor-pointer'
                      />
                    ) : (
                      <Visibility
                        onClick={() => setIsShow(true)}
                        className='absolute top-1/2 -translate-y-1/2 right-3 opacity-60 cursor-pointer'
                      />
                    )}
                  </div>
                  {errors?.err_code === 'user_password__incorrect' && (
                    <p className='text-red-500 text-sm font-medium pt-1'>
                      {errors?.err}
                    </p>
                  )}
                </div>
                <button className='w-full h-10 px-6 bg-colGreen rounded mt-5 text-white font-semibold'>
                  Войти
                </button>
                <p className='text-center mt-4 text-colGray font-medium cursor-pointer'>
                  Забыли пароль?
                </p>
              </form>
            </>
          )}
        </Box>
      ) : content === 'register' ? (
        <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none px-8 py-10 max-w-[500px] w-full'>
          <span
            onClick={() => setContent('checkAuth')}
            className='absolute top-3 left-3 text-sm text-colBlack font-semibold cursor-pointer pr-4'
          >
            <KeyboardArrowLeft className='!w-4 pb-[2px]' />
            Назад
          </span>
          <span
            onClick={() => setOpen(false)}
            className='absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4'
          >
            &times;
          </span>
          <h1 className='text-3xl text-colBlack text-center py-5 font-semibold'>
            Регистрация
          </h1>
          <form>
            <div className='w-full space-y-5'>
              <CTextField label='Имя' name='name' type='text' required={true} />
              <div className='flex items-center space-x-2'>
                <CPhoneField
                  className='!w-3/5'
                  label='Телефон'
                  name='phone'
                  required={true}
                />
                <span className='pointer-events-none w-2/5 h-10 px-6 bg-colGray rounded text-white cursor-pointer font-semibold flex justify-center items-center'>
                  Получить код
                </span>
              </div>
              <CTextField
                label='Электронная почта'
                name='email'
                type='email'
                required={true}
              />
              <div className='flex relative mt-5'>
                <CTextField
                  label='Пароль'
                  name='password'
                  type={`${isShow ? 'text' : 'password'}`}
                  required={true}
                  icon='true'
                />
                {isShow ? (
                  <VisibilityOff
                    onClick={() => setIsShow(false)}
                    className='absolute top-1/2 -translate-y-1/2 right-3 opacity-60 cursor-pointer'
                  />
                ) : (
                  <Visibility
                    onClick={() => setIsShow(true)}
                    className='absolute top-1/2 -translate-y-1/2 right-3 opacity-60 cursor-pointer'
                  />
                )}
              </div>
              <div className='flex relative mt-5'>
                <CTextField
                  label='Подтвердите пароль'
                  name='confirmPassword'
                  type={`${isShowTwo ? 'text' : 'password'}`}
                  required={true}
                  icon='true'
                />
                {isShowTwo ? (
                  <VisibilityOff
                    onClick={() => setIsShowTwo(false)}
                    className='absolute top-1/2 -translate-y-1/2 right-3 opacity-60 cursor-pointer'
                  />
                ) : (
                  <Visibility
                    onClick={() => setIsShowTwo(true)}
                    className='absolute top-1/2 -translate-y-1/2 right-3 opacity-60 cursor-pointer'
                  />
                )}
              </div>
            </div>
            <h4 className='text-xl font-semibold text-colBlack'>
              {content?.item?.name}
            </h4>
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
              className='w-full h-10 px-6 bg-colGreen rounded mt-5 text-white font-semibold'
            >
              Зарегистрироваться
              <KeyboardArrowRight className='!w-5' />
            </button>
          </form>
        </Box>
      ) : (
        ''
      )}
    </Modal>
  );
};

export default AuthModal;

/*
<Controller
  name='phone'
  control={control}
  defaultValue=''
  render={({ field }) => (
    <CPhoneField label='Телефон' required={true} {...field} />
  )}
/>
*/
