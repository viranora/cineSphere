 import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import { 
  fetchMovieDetails, 
  fetchSimilarMovies,
  IMAGE_BASE_URL, 
  IMAGE_BACKDROP_URL, 
  PROFILE_IMAGE_URL 
} from '../api/tmdbApi';
import ColorThief from 'colorthief';

const MovieDetailPage = () => {
 
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bgColor, setBgColor] = useState('rgb(31, 41, 55)');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    
    fetchMovieDetails(movieId)
      .then(response => {
        setMovie(response.data);
        setIsLoading(false); 
        const posterUrl = `${IMAGE_BASE_URL}${response.data.poster_path}`;
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = posterUrl;
        img.onload = () => {
          const colorThief = new ColorThief();
          try {
            const dominantColor = colorThief.getColor(img);
            setBgColor(`rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`);
          } catch (error) {
            console.error('Renk alınamadı:', error);
          }
        };
      })
      .catch(error => {
        console.error("Film detayı hatası:", error);
        setIsLoading(false);
      });
      
    fetchSimilarMovies(movieId)
      .then(response => {
        setSimilarMovies(response.data.results);
      })
      .catch(error => console.error("Benzer filmler hatası:", error));
  }, [movieId]);

  const officialTrailer = movie?.videos?.results.find(
    video => video.type === 'Trailer' && video.site === 'YouTube' && video.official
  );
  const anyTrailer = movie?.videos?.results.find(
    video => video.type === 'Trailer' && video.site === 'YouTube'
  );
  const trailerToPlay = officialTrailer || anyTrailer;
  const cast = movie?.credits?.cast.slice(0, 10);

  if (isLoading) return <div className="text-center text-xl mt-20">Yükleniyor...</div>;
  if (!movie) return <div className="text-center text-xl mt-20">Film bulunamadı.</div>;

  const backgroundStyle = {
    backgroundImage: `linear-gradient(to top, ${bgColor} 10%, rgba(31, 41, 55, 0.8) 70%), 
                      url(${IMAGE_BACKDROP_URL}${movie.backdrop_path})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  };

  return (
    <>
      <div className="relative -m-4">
        {/* Arkaplan Hero Bölümü */}
        <div 
          className="w-full h-[50vh] min-h-[400px] transition-all duration-1000"
          style={backgroundStyle}
        />

        {/* İçerik Bölümü */}
        <div className="container mx-auto p-4 md:p-8 relative -mt-32">
 
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0 w-64 mx-auto md:mx-0">
              <img 
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="rounded-xl shadow-2xl"
              />
            </div>
            <div className="flex-grow text-white">
              <h1 className="text-4xl md:text-6xl font-bold">{movie.title}</h1>
              <p className="text-xl text-gray-300 italic my-2">{movie.tagline}</p>
              <div className="flex flex-wrap items-center gap-4 my-4">
                <span className="font-bold text-yellow-400 text-2xl">
                  ★ {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-300">{movie.release_date?.split('-')[0]}</span>
                <span className="text-gray-300">{movie.runtime} dakika</span>
              </div>
              <div className="my-4">
                {movie.genres.map(genre => (
                  <span key={genre.id} className="inline-block bg-white/20 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                    {genre.name}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl font-semibold mt-6 mb-2">Özet</h2>
              <p className="text-lg text-gray-200 leading-relaxed">{movie.overview}</p>
              {trailerToPlay && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-lg font-semibold transition-all duration-300 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" /></svg>
                  Fragmanı İzle
                </button>
              )}
            </div>
          </div>

          {/* Oyuncu Kadrosu Bölümü  */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-6">Oyuncu Kadrosu</h2>
            <div className="flex overflow-x-auto gap-4 pb-4">
              {cast && cast.length > 0 ? (
                cast.map(actor => (
 
                  <Link 
                    to={`/person/${actor.id}`} 
                    key={actor.cast_id} 
                    className="flex-shrink-0 w-36 text-center transition-all duration-300 hover:scale-105"
                  >
                    <img
                      src={actor.profile_path ? `${PROFILE_IMAGE_URL}${actor.profile_path}` : 'https://via.placeholder.com/185x278?text=Foto+Yok'}
                      alt={actor.name}
                      className="w-36 h-52 object-cover rounded-lg shadow-md"
                    />
                    <h3 className="text-white font-semibold mt-2 truncate">{actor.name}</h3>
                    <p className="text-gray-400 text-sm truncate">{actor.character}</p>
                  </Link>
                ))
              ) : (
                <p className="text-gray-400">Oyuncu bilgisi bulunamadı.</p>
              )}
            </div>
          </div>
          
          {/* Benzer Filmler Bölümü  */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-6">Benzer Filmler</h2>
            <div className="flex overflow-x-auto gap-4 pb-4">
              {similarMovies && similarMovies.length > 0 ? (
                similarMovies.map(similarMovie => (
                  <Link to={`/movie/${similarMovie.id}`} key={similarMovie.id} className="flex-shrink-0 w-40 text-left">
                    <div className="bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden shadow-lg 
                                    transition-all duration-300 hover:scale-105">
                      <img
                        src={similarMovie.poster_path ? `${IMAGE_BASE_URL}${similarMovie.poster_path}` : 'https://via.placeholder.com/500x750?text=Poster+Yok'}
                        alt={similarMovie.title}
                        className="w-full h-60 object-cover"
                      />
                      <div className="p-3">
                        <h3 className="text-white font-semibold text-sm truncate">{similarMovie.title}</h3>
                        <p className="text-gray-400 text-xs">{similarMovie.release_date?.split('-')[0]}</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-400">Benzer film bulunamadı.</p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Fragman Modal'ı*/}
      {isModalOpen && trailerToPlay && (
        <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
          <div onClick={(e) => e.stopPropagation()} className="bg-black w-full max-w-4xl aspect-video rounded-lg shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute -top-3 -right-3 z-50 bg-white rounded-full w-8 h-8 text-black flex justify-center items-center font-bold text-lg">X</button>
            <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${trailerToPlay.key}?autoplay=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="rounded-lg"></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetailPage;