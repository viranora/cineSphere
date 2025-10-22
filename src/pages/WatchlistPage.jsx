// src/pages/WatchlistPage.jsx
import React, { useState, useEffect } from 'react';
import { useUserLists } from '../context/UserListsContext';
import { fetchMovieDetails } from '../api/tmdbApi';
import MovieCard from '../components/MovieCard';

const WatchlistPage = () => {
  const { savedMovies } = useUserLists(); // 1. Kaydedilen film ID'lerini al
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    if (savedMovies.length === 0) {
      setIsLoading(false);
      setMovies([]);
      return;
    }

    // 2. ID listesindeki her film için API'dan detayları çek
    const fetchMovies = async () => {
      const moviePromises = savedMovies.map(id => fetchMovieDetails(id));
      try {
        const movieResponses = await Promise.all(moviePromises);
        setMovies(movieResponses.map(res => res.data));
      } catch (err) {
        console.error("Kaydedilen filmler çekilirken hata:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [savedMovies]); // Kaydetme listesi değiştikçe yeniden çek

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-white mb-8">Kaydettiğim Filmler</h1>
      
      {isLoading && (
        <div className="text-center text-xl mt-20">Yükleniyor...</div>
      )}
      
      {!isLoading && movies.length === 0 && (
        <div className="text-center text-xl text-gray-400 mt-20">
          Henüz kaydettiğiniz bir film yok.
        </div>
      )}

      {!isLoading && movies.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;