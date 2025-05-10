import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Card sx={{ maxWidth: 200, m: 1 }} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent>
          <Typography variant="subtitle1" component="div" noWrap>
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(movie.release_date).getFullYear()} | ⭐ {movie.vote_average}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;