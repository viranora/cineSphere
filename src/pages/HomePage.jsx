// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import {
  fetchPopularMovies,
  searchMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies
} from '../api/tmdbApi';
import MovieCard from '../components/MovieCard'; // Arama sonuçları için
import MovieRow from '../components/MovieRow';   // Ana sayfa şeritleri için
import { Link } from 'react-router-dom';

const HomePage = () => {
  // 1. TÜM VERİLER İÇİN STATE'LER
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  
  // Arama için sayfalandırma state'leri
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // 2. ANA SAYFA VERİLERİNİ ÇEKMEK İÇİN useEffect
  useEffect(() => {
    // Arama yapılmıyorsa ana sayfa verilerini çek
    if (!query) {
      setIsLoading(true);
      setError(null);
      setSearchResults([]); // Arama sonuçlarını temizle

      // Birden fazla API isteğini aynı anda yap
      Promise.all([
        fetchPopularMovies(1), // Popüler filmlerin 1. sayfasını al
        fetchTopRatedMovies(),
        fetchUpcomingMovies()
      ]).then(([popularRes, topRatedRes, upcomingRes]) => {
        setPopularMovies(popularRes.data.results);
        setTopRatedMovies(topRatedRes.data.results);
        setUpcomingMovies(upcomingRes.data.results);
      }).catch(err => {
        console.error("Ana sayfa API Hatası:", err);
        setError(err);
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }, [query]); // Sadece query boşaldığında ana sayfa verilerini yeniden çek

  // 3. ARAMA İÇİN useEffect (Sayfalandırmalı)
  useEffect(() => {
    // Sadece arama sorgusu varsa çalış
    if (query) {
      setIsLoading(true);
      setError(null);
      window.scrollTo(0, 0);
      
      searchMovies(query, currentPage)
        .then(response => {
          setSearchResults(response.data.results);
          setTotalPages(response.data.total_pages);
        })
        .catch(error => {
          console.error("Arama API Hatası:", error);
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [query, currentPage]); // query veya currentPage değiştiğinde aramayı tetikle

  const handleSearch = (e) => {
    e.preventDefault();
    const newQuery = e.target.elements.search.value;
    setQuery(newQuery);
    setCurrentPage(1); // Yeni aramada 1. sayfadan başla
  };

  // Sayfalandırma fonksiyonları (sadece arama için)
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  // 4. ARAYÜZÜN KARAR VERMESİ
  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center text-xl">Yükleniyor...</div>;
    }

    if (error) {
      return <div className="text-center text-xl text-red-400">
               Filmler yüklenemedi. (Hata: {error.response?.data?.status_message || error.message})
             </div>;
    }

    // ARAMA SONUÇLARINI GÖSTER
    if (query) {
      return (
        <>
          <h1 className="text-3xl font-bold mb-6">"{query}" için sonuçlar</h1>
          {searchResults.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {searchResults.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
              {/* Arama için sayfalandırma */}
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
          ) : (
            <div className="text-center text-xl text-gray-400">
              Bu arama için sonuç bulunamadı.
            </div>
          )}
        </>
      );
    }

    // ANA SAYFA FİLM ŞERİTLERİNİ GÖSTER
    return (
      <>
        <MovieRow title="Popüler Filmler" movies={popularMovies} />
        <MovieRow title="En Yüksek Puanlılar" movies={topRatedMovies} />
        <MovieRow title="Yakında Gelecekler" movies={upcomingMovies} />
      </>
    );
  };

  return (
    <>
      {/* Arama Çubuğu */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          placeholder="Film ara..."
          className="w-full px-4 py-3 mb-12 rounded-lg bg-white/20 text-white placeholder-gray-300
                     focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </form>

      {/* İçeriği göster */}
      {renderContent()}
    </>
  );
};

export default HomePage;