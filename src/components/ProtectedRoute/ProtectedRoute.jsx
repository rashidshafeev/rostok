// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getTokenFromCookies } from '../../helpers/cookies/cookies';
// import AuthModal from '../../helpers/CModal/AuthModal';
import { useModal } from '../../context/ModalContext';
import AuthModal from '../../helpers/CModal/AuthModal/AuthModal';
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