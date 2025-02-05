// src/entities/user/hooks/useAuth.ts
import { useSelector } from 'react-redux';

import type { RootState } from '@/app/providers/store';

export const useAuth = () => {
  const {
    isAuthenticated,
    token,
    data: user,
  } = useSelector((state: RootState) => state.user);

  return {
    isAuthenticated,
    token,
    user,
  };
};
