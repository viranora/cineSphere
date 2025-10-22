// src/pages/GenreResultsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { fetchMoviesByGenre } from '../api/tmdbApi';
import MovieCard from '../components/MovieCard';

const GenreResultsPage = () => {
  const { genreId } = useParams(); // URL'den ID'yi al (örn: 28)
  const location = useLocation(); // Link'ten gelen state'i okumak için
  const genreName = location.state?.genreName || 'Seçilen Tür'; // State'den adı al (örn: "Aksiyon")

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    setError(null);

    fetchMoviesByGenre(genreId, currentPage)
      .then(res => {
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages > 500 ? 500 : res.data.total_pages); // TMDb limiti (500 sayfa)
      })
      .catch(err => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [genreId, currentPage]); // Tür veya sayfa değiştikçe yeniden yükle

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-white mb-8">
        "{genreName}" Türündeki Filmler
      </h1>

      {isLoading && (
        <div className="text-center text-xl mt-20">Yükleniyor...</div>
      )}
      {error && (
        <div className="text-center text-xl text-red-400 mt-20">Filmler yüklenemedi.</div>
      )}
      {!isLoading && !error && movies.length === 0 && (
        <div className="text-center text-xl text-gray-400 mt-20">Bu türe ait film bulunamadı.</div>
      )}

      {!isLoading && !error && movies.length > 0 && (
        <>
          {/* Filmleri listele (Aynı HomePage aramasındaki gibi) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Sayfalandırma (Aynı HomePage'deki gibi) */}
          <div className="flex justify-between items-center mt-12">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-6 py-2 bg-indigo-600 rounded-lg text-lg font-semibold transition-all duration-300
                         hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              Önceki Sayfa
            </button>
            <span className="text-xl text-gray-300">
              Sayfa {currentPage} / {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-6 py-2 bg-indigo-600 rounded-lg text-lg font-semibold transition-all duration-300
                         hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              Sonraki Sayfa
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default GenreResultsPage;