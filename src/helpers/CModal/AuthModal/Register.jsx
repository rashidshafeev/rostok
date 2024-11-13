// src/AuthModal/Register.tsx

import { Controller, FormProvider, useForm } from "react-hook-form";
import CTextField from "../../CustomInputs/CTextField";
import { Checkbox, FormControlLabel } from "@mui/material"; 
import { useSendCartMutation } from "../../../redux/api/cartEndpoints";
import { useSendFavoritesMutation } from "../../../redux/api/favoritesEndpoints";
import { useSendComparisonMutation } from "../../../redux/api/comparisonEndpoints";
import { setComparison } from "../../../redux/slices/comparisonSlice";
import { setFavorite } from "../../../redux/slices/favoriteSlice";
import { setCart } from "../../../redux/slices/cartSlice";
import { setToken } from "../../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserRegisterMutation } from "../../../redux/api/userEndpoints";
import { useEffect, useState } from "react";
import PhoneVerificationField from "../../PhoneVerificationField/PhoneVerificationField";
import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { LoadingSmall } from "../../Loader/Loader";
import { toast } from "sonner";

const Register = ({ hideModal, login: enteredLogin }) => {
  const methods = useForm({ mode: "onSubmit" });
  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    trigger,
    formState: { errors, isValid },
  } = methods;
  const password = watch("password");
  const [resError, setResError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const cart = useSelector((state) => state.cart.cart);
  const comparison = useSelector((state) => state.comparison.comparison);
  const favorite = useSelector((state) => state.favorite.favorite);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userRegister, { isLoading: registerIsLoading }] =
    useUserRegisterMutation();
  const [sendCart, { isLoading: sendCartIsloading }] = useSendCartMutation();
  const [sendFavorites, { isLoading: sendFavoritesIsloading }] =
    useSendFavoritesMutation();
  const [sendComparison, { isLoading: sendComparisonIsloading }] =
    useSendComparisonMutation();

  const isLoading =
    registerIsLoading ||
    sendCartIsloading ||
    sendComparisonIsloading ||
    sendFavoritesIsloading;

    useEffect(() => {
      if (enteredLogin) {
        reset({
          email: enteredLogin.type === "email" ? enteredLogin.login : '',
          phone: enteredLogin.type === "phone" ? enteredLogin.login.slice(-10) : ''
        });
      }
    }, [enteredLogin, reset]);

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
          selected: [],
          itemsQuantity: 0,
          selectedQuantity: 0,
        })
      );
      dispatch(setComparison([]));
      dispatch(setFavorite([]));
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  };

  const onSubmitRegister = async (data) => {
    const sendData = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      password: data.password,
      // privacyPolicy: data.privacyPolicy,
      // legalRepresentative: data.legalRepresentative,
    };

    try {
      const auth = await userRegister(sendData);
      if (auth?.data?.success) {
        dispatch(setToken(auth?.data?.token));
        await sendAndClearData();
        hideModal();
        navigate("/profile/orders");
        toast(`Регистрация прошла успешно`)

        return;
      } else if (!auth?.data?.success) {
        toast(`Не удалось зарегистрироваться. ${auth?.data?.err}`);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }

    hideModal();
        navigate("/");
        return;
  };

  return (
    <>
      <h1 className="text-3xl text-colBlack text-center py-5 font-semibold">
        Регистрация
      </h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitRegister)}>
          <div className="w-full space-y-5">
            <div>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: "Поле обязательно к заполнению!",
                }}
                render={({ field }) => (
                  <CTextField label="Имя" type="text" {...field} />
                )}
              />
              {errors?.name && (
                <p className="text-red-500 mt-1 text-xs font-medium">
                  {errors?.name?.message || "Error!"}
                </p>
              )}
            </div>
            <div>
              <PhoneVerificationField defaultValue={enteredLogin?.login.slice(-10)}/>
            </div>
            {/* <div>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                required
                rules={{
                  required: "Поле обязательно к заполнению!",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Введите корректный адрес электронной почты",
                  },
                }}
                render={({ field }) => (
                  <CTextField
                    label="Электронная почта"
                    type="email"
                    {...field}
                    // onChange={(e) => {
                    //   field.onChange(e);
                    //   trigger("email"); // trigger validation
                    // }}
                  />
                )}
              />
              {errors?.email && (
                <p className="text-red-500 mt-1 text-xs font-medium">
                  {errors?.email?.message || "Error!"}
                </p>
              )}
            </div> */}
            <div>
              <div className="flex relative mt-5">
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  // rules={{
                  //   validate: (value) => {
                  //     if (!/^(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
                  //       return "Требуется хотя бы одна строчная и прописная буква!";
                  //     }
                  //     if (!/(?=.*\d)/.test(value)) {
                  //       return "Требуется хотя бы одна цифра!";
                  //     }
                  //     if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(value)) {
                  //       return "Требуется хотя бы один специальный символ!";
                  //     }
                  //     if (value.length < 8) {
                  //       return "Минимальная длина пароля - 8 символов!";
                  //     }
                  //     return true;
                  //   },
                  // }}
                  render={({ field }) => (
                    <CTextField
                      label="Пароль"
                      type={`${showPassword ? "text" : "password"}`}
                      {...field}
                    />
                  )}
                />
                {showPassword ? (
                  <VisibilityOff
                    onClick={() => setShowPassword(false)}
                    className="absolute top-5 -translate-y-1/2 right-3 opacity-60 cursor-pointer"
                  />
                ) : (
                  <Visibility
                    onClick={() => setShowPassword(true)}
                    className="absolute top-5 -translate-y-1/2 right-3 opacity-60 cursor-pointer"
                  />
                )}
              </div>
              {errors?.password && (
                <p className="text-red-500 mt-1 text-xs font-medium">
                  {errors?.password.message || "Error!"}
                </p>
              )}
            </div>
            <div>
              <div className="flex relative mt-5">
                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue=""
                  rules={{
                    validate: (value) => {
                      if (value !== password) {
                        return "Пароли не совпадают!";
                      }
                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <CTextField
                      label="Подтвердите пароль"
                      type={`${showPasswordConfirm ? "text" : "password"}`}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        trigger("confirmPassword"); // trigger validation
                      }}
                    />
                  )}
                />
                {showPasswordConfirm ? (
                  <VisibilityOff
                    onClick={() => setShowPasswordConfirm(false)}
                    className="absolute top-1/2 -translate-y-1/2 right-3 opacity-60 cursor-pointer"
                  />
                ) : (
                  <Visibility
                    onClick={() => setShowPasswordConfirm(true)}
                    className="absolute top-1/2 -translate-y-1/2 right-3 opacity-60 cursor-pointer"
                  />
                )}
              </div>
              {errors?.confirmPassword && (
                <p className="text-red-500 mt-1 text-xs font-medium">
                  {errors?.confirmPassword?.message || "Error!"}
                </p>
              )}
            </div>
          </div>
          <FormControlLabel
            control={
              <Checkbox
                {...register("legalRepresentative")}
                sx={{
                  color: "#15765B",
                  "&.Mui-checked": {
                    color: "#15765B",
                  },
                }}
              />
            }
            label={
              <span className="text-sm font-medium text-colBlack">
                Я представитель юридического лица или ИП
              </span>
            }
          />
          {resError && (
            <p className="text-red-500 mt-1 text-sm font-medium">{resError}</p>
          )}
          <button
          type="submit"
            disabled={!isValid}
            className={`${
              isValid ? "bg-colGreen" : "bg-colGray"
            } w-full h-10 px-6 rounded my-2 text-white font-semibold flex justify-center items-center`}
          >
            {!registerIsLoading && <>Зарегистрироваться</>}
            {registerIsLoading && <LoadingSmall extraStyle={"white"} />}
          </button>
          <FormControlLabel
            sx={{
              display: "flex",
              alignItems: "flex-start",
            }}
            control={
              <Checkbox
                {...register("privacyPolicy")}
                defaultChecked
                required
                
                sx={{
                  color: "#15765B",
                  padding: "0 9px",
                  "&.Mui-checked": {
                    color: "#15765B",
                  },
                }}
              />
            }
            label={
              <p className="text-xs leading-[14px] text-colDarkGray">
                Я даю согласие на обработку моих персональных данных и принимаю
                условия{" "}
                <NavLink className="text-colGreen" to="#">
                  Пользовательского соглашения
                </NavLink>{" "}
                и{" "}
                <NavLink className="text-colGreen" to="#">
                  Политики обработки персональных данных
                </NavLink>
                
              </p>
            }
          />
        </form>
      </FormProvider>
    </>
    // </Box>
  );
};

export default Register;
