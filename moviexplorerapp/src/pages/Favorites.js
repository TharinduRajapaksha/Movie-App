import React from 'react';
import { Container, Grid, Typography, Box, Button } from '@mui/material';
import MovieCard from '../components/MovieCard';
import { useMovieContext } from '../context/MovieContext';

const Favorites = () => {
  const { favorites, removeFavorite } = useMovieContext();

  const handleRemoveFavorite = (movieId) => {
    removeFavorite(movieId);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>Your Favorite Movies</Typography>
      <Grid container spacing={2}>
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
              <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemoveFavorite(movie.id)}
                >
                  Remove from Favorites
                </Button>
              </Box>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            You have no favorite movies yet.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Favorites;