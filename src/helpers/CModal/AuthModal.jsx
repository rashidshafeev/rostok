/* eslint-disable no-useless-escape */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Modal, Checkbox, FormControlLabel } from '@mui/material';
import {
  KeyboardArrowRight,
  KeyboardArrowLeft,
  Visibility,
  VisibilityOff,
  CheckCircleRounded,
  CancelRounded,
} from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import CTextField from '../CustomInputs/CTextField';
import CPhoneField from '../CustomInputs/CPhoneField';
import {
  postAuthCheck,
  postAuthWithEmail,
  postRegister,
  postSendVerificationCode,
  postConfirmVerificationCode,
} from '../../api/user';
import modalLogo from '../../assets/images/modal-logo.svg';
import { Loading, LoadingSmall } from '../Loader/Loader';
import { NavLink, useNavigate } from 'react-router-dom';
import ModalSnackbar from './ModalSnackbar';
import { useAuthWithEmailMutation } from '../../redux/api/userEndpoints';
import { setToken } from '../../redux/slices/userSlice';
import { useSendCartMutation } from '../../redux/api/cartEndpoints';
import { useSendFavoritesMutation } from '../../redux/api/favoritesEndpoints';
import { setCart } from '../../redux/slices/cartSlice';
import { setFavorite } from '../../redux/slices/favoriteSlice';
import { useSendComparisonMutation } from '../../redux/api/comparisonEndpoints';
import { setComparison } from '../../redux/slices/comparisonSlice';
const AuthModal = ({ open, setOpen, content, setContent }) => {
  const cart = useSelector((state) => state.cart.cart);
  const comparison = useSelector((state) => state.comparison.comparison);
  const favorite = useSelector((state) => state.favorite.favorite);

  const [isLoading, setIsLoading] = useState(false);
  const [miniLoading, setMiniLoading] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [openSnack2, setOpenSnack2] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isShowTwo, setIsShowTwo] = useState(false);
  const [resError, setResError] = useState(null);
  const [isCode, setIsCode] = useState({ verification: null, sendCode: null });


  const [authWithEmail, authWithEmailResult] = useAuthWithEmailMutation();
  const [sendCart, sendCartResult]  = useSendCartMutation();
  const [sendFavorites, sendFavoritesResult]  = useSendFavoritesMutation();
  const [sendComparison, sendComparisonResult]  = useSendComparisonMutation();

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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = watch('password');
  const phone = watch('phone');

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

  const handleSendVerificationCode = async () => {
    setMiniLoading(true);
    const { data } = await postSendVerificationCode(phone);
    if (data?.success === 'ok') {
      setIsCode({ ...isCode, sendCode: data });
      setOpenSnack(true);
      setMiniLoading(false);
    } else {
      setIsCode({ ...isCode, sendCode: data });
      setOpenSnack(true);
      setMiniLoading(false);
    }
  };

  const handleConfirmVerificationCode = async (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue) && inputValue.length === 4) {
      setMiniLoading(true);
      const { data } = await postConfirmVerificationCode(inputValue, phone);
      if (data?.success) {
        setIsCode({ ...isCode, verification: data });
        setMiniLoading(false);
      } else {
        setOpenSnack2(true);
        setIsCode({ ...isCode, verification: data });
        setMiniLoading(false);
      }
    }
  };

  const sendAndClearData = async () => {
    try {
      // Send cart
      await sendCart({ items: cart.map(item => ({ id: item.id, quantity: item.quantity }))});
      console.log('Success sending data to server:', send);

      // Send comparison
      await sendComparison(comparison.map(item => item.id));

      // Send favorites
      await sendFavorites(favorite.map(item => item.id));

      // Clear local storage
      sessionStorage.removeItem('cart');
      sessionStorage.removeItem('comparison');
      sessionStorage.removeItem('favorite');

      // Clear Redux store
      dispatch(setCart({ cart: [], selected: [], itemsQuantity: 0, selectedQuantity: 0 }));
      dispatch(setComparison([]));
      dispatch(setFavorite([]));
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };

  const onSubmitAuthWithEmail = async (data) => {
    try {
      const auth = await authWithEmail(data);
      dispatch(setToken(auth.data.token));
  
      await sendAndClearData();
    } catch (error) {
      console.error('Authorization failed:', error);
    }


  };

  const onSubmitRegister = async (data) => {
    const favoriteItems = favorite?.map((el) => el?.id);
    setIsLoading(true);
    const { success, resData } = await postRegister(
      dispatch,
      data,
      favoriteItems
    );
    if (success) {
      setIsLoading(false);
      setIsCode({ verification: null, sendCode: null });
      setResError(null);
      setOpen(false);
      navigate(window.innerWidth < 576 ? '/profile' : '/profile/personal-data');
      reset();
    } else {
      setResError(resData?.err);
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        {content === 'checkAuth' ? (
          <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none pt-10 pb-4 px-4 mm:py-10 mm:px-8 max-w-[500px] w-[95%] mm:w-full'>
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
                <h1 className='text-2xl mm:text-3xl text-colBlack text-center pt-2 pb-8 font-semibold'>
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
        ) : content === 'authWithEmail' ? (
          <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none pt-10 pb-4 px-4 mm:py-10 mm:px-8 max-w-[500px] w-[95%] mm:w-full'>
            {isLoading ? (
              <Loading extraStyle='296px' />
            ) : (
              <>
                <span
                  onClick={() => {
                    setContent('checkAuth');
                    setResError(null);
                    reset();
                  }}
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
                    {resError && (
                      <p className='text-red-500 text-sm font-medium pt-1'>
                        {resError}
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
        ) : (
          content === 'register' && (
            <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none px-4 mm:px-8 pt-10 pb-4 mm:pb-5 max-w-[500px] w-[95%] mm:w-full overflow-y-scroll scrollable h-[95%] xs:h-auto'>
              {isLoading ? (
                <Loading extraStyle='528px' />
              ) : (
                <>
                  <span
                    onClick={() => {
                      setContent('checkAuth');
                      setResError(null);
                      reset();
                    }}
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
                  <form onSubmit={handleSubmit(onSubmitRegister)}>
                    <div className='w-full space-y-5'>
                      <div>
                        <Controller
                          name='name'
                          control={control}
                          defaultValue=''
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
                      <div>
                        <div
                          className={`flex items-center ${
                            isCode?.verification?.success ? '' : 'space-x-2'
                          }`}
                        >
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
                              <CPhoneField label='Телефон' {...field} />
                            )}
                          />
                          {isCode?.sendCode?.success === 'ok' ? (
                            <div className='relative'>
                              <input
                                type='text'
                                placeholder='Код из смс'
                                onChange={handleConfirmVerificationCode}
                                maxLength={4}
                                className={`${
                                  isCode?.verification?.success ? 'hidden' : ''
                                } min-w-[140px] h-10 px-4 rounded border outline-none border-colBlack lining-nums proportional-nums font-medium text-sm`}
                              />
                              {miniLoading ? (
                                <div className='absolute top-1/2 right-2 -translate-y-1/2 w-7 h-7 flex justify-center items-center'>
                                  <LoadingSmall extraStyle='#15765B' />
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
                              className={`min-w-[140px] h-10 px-4 rounded text-white font-semibold flex justify-center items-center ${
                                !errors.phone
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
                        {errors?.phone && (
                          <p className='text-red-500 mt-1 text-xs font-medium'>
                            {errors?.phone?.message || 'Error!'}
                          </p>
                        )}
                      </div>
                      <div>
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
                              {...field}
                            />
                          )}
                        />
                        {errors?.email && (
                          <p className='text-red-500 mt-1 text-xs font-medium'>
                            {errors?.email.message || 'Error!'}
                          </p>
                        )}
                      </div>
                      <div>
                        <div className='flex relative mt-5'>
                          <Controller
                            name='password'
                            control={control}
                            defaultValue=''
                            rules={{
                              validate: (value) => {
                                if (!/^(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
                                  return 'Требуется хотя бы одна строчная и прописная буква!';
                                }
                                if (!/(?=.*\d)/.test(value)) {
                                  return 'Требуется хотя бы одна цифра!';
                                }
                                if (!/(?=.*[@$!%*?&#])/.test(value)) {
                                  return 'Требуется хотя бы один специальный символ!';
                                }
                                if (value.length < 8) {
                                  return 'Минимальная длина пароля - 8 символов!';
                                }
                                return true;
                              },
                            }}
                            render={({ field }) => (
                              <CTextField
                                label='Пароль'
                                type={`${isShow ? 'text' : 'password'}`}
                                icon='true'
                                {...field}
                              />
                            )}
                          />
                          {isShow ? (
                            <VisibilityOff
                              onClick={() => setIsShow(false)}
                              className='absolute top-5 -translate-y-1/2 right-3 opacity-60 cursor-pointer'
                            />
                          ) : (
                            <Visibility
                              onClick={() => setIsShow(true)}
                              className='absolute top-5 -translate-y-1/2 right-3 opacity-60 cursor-pointer'
                            />
                          )}
                        </div>
                        {errors?.password && (
                          <p className='text-red-500 mt-1 text-xs font-medium'>
                            {errors?.password.message || 'Error!'}
                          </p>
                        )}
                      </div>
                      <div>
                        <div className='flex relative mt-5'>
                          <Controller
                            name='confirmPassword'
                            control={control}
                            defaultValue=''
                            rules={{
                              validate: (value) => {
                                if (value !== password) {
                                  return 'Пароли не совпадают!';
                                }
                                return true;
                              },
                            }}
                            render={({ field }) => (
                              <CTextField
                                label='Подтвердите пароль'
                                type={`${isShowTwo ? 'text' : 'password'}`}
                                icon='true'
                                {...field}
                              />
                            )}
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
                        {errors?.confirmPassword && (
                          <p className='text-red-500 mt-1 text-xs font-medium'>
                            {errors?.confirmPassword.message || 'Error!'}
                          </p>
                        )}
                      </div>
                    </div>
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register('legalRepresentative')}
                          sx={{
                            color: '#15765B',
                            '&.Mui-checked': {
                              color: '#15765B',
                            },
                          }}
                        />
                      }
                      label={
                        <span className='text-sm font-medium text-colBlack'>
                          Я представитель юридического лица или ИП
                        </span>
                      }
                    />
                    {resError && (
                      <p className='text-red-500 mt-1 text-sm font-medium'>
                        {resError}
                      </p>
                    )}
                    <button
                      disabled={!isValid}
                      className={`${
                        isValid ? 'bg-colGreen' : 'bg-colGray'
                      } w-full h-10 px-6 rounded my-2 text-white font-semibold`}
                    >
                      Зарегистрироваться
                    </button>
                    <FormControlLabel
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                      }}
                      control={
                        <Checkbox
                          {...register('privacyPolicy')}
                          defaultChecked
                          required
                          sx={{
                            color: '#15765B',
                            padding: '0 9px',
                            '&.Mui-checked': {
                              color: '#15765B',
                            },
                          }}
                        />
                      }
                      label={
                        <p className='text-xs leading-[14px] text-colDarkGray'>
                          Я даю согласие на обработку моих персональных данных и
                          принимаю условия{' '}
                          <NavLink className='text-colGreen' to='#'>
                            Пользовательского соглашения
                          </NavLink>{' '}
                          и{' '}
                          <NavLink className='text-colGreen' to='#'>
                            Политики обработки персональных данных
                          </NavLink>
                        </p>
                      }
                    />
                  </form>
                </>
              )}
            </Box>
          )
        )}
      </Modal>
      <ModalSnackbar
        message={
          isCode?.sendCode?.success
            ? isCode?.sendCode?.data?.text
            : isCode?.sendCode?.err
        }
        open={openSnack}
        onClose={() => setOpenSnack(false)}
      />
      <ModalSnackbar
        message={!isCode?.verification?.success && isCode?.verification?.err}
        open={openSnack2}
        onClose={() => setOpenSnack2(false)}
      />
    </>
  );
};

export default AuthModal;
