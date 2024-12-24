import React from 'react';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PrivateRoute = ({ children }) => {
  const authToken = sessionStorage.getItem('authToken');
  const userRole = sessionStorage.getItem('userRole');

  if (!authToken) {
    toast.error('Please log in to access this page.');
    return <Navigate to="/auth/login" />;
  }

  if (userRole !== 'admin') {
    toast.error('Unauthorized: You do not have access to this page.');
    return <Navigate to="/auth/login" replace state={{ unauthorized: true }} />;
  }

  return children;
};

export default PrivateRoute;