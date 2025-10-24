import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserLists } from '../context/UserListsContext';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useUserLists();

  if (isLoading) {
    return <div className="text-center text-xl mt-20">Yükleniyor...</div>; 
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />; 
};

export default ProtectedRoute;