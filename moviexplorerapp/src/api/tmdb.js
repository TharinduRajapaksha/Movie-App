import axios from 'axios';

const API_KEY = '32d7ddf93bc54b4d059663187f23dec3'; 
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const fetchTrendingMovies = async (page = 1) => {
  const { data } = await tmdb.get('/trending/movie/week', {
    params: { page },
  });
  return data;
};

export const searchMovies = async (query, page = 1) => {
  const { data } = await tmdb.get('/search/movie', {
    params: {
      query,
      page,
    },
  });
  return data;
};

export const fetchMovieDetails = async (id) => {
  const { data } = await tmdb.get(`/movie/${id}`, {
    params: {
      append_to_response: 'videos,credits',
    },
  });
  return data;
};

export default tmdb;
