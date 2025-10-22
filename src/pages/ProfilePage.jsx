// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useUserLists } from '../context/UserListsContext';
import { fetchMovieDetails } from '../api/tmdbApi';
import MovieRow from '../components/MovieRow';

const ProfilePage = () => {
  const { likedMovies, savedMovies, profilePic, setProfilePic } = useUserLists();
  
  const [likedMovieDetails, setLikedMovieDetails] = useState([]);
  const [savedMovieDetails, setSavedMovieDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    const fetchAllLists = async () => {
      try {
        // Beğenilenlerin detaylarını çek
        if (likedMovies.length > 0) {
          const likedPromises = likedMovies.map(id => fetchMovieDetails(id));
          const likedResponses = await Promise.all(likedPromises);
          setLikedMovieDetails(likedResponses.map(res => res.data));
        } else {
          setLikedMovieDetails([]);
        }

        // Kaydedilenlerin detaylarını çek
        if (savedMovies.length > 0) {
          const savedPromises = savedMovies.map(id => fetchMovieDetails(id));
          const savedResponses = await Promise.all(savedPromises);
          setSavedMovieDetails(savedResponses.map(res => res.data));
        } else {
          setSavedMovieDetails([]);
        }
      } catch (err) {
        console.error("Profil listeleri çekilirken hata:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllLists();
  }, [likedMovies, savedMovies]);

  // FOTOĞRAF YÜKLEME (Base64)
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // FileReader kullanarak resmi Base64 string'e dönüştür
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        setProfilePic(base64String); // Context'i ve localStorage'ı güncelle
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePic = () => {
    setProfilePic(null); // Context'i ve localStorage'ı temizle
  };

  return (
    <div className="py-8">
      {/* Profil İkonu ve Yükleme Butonları */}
      <div className="flex flex-col items-center justify-center mb-12">
        
        {/* Fotoğraf Kabı */}
        <div className="w-40 h-40 rounded-full bg-indigo-600 flex items-center justify-center 
                        text-white ring-4 ring-offset-4 ring-offset-gray-900 ring-indigo-500
                        overflow-hidden">
          {profilePic ? (
            <img src={profilePic} alt="Profil" className="w-full h-full object-cover" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        
        <h1 className="text-4xl font-bold text-white mt-6">Profilim</h1>
        {/* Kullanıcı adı ve e-posta (backend'siz versiyonda yok) */}

        {/* Fotoğraf Yükleme Kontrolleri */}
        <div className="flex items-center gap-4 mt-4">
          <label 
            htmlFor="profile-upload"
            className="text-sm font-medium text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors"
          >
            Fotoğrafı Değiştir
          </label>
          <input 
            id="profile-upload" 
            type="file" 
            accept="image/*" 
            className="hidden" // Gerçek input'u gizle
            onChange={handleFileChange} 
          />
          
          {profilePic && (
            <>
              <span className="text-gray-600">|</span>
              <button
                onClick={handleRemovePic}
                className="text-sm font-medium text-red-500 hover:text-red-400 transition-colors"
              >
                Kaldır
              </button>
            </>
          )}
        </div>
      </div>

      {/* Listeler */}
      {isLoading ? (
        <div className="text-center text-xl mt-20">Listeler Yükleniyor...</div>
      ) : (
        <div className="flex flex-col gap-12">
          <MovieRow 
            title="Kaydettiğim Filmler" 
            movies={savedMovieDetails} 
          />
          <MovieRow 
            title="Beğendiğim Filmler" 
            movies={likedMovieDetails} 
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;