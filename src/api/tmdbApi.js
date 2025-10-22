// src/api/tmdbApi.js
import axios from 'axios';

const API_KEY = 'bb67cee5c76856fd4ac1cc04ccfb074b'; 
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPopularMovies = (page = 1) => {
  return axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=tr-TR&page=${page}`);
};

export const searchMovies = (query, page = 1) => {
  return axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=tr-TR&page=${page}`);
};

export const fetchMovieDetails = (movieId) => {
  return axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=tr-TR&append_to_response=videos,credits`);
};

export const fetchSimilarMovies = (movieId) => {
  return axios.get(`${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=tr-TR&page=1`);
};

export const fetchTopRatedMovies = () => {
  return axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=tr-TR&page=1`);
};

export const fetchUpcomingMovies = () => {
  return axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=tr-TR&page=1`);
};

export const fetchGenres = () => {
  return axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=tr-TR`);
};

export const fetchMoviesByGenre = (genid, page = 1) => {
  return axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=tr-TR&with_genres=${genid}&page=${page}`);
};

export const fetchPersonDetails = (personId) => {
  return axios.get(`${BASE_URL}/person/${personId}?api_key=${API_KEY}&language=tr-TR&append_to_response=movie_credits`);
};


export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export const IMAGE_BACKDROP_URL = 'https://image.tmdb.org/t/p/w1280';
export const PROFILE_IMAGE_URL = 'https://image.tmdb.org/t/p/w185';
export const PERSON_PROFILE_URL = 'https://image.tmdb.org/t/p/w500'; // <-- GÜNCELLENDİ (h632 yerine w500)