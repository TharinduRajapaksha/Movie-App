import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box, Button } from '@mui/material';
import { useMovieContext } from '../context/MovieContext';
import { fetchMovieDetails } from '../api/tmdb';

const MovieDetails = () => {
  const { id } = useParams();
  const { favorites, addFavorite, removeFavorite } = useMovieContext();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadMovieDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
        setIsFavorite(favorites.some((fav) => fav.id === data.id));
      } catch (err) {
        console.error('Failed to fetch movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [id, favorites]);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>{movie.title} ({new Date(movie.release_date).getFullYear()})</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{ width: '300px' }} />
      </Box>
      <Typography variant="h6" paragraph>{movie.overview}</Typography>
      <Typography variant="body1"><strong>Genres:</strong> {movie.genres.map((genre) => genre.name).join(', ')}</Typography>
      <Typography variant="body1"><strong>Rating:</strong> ⭐ {movie.vote_average}</Typography>
      <Typography variant="body1"><strong>Cast:</strong> {movie.credits.cast.slice(0, 5).map((actor) => actor.name).join(', ')}</Typography>
      {movie.videos.results.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Trailer:</Typography>
          <Button
            variant="contained"
            color="primary"
            href={`https://www.youtube.com/watch?v=${movie.videos.results[0].key}`}
            target="_blank"
          >
            Watch Trailer
          </Button>
        </Box>
      )}
      <Button
        variant="outlined"
        color={isFavorite ? 'error' : 'primary'}
        sx={{ mt: 3 }}
        onClick={handleFavoriteToggle}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </Button>
    </Container>
  );
};

export default MovieDetails;
