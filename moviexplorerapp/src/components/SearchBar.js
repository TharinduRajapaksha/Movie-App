import React, { useState } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useMovieContext } from '../context/MovieContext';
import { searchMovies } from '../api/tmdb';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { setSearchResults, setLastSearch } = useMovieContext();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      const data = await searchMovies(query);
      setSearchResults(data.results);
      setLastSearch(query);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 1, mb: 2 }}>
      <TextField
        variant="outlined"
        placeholder="Search movies..."
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <IconButton type="submit" color="primary">
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
