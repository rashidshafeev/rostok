// src/AuthModal/CheckAuth.tsx

import { Controller, useForm } from "react-hook-form";
import CTextField from "../../CustomInputs/CTextField";
import { KeyboardArrowRight } from "@mui/icons-material";
import { useRegistrationCheckMutation } from "@api/userEndpoints";
import { LoadingSmall } from "@/helpers/Loader/Loader"; 

const CheckAuth = ({ setContent, setLogin }) => {
  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const [registrationCheck, { isLoading }] = useRegistrationCheckMutation();

  const onSubmitAuthCheck = async (data) => {
    try {
      const check = await registrationCheck(data);
      if (check.data.success) {
        console.log(check.data);
        if (
          check.data.login_type === "email" ||
          check.data.login_type === "phone"
        ) {
          setLogin({type: check.data.login_type, login: data.login});
          setContent("authWithEmail");
        }
      } else {
        setLogin({type: check.data.login_type, login: data.login});
        setContent("register");
      }
    } catch (error) {
        console.log(error);
    }
  };

  return (
    // <Box>
    <>
      <h1 className="text-2xl mm:text-3xl text-colBlack text-center pt-2 pb-8 font-semibold">
        Вход или Регистрация
      </h1>
      <form onSubmit={handleSubmit(onSubmitAuthCheck)}>
        <Controller
          name="login"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CTextField
              label="Эл. почта / телефон"
              type="text"
              required={true}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
        <button disabled={isLoading} className="w-full h-10 px-6 bg-colGreen rounded mt-5 text-white font-semibold flex justify-center items-center">
          {!isLoading && <>
          Продолжить
          <KeyboardArrowRight className="!w-5" />
          </>}
          {isLoading && <LoadingSmall extraStyle={"white"} />}
        </button>
      </form>
    </>
    // </Box>
  );
};

export default CheckAuth;
