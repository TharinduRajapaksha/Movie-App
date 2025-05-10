import React from 'react';
import { Container, Typography } from '@mui/material';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import { useMovieContext } from '../context/MovieContext';

const Home = () => {
  const { lastSearch } = useMovieContext();
  const isSearchMode = !!lastSearch;

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        {isSearchMode ? `Search Results for "${lastSearch}"` : 'Trending Movies'}
      </Typography>
      <SearchBar />
      <MovieGrid isSearchMode={isSearchMode} />
    </Container>
  );
};

export default Home;