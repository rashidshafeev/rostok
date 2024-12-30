// src/AuthModal/AuthWithEmail.tsx

import React, { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useAuthWithEmailMutation } from '@/features/auth/api/authenticationEndpoints';
import { setToken } from '@/features/auth/model/userSlice';
import { useSendCartMutation } from '@/features/cart/api/cartApi';
import { setCart } from '@/features/cart/model/cartSlice';
import { useSendComparisonMutation } from '@/features/comparison/api/comparisonApi';
import { setComparison } from '@/features/comparison/model/comparisonSlice';
import { useSendFavoritesMutation } from '@/features/favorite/api/favoritesEndpoints';
import { setFavorite } from '@/features/favorite/model/favoriteSlice';
import CTextField from '@/shared/ui/inputs/CTextField';
import { LoadingSmall } from '@/shared/ui/Loader';

export const AuthWithEmail = ({
  hideModal,
  setContent,
  login: enteredLogin,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const [isShow, setIsShow] = useState(false);
  const [responseError, setResponseError] = useState(null);

  const cart = useSelector((state) => state.cart.cart);
  const comparison = useSelector((state) => state.comparison.comparison);
  const favorite = useSelector((state) => state.favorite.favorite);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [authWithEmail, { isLoading: authIsLoading }] =
    useAuthWithEmailMutation();
  const [sendCart, { isLoading: sendCartIsloading }] = useSendCartMutation();
  const [sendFavorites, { isLoading: sendFavoritesIsloading }] =
    useSendFavoritesMutation();
  const [sendComparison, { isLoading: sendComparisonIsloading }] =
    useSendComparisonMutation();

  const isLoading =
    authIsLoading ||
    sendCartIsloading ||
    sendComparisonIsloading ||
    sendFavoritesIsloading;

  const sendAndClearData = async () => {
    try {
      await sendCart({
        items: cart.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          selected: item.selected ? 1 : 0,
        })),
      });
      await sendComparison(comparison.map((item) => item.id));
      await sendFavorites(favorite.map((item) => item.id));
      sessionStorage.removeItem('cart');
      sessionStorage.removeItem('comparison');
      sessionStorage.removeItem('favorite');
      dispatch(
        setCart({
          cart: [],
          selected: {
            amount: 0,
            count: 0,
            quantity: 0,
            discount: 0,
          },
          total: {
            amount: 0,
            count: 0,
            quantity: 0,
            discount: 0,
          },
          currency: {
            code: 'RUB',
            symbol: '₽',
            title: 'Рубль',
          },
        })
      );
      dispatch(setComparison([]));
      dispatch(setFavorite([]));
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };

  const onSubmitAuthWithEmail = async (data) => {
    try {
      const auth = await authWithEmail(data);
      if (auth.data.success) {
        dispatch(setToken(auth.data.token));
        await sendAndClearData();
        hideModal();
        navigate('/');
        return;
      } else if (!auth.data.success) {
        setResponseError(auth.data.err);
      }
    } catch (error) {
      console.error('Authorization failed:', error);
    }
  };

  return (
    // <Box>
    <form onSubmit={handleSubmit(onSubmitAuthWithEmail)}>
      <Controller
        name="login"
        control={control}
        defaultValue={enteredLogin.login}
        render={({ field }) => (
          <CTextField
            label="Эл. почта / телефон"
            type="text"
            required={true}
            {...field}
          />
        )}
      />
      <div className="flex relative mt-5">
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CTextField
              label="Пароль"
              type={isShow ? 'text' : 'password'}
              required={true}
              {...field}
            />
          )}
        />
        {isShow ? (
          <VisibilityOff
            onClick={() => setIsShow(false)}
            className="absolute top-1/2 -translate-y-1/2 right-3 opacity-60 cursor-pointer"
          />
        ) : (
          <Visibility
            onClick={() => setIsShow(true)}
            className="absolute top-1/2 -translate-y-1/2 right-3 opacity-60 cursor-pointer"
          />
        )}
      </div>
      {responseError ? <p className="text-xs mt-1">{responseError}</p> : null}

      <button className="w-full h-10 px-6 bg-colGreen rounded mt-5 text-white font-semibold flex justify-center items-center">
        {!isLoading ? <>Войти</> : null}
        {isLoading ? <LoadingSmall extraStyle="white" /> : null}
      </button>
      <p
        onClick={() => setContent('resetPassword')}
        className="text-center mt-4 text-colGray2 font-medium cursor-pointer"
      >
        Забыли пароль?
      </p>
    </form>
    // </Box>
  );
};
