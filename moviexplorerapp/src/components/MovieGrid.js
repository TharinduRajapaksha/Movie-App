import React, { useRef, useCallback, useEffect, useState } from 'react';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import MovieCard from './MovieCard';
import { useMovieContext } from '../context/MovieContext';
import { searchMovies, fetchTrendingMovies } from '../api/tmdb';

const MovieGrid = ({ isSearchMode }) => {
  const {
    searchResults,
    setSearchResults,
    trendingMovies,
    setTrendingMovies,
    lastSearch,
  } = useMovieContext();

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        if (isSearchMode && lastSearch) {
          const data = await searchMovies(lastSearch, page);
          setSearchResults((prev) => [...prev, ...data.results]);
        } else {
          const data = await fetchTrendingMovies(page);
          setTrendingMovies((prev) => [...prev, ...data.results]);
        }
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [page, isSearchMode, lastSearch, setSearchResults, setTrendingMovies]);

  const movies = isSearchMode ? searchResults : trendingMovies;

  return (
    <Box sx={{ px: 2 }}>
      <Grid container justifyContent="center">
        {movies.map((movie, index) => (
          <Grid item key={movie.id} ref={index === movies.length - 1 ? lastElementRef : null}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {!loading && movies.length === 0 && (
        <Typography align="center" variant="h6" sx={{ mt: 4 }}>
          No movies found.
        </Typography>
      )}
    </Box>
  );
};

export default MovieGrid;
