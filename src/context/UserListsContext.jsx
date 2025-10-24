import React, { createContext, useContext, useState, useEffect } from 'react';

const UserListsContext = createContext();

export const useUserLists = () => {
  return useContext(UserListsContext);
};

export const UserListsProvider = ({ children }) => {

  const [likedMovies, setLikedMovies] = useState(() => {
    const saved = localStorage.getItem('likedMovies');
    return saved ? JSON.parse(saved) : [];
  });

  const [savedMovies, setSavedMovies] = useState(() => {
    const saved = localStorage.getItem('savedMovies');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [profilePic, setProfilePic] = useState(() => {
    return localStorage.getItem('profilePic') || null;
  });

  // State'ler değiştikçe localStorage'ı güncelle
  useEffect(() => {
    localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
  }, [likedMovies]);

  useEffect(() => {
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies]);
  
  useEffect(() => {
    if (profilePic) {
      localStorage.setItem('profilePic', profilePic);
    } else {
      localStorage.removeItem('profilePic');
    }
  }, [profilePic]);

  
  // Beğenme Fonksiyonları
  const addLikedMovie = (movieId) => {
    setLikedMovies(prev => [...prev, movieId]);
  };
  const removeLikedMovie = (movieId) => {
    setLikedMovies(prev => prev.filter(id => id !== movieId));
  };
  const isLiked = (movieId) => {
    return likedMovies.includes(movieId);
  };
  
  // Kaydetme Fonksiyonları
  const addSavedMovie = (movieId) => {
    setSavedMovies(prev => [...prev, movieId]);
  };
  const removeSavedMovie = (movieId) => {
    setSavedMovies(prev => prev.filter(id => id !== movieId));
  };
  const isSaved = (movieId) => {
    return savedMovies.includes(movieId);
  };
  
  // Tüm bu fonksiyonları ve state'leri paylaş
  const value = {
    likedMovies,
    savedMovies,
    addLikedMovie,
    removeLikedMovie,
    isLiked,
    addSavedMovie,
    removeSavedMovie,
    isSaved,
    profilePic,
    setProfilePic, 
  };

  return (
    <UserListsContext.Provider value={value}>
      {children}
    </UserListsContext.Provider>
  );
};