// src/components/MovieCard.jsx
import React from 'react';
import { IMAGE_BASE_URL } from '../api/tmdbApi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUserLists } from '../context/UserListsContext';

// İkon SVG'leri
const HeartIcon = ({ isLiked }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
       className={`w-6 h-6 ${isLiked ? 'text-red-500' : 'text-white'}`}>
    <path d="M11.645 20.91a.75.75 0 0 1-1.29 0C8.63 18.705 5.53 16.14 3.399 13.999a6.38 6.38 0 0 1 .001-9.009A6.38 6.38 0 0 1 12 4.659a6.38 6.38 0 0 1 8.602 9.339 6.38 6.38 0 0 1-.001 9.009c-2.13 2.14-5.232 4.706-7.957 6.911Z" />
  </svg>
);
const BookmarkIcon = ({ isSaved }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
       className={`w-6 h-6 ${isSaved ? 'text-yellow-400' : 'text-white'}`}>
    <path fillRule="evenodd" d="M6 3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V3Zm3.75 2.25a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 1.5 0v-6Z" clipRule="evenodd" />
  </svg>
);

const MovieCard = ({ movie }) => {
  if (!movie) return null; 

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
        className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg 
                   transition-all duration-300 group relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.4)" }}
      >
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
          <button 
            onClick={handleLikeClick}
            className="p-1.5 bg-black/50 rounded-full backdrop-blur-sm transition-transform hover:scale-110"
            title={liked ? "Beğenmekten Vazgeç" : "Beğen"}
          >
            <HeartIcon isLiked={liked} />
          </button>
          <button 
            onClick={handleSaveClick}
            className="p-1.5 bg-black/50 rounded-full backdrop-blur-sm transition-transform hover:scale-110"
            title={saved ? "Listeden Çıkar" : "Listeye Kaydet"}
          >
            <BookmarkIcon isSaved={saved} />
          </button>
        </div>
        
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-auto"
        />
        <div className="p-4">
          <h3 className="font-bold text-lg truncate" title={movie.title}>
            {movie.title}
          </h3>
          <span className="text-sm text-gray-300">
            {movie.release_date ? movie.release_date.split('-')[0] : 'Tarih Yok'}
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

export default MovieCard;