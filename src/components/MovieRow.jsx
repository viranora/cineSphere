import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../api/tmdbApi';
import { motion } from 'framer-motion';
import { useUserLists } from '../context/UserListsContext';

const HeartIcon = ({ isLiked }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
       className={`w-5 h-5 ${isLiked ? 'text-red-500' : 'text-white'}`}>
    <path d="M11.645 20.91a.75.75 0 0 1-1.29 0C8.63 18.705 5.53 16.14 3.399 13.999a6.38 6.38 0 0 1 .001-9.009A6.38 6.38 0 0 1 12 4.659a6.38 6.38 0 0 1 8.602 9.339 6.38 6.38 0 0 1-.001 9.009c-2.13 2.14-5.232 4.706-7.957 6.911Z" />
  </svg>
);
const BookmarkIcon = ({ isSaved }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
       className={`w-5 h-5 ${isSaved ? 'text-yellow-400' : 'text-white'}`}>
    <path fillRule="evenodd" d="M6 3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V3Zm3.75 2.25a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 1.5 0v-6Z" clipRule="evenodd" />
  </svg>
);

const SmallMovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=Poster+Yok';

  const { isLiked, addLikedMovie, removeLikedMovie, isSaved, addSavedMovie, removeSavedMovie } = useUserLists();
  
  const liked = isLiked(movie.id);
  const saved = isSaved(movie.id);

  const handleLikeClick = (e) => {
    e.preventDefault(); e.stopPropagation();
    liked ? removeLikedMovie(movie.id) : addLikedMovie(movie.id);
  };
  const handleSaveClick = (e) => {
    e.preventDefault(); e.stopPropagation();
    saved ? removeSavedMovie(movie.id) : addSavedMovie(movie.id);
  };

  return (
    <Link to={`/movie/${movie.id}`}>
      <motion.div
        className="flex-shrink-0 w-40 md:w-48 bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden shadow-lg 
                   transition-all duration-300 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.4)" }}
      >
        <div className="absolute top-1.5 right-1.5 z-10 flex flex-col gap-1.5">
          <button 
            onClick={handleLikeClick}
            className="p-1 bg-black/50 rounded-full backdrop-blur-sm transition-transform hover:scale-110"
            title={liked ? "Beğenmekten Vazgeç" : "Beğen"}
          >
            <HeartIcon isLiked={liked} />
          </button>
          <button 
            onClick={handleSaveClick}
            className="p-1 bg-black/50 rounded-full backdrop-blur-sm transition-transform hover:scale-110"
            title={saved ? "Listeden Çıkar" : "Listeye Kaydet"}
          >
            <BookmarkIcon isSaved={saved} />
          </button>
        </div>

        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-60 md:h-72 object-cover"
        />
        <div className="p-3">
          <h3 className="text-white font-semibold text-sm truncate" title={movie.title}>
            {movie.title}
          </h3>
          <p className="text-gray-400 text-xs">{movie.release_date?.split('-')[0]}</p>
        </div>
      </motion.div>
    </Link>
  );
};

const MovieRow = ({ title, movies }) => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
      <div className="flex overflow-x-auto gap-4 pb-4">
        {movies && movies.length > 0 ? (
          movies.map(movie => (
            <SmallMovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p className="text-gray-400">Bu liste için henüz film eklenmemiş.</p>
        )}
      </div>
    </div>
  );
};

export default MovieRow;