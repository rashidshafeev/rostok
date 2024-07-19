// src/AuthModal/ResetPassword.tsx

import { Controller, useForm } from 'react-hook-form';
import CTextField from '../../CustomInputs/CTextField';
import { KeyboardArrowLeft } from '@mui/icons-material';
import { Box } from '@mui/material';
// import { Loading } from '../Loader/Loader';

const ResetPassword = ({ setContent }) => {

    const {
        control,
        handleSubmit,
        reset,
        register,
        watch,
        formState: { errors, isValid },
    } = useForm({ mode: 'onChange' });

    const [isLoading, setIsLoading] = useState(false);
    const [resPassword, setResPassword] = useState({
        successTxt: null,
        errorTxt: null,
    });

    const [resetPassword] = useResetPasswordMutation();


    const onSubmitResetPassword = async (data) => {
        setIsLoading(true);
        try {
            const auth = await resetPassword(data.email);
            setIsLoading(false);
            if (auth?.data?.success) {
                setResPassword({
                    successTxt: auth?.data?.message,
                    errorTxt: null,
                });
            } else {
                setResPassword({ successTxt: null, errorTxt: auth?.data?.err });
            }
        } catch (error) {
            setResPassword({ successTxt: null, errorTxt: 'Что-то пошло не так' });
            setIsLoading(false);
        }
    };

    return (
        <Box>
            {/* Content of ResetPassword */}
            <form onSubmit={handleSubmit(onSubmitResetPassword)}>
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <CTextField
                            label="Эл. почта"
                            type="text"
                            required={true}
                            {...field}
                        />
                    )}
                />
                <button className="w-full h-10 px-6 bg-colGreen rounded mt-5 text-white font-semibold">
                    Сбросить пароль
                </button>
                <p onClick={() => setContent('authWithEmail')} className="text-center mt-4 text-colGray2 font-medium cursor-pointer">
                    <KeyboardArrowLeft className="!w-5" /> Назад
                </p>
                {isLoading && <Loading />}
                {resPassword.successTxt && <p className="text-center mt-4 text-green-500 font-medium">{resPassword.successTxt}</p>}
                {resPassword.errorTxt && <p className="text-center mt-4 text-red-500 font-medium">{resPassword.errorTxt}</p>}
            </form>
        </Box>
    );
};

export default ResetPassword;
