// src/AuthModal/AuthWithEmail.tsx

import { Controller, useForm } from "react-hook-form";
import CTextField from "@helpers/CustomInputs/CTextField";
import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuthWithEmailMutation } from "@api/userEndpoints";
import { useSendCartMutation } from "@api/cartEndpoints";
import { useSendFavoritesMutation } from "@api/favoritesEndpoints";
import { useSendComparisonMutation } from "@api/comparisonEndpoints";
import { setComparison } from "@store/slices/comparisonSlice";
import { setFavorite } from "@store/slices/favoriteSlice";
import { setCart } from "@store/slices/cartSlice";
import { setToken } from "@store/slices/userSlice";
import { LoadingSmall } from "@helpers/Loader/Loader";
import { toast } from "sonner";

const AuthWithEmail = ({ hideModal, setContent, login: enteredLogin }) => {
  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

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

    const isLoading = authIsLoading || sendCartIsloading || sendComparisonIsloading || sendFavoritesIsloading

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
      sessionStorage.removeItem("cart");
      sessionStorage.removeItem("comparison");
      sessionStorage.removeItem("favorite");
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
      console.error("Error sending data to server:", error);
    }
  };

  const onSubmitAuthWithEmail = async (data) => {
    try {
      const auth = await authWithEmail(data);
      if (auth.data.success) {
        dispatch(setToken(auth.data.token));
        await sendAndClearData();
        hideModal();
        navigate("/");
        return;
      } else if (!auth.data.success) {
        setResponseError(auth.data.err);
      }
    } catch (error) {
      console.error("Authorization failed:", error);
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
              type={isShow ? "text" : "password"}
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
      {responseError && (
        <p className="text-xs mt-1">{responseError}</p>
      )}

      <button className="w-full h-10 px-6 bg-colGreen rounded mt-5 text-white font-semibold flex justify-center items-center">
        {!isLoading && <>Войти</>}
        {isLoading && <LoadingSmall extraStyle={"white"} />}
      </button>
      <p
        onClick={() => setContent("resetPassword")}
        className="text-center mt-4 text-colGray2 font-medium cursor-pointer"
      >
        Забыли пароль?
      </p>
    </form>
    // </Box>
  );
};

export default AuthWithEmail;