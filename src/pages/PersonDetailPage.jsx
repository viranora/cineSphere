// src/pages/PersonDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  fetchPersonDetails, 
  PERSON_PROFILE_URL, // Artık w500'ü çekecek
  IMAGE_BASE_URL 
} from '../api/tmdbApi';

const PersonDetailPage = () => {
  const { personId } = useParams();
  const [person, setPerson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    setError(null);

    fetchPersonDetails(personId)
      .then(res => {
        setPerson(res.data);
      })
      .catch(err => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [personId]);

  if (isLoading) return <div className="text-center text-xl mt-20">Yükleniyor...</div>;
  if (error) return <div className="text-center text-xl text-red-400 mt-20">Oyuncu bilgisi yüklenemedi.</div>;
  if (!person) return <div className="text-center text-xl text-gray-400 mt-20">Oyuncu bulunamadı.</div>;

  const movieCredits = person.movie_credits.cast
    .filter(movie => movie.poster_path)
    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sol Taraf: Oyuncu Fotoğrafı (GÜNCELLENDİ) */}
        <div className="flex-shrink-0 w-64 md:w-72 mx-auto md:mx-0"> 
          {/* Eskisi: w-full md:w-80 mx-auto md:mx-0
            Yenisi: w-64 (mobilde) md:w-72 (PC'de) ve mobilde ortalı
          */}
          <img
            src={person.profile_path ? `${PERSON_PROFILE_URL}${person.profile_path}` : 'https://via.placeholder.com/500x750?text=Foto+Yok'}
            alt={person.name}
            className="rounded-xl shadow-2xl w-full"
          />
        </div>

        {/* Sağ Taraf: Biyografi ve Bilgiler (Değişiklik yok) */}
        <div className="flex-grow text-white">
          <h1 className="text-4xl md:text-6xl font-bold">{person.name}</h1>
          
          <div className="my-6">
            <h2 className="text-2xl font-semibold mb-2">Biyografi</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              {person.biography || "Biyografi bulunamadı."}
            </p>
          </div>

          <div className="my-6 p-4 bg-white/10 backdrop-blur-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Kişisel Bilgiler</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-semibold text-gray-300">Doğum Tarihi</span>
                <p className="text-lg">{person.birthday || "Bilinmiyor"}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-300">Doğum Yeri</span>
                <p className="text-lg">{person.place_of_birth || "Bilinmiyor"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alt Bölüm: Rol Aldığı Filmler (Değişiklik yok) */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-white mb-6">Rol Aldığı Filmler</h2>
        <div className="flex overflow-x-auto gap-4 pb-4">
          {movieCredits.length > 0 ? (
            movieCredits.map(movie => (
              <Link to={`/movie/${movie.id}`} key={movie.credit_id} className="flex-shrink-0 w-40 text-left">
                <div className="bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden shadow-lg 
                                transition-all duration-300 hover:scale-105">
                  <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="text-white font-semibold text-sm truncate">{movie.title}</h3>
                    <p className="text-gray-400 text-xs">{movie.release_date?.split('-')[0]}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-400">Rol aldığı film bilgisi bulunamadı.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonDetailPage;