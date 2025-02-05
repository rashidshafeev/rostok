// src/features/auth/hooks/useAuthWithEmail.ts
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { setToken, setUserData } from '@/entities/user';

import { useAuthWithEmailMutation } from '../api/authenticationApi';

export const useAuthWithEmail = (hideModal: () => void) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [responseError, setResponseError] = useState<string | null>(null);

  const [authWithEmail, { isLoading }] = useAuthWithEmailMutation();

  const authenticate = async (data: AuthRequest) => {
    try {
      const response = await authWithEmail(data).unwrap();
      if (response.success) {
        dispatch(setToken(response.token));
        dispatch(setUserData(response.user));
        hideModal();
        navigate('/');
        return true;
      }
      setResponseError(response.err);
      return false;
    } catch (error) {
      console.error('Authorization failed:', error);
      toast.error('Authorization failed');
      return false;
    }
  };

  return {
    authenticate,
    responseError,
    isLoading,
  };
};
