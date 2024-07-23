// src/AuthModal/AuthWithEmail.tsx

import { Controller, useForm } from 'react-hook-form';
import CTextField from '../../CustomInputs/CTextField';
import { KeyboardArrowLeft, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box } from '@mui/material';
// import { Loading } from '../Loader/Loader';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuthWithEmailMutation } from '../../../redux/api/userEndpoints';
import { useSendCartMutation } from '../../../redux/api/cartEndpoints';
import { useSendFavoritesMutation } from '../../../redux/api/favoritesEndpoints';
import { useSendComparisonMutation } from '../../../redux/api/comparisonEndpoints';
import { setComparison } from '../../../redux/slices/comparisonSlice';
import { setFavorite } from '../../../redux/slices/favoriteSlice';
import { setCart } from '../../../redux/slices/cartSlice';
import { setToken } from '../../../redux/slices/userSlice';


const AuthWithEmail = ({ hideModal, setContent }) => {
    const {
        control,
        handleSubmit,
        reset,
        register,
        watch,
        formState: { errors, isValid },
    } = useForm({ mode: 'onChange' });


    const [isShow, setIsShow] = useState(false);
    const [resError, setResError] = useState(null);

    const cart = useSelector((state) => state.cart.cart);
    const comparison = useSelector((state) => state.comparison.comparison);
    const favorite = useSelector((state) => state.favorite.favorite);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [authWithEmail] = useAuthWithEmailMutation();
    const [sendCart] = useSendCartMutation();
    const [sendFavorites] = useSendFavoritesMutation();
    const [sendComparison] = useSendComparisonMutation();

    const sendAndClearData = async () => {
        try {
            await sendCart({ items: cart.map((item) => ({ id: item.id, quantity: item.quantity, selected: item.selected ? 1 : 0 })) });
            await sendComparison(comparison.map((item) => item.id));
            await sendFavorites(favorite.map((item) => item.id));
            sessionStorage.removeItem('cart');
            sessionStorage.removeItem('comparison');
            sessionStorage.removeItem('favorite');
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
            if (auth.data.success) {
                dispatch(setToken(auth.data.token));
                await sendAndClearData();
                hideModal();
                navigate('/');
                return;
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
                    defaultValue=""
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
                {resError && <p className="text-red-500 text-sm font-medium pt-1">{resError}</p>}
                <button className="w-full h-10 px-6 bg-colGreen rounded mt-5 text-white font-semibold">Войти</button>
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

export default AuthWithEmail;
