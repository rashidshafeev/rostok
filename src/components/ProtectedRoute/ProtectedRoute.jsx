// src/components/ProtectedRoute.jsx
import  { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getTokenFromCookies } from '../../helpers/cookies/cookies';
import { useModal } from '../../context/ModalContext';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = getTokenFromCookies()
  const location = useLocation();
  const { showModal  } = useModal();
  
  useEffect(() => {
    if (!isAuthenticated) {
      showModal({ type: 'auth', content: 'checkAuth', from: location})
    }
  }, [isAuthenticated, location]);

  if (!isAuthenticated) {
    return (
      <>
        <Navigate to="/"  />
      </>
    );
  }

  return children;
};

export default ProtectedRoute;