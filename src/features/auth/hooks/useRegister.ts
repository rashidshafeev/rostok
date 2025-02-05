// src/features/auth/hooks/useRegister.ts
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { setToken, setUserData } from '@/entities/user';

import { useUserRegisterMutation } from '../api/authenticationApi';

import { useSyncUserData } from './useSyncUserData';

export interface RegisterData {
  name: string;
  phone: string;
  email: string;
  password: string;
  privacyPolicy: boolean;
  legalRepresentative?: boolean;
}

export const useRegister = (hideModal: () => void) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [responseError, setResponseError] = useState<string | null>(null);

  const [userRegister, { isLoading: registerIsLoading }] =
    useUserRegisterMutation();
  const { syncOnLogin, isLoading: syncLoading } = useSyncUserData();

  const register = async (data: RegisterData) => {
    try {
      const response = await userRegister(data).unwrap();
console.log("response", response);
      if (response?.success) {
        dispatch(setToken(response?.token));
        if (response?.user) {
          dispatch(setUserData(response?.user));
        }

        await syncOnLogin();
        hideModal();
        navigate(response?.redirect || '/profile/orders');
        toast('Регистрация прошла успешно');
        return true;
      }

      const errorMessage = response?.err || 'Ошибка при регистрации';
      setResponseError(errorMessage);
      toast.error(`Не удалось зарегистрироваться. ${errorMessage}`);
      return false;
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      setResponseError('Неожиданная ошибка');
      return false;
    }
  };

  return {
    register,
    responseError,
    isLoading: registerIsLoading || syncLoading,
  };
};
