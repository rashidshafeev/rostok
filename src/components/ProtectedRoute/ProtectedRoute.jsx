// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getTokenFromCookies } from '../../helpers/cookies/cookies';

const ProtectedRoute = ({ element }) => {
  const token = getTokenFromCookies();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;