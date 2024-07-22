// src/AuthModal/CheckAuth.tsx

import { Controller, useForm } from 'react-hook-form';
import CTextField from '../../CustomInputs/CTextField';
import { KeyboardArrowRight } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useRegistrationCheckMutation } from '../../../redux/api/userEndpoints';
// import { Loading } from '../Loader/Loader';

const CheckAuth = ({ setContent }) => {
    const {
        control,
        handleSubmit,
        reset,
        register,
        watch,
        formState: { errors, isValid },
    } = useForm({ mode: 'onChange' });

    const [registrationCheck] = useRegistrationCheckMutation();

    const onSubmitAuthCheck = async (data) => {
        const check = await registrationCheck(data);
        if (check.data.success) {

            console.log(check.data);
            if (check.data.login_type === 'email' || check.data.login_type === 'phone') {
                
                setContent('authWithEmail');
            }
        } else {
            setContent('register');
        }
    };

    return (
        <Box>
            <h1 className='text-2xl mm:text-3xl text-colBlack text-center pt-2 pb-8 font-semibold'>
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
                <button className="w-full h-10 px-6 bg-colGreen rounded mt-5 text-white font-semibold">
                    Продолжить
                    <KeyboardArrowRight className="!w-5" />
                </button>
            </form>
        </Box>
    );
};

export default CheckAuth;
