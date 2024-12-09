// src/components/ErrorBoundary/ErrorBoundaryWrapper.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

interface WrapperProps {
  children: React.ReactNode;
  fallback: (error: Error, reset: () => void) => React.ReactNode;
  showToast?: boolean;
}

export const ErrorBoundaryWrapper: React.FC<WrapperProps> = ({ children, fallback, showToast }) => {
  const location = useLocation();
  
  return (
    <ErrorBoundary 
      fallback={fallback}
      showToast={showToast}
      resetCondition={location.pathname}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
