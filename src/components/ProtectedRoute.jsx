// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserLists } from '../context/UserListsContext';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useUserLists();

  // Context, token'ı kontrol ederken (isLoading) bir şey gösterme
  // Bu, sayfanın "atmasını" engeller
  if (isLoading) {
    return <div className="text-center text-xl mt-20">Yükleniyor...</div>; 
  }

  // Kullanıcı giriş yapmışsa, altındaki sayfayı (Outlet) göster
  // Yapmamışsa, login sayfasına (artık '/') yönlendir
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />; 
};

export default ProtectedRoute;