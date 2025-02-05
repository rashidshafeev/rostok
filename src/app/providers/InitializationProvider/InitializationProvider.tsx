// src/app/providers/InitializationProvider/InitializationProvider.tsx
import type { FC, PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'; // Added missing import
import { RootState } from '@/store'; // Added missing import

import { initializeAuth } from '@/entities/user';
import { useInitialDataSync } from './lib/useInitialDataSync';

export const InitializationProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { isInitialized } = useSelector((state: RootState) => state.user);
  const { isSynced } = useInitialDataSync();

  // Initialize auth on mount
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  // if (!isInitialized || !isSynced) {
  //   return <div>Loading...</div>;
  // }

  return <>{children}</>;
};
