// src/pages/DiscoverPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchGenres } from '../api/tmdbApi';

const DiscoverPage = () => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchGenres()
      .then(res => {
        setGenres(res.data.genres);
      })
      .catch(err => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div className="text-center text-xl mt-20">Türler Yükleniyor...</div>;
  if (error) return <div className="text-center text-xl text-red-400 mt-20">Türler yüklenirken bir hata oluştu.</div>;

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-white mb-8">Türlere Göre Keşfet</h1>
      
      {/* Türlerin listesi */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {genres.map(genre => (
          <Link
            key={genre.id}
            // 1. Tıklandığında sonuç sayfasına yönlendir
            to={`/genre/${genre.id}`}
            // 2. Bir sonraki sayfanın başlıkta "Aksiyon" yazabilmesi için 
            // state ile türün adını da gönderiyoruz.
            state={{ genreName: genre.name }}
            className="flex items-center justify-center text-xl font-semibold text-white bg-white/10 backdrop-blur-lg 
                       rounded-lg h-32 text-center p-4 transition-all duration-300
                       hover:bg-indigo-600 hover:scale-105 shadow-lg"
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DiscoverPage;