import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useAuthWithEmailMutation } from '../api/authenticationEndpoints';
import { setToken } from '../model/userSlice';

export const useAuthWithEmail = (hideModal) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [responseError, setResponseError] = useState(null);
  
  const [authWithEmail, { isLoading }] = useAuthWithEmailMutation();

  const authenticate = async (data) => {
    try {
      const auth = await authWithEmail(data);
      if (auth.data.success) {
        dispatch(setToken(auth.data.token));
        hideModal();
        navigate('/');
        return true;
      } else if (!auth.data.success) {
        setResponseError(auth.data.err);
      }
      return false;
    } catch (error) {
      console.error('Authorization failed:', error);
      return false;
    }
  };

  return {
    authenticate,
    responseError,
    isLoading,
  };
};