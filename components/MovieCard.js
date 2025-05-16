import React from 'react';
import { useRouter } from 'next/router';
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
  Rating,
  Stack
} from '@mui/material';
import { Movie, LocalMovies } from '@mui/icons-material';

export default function MovieCard({ movie }) {
  const router = useRouter();

  return (
    <Card 
      sx={{ 
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: '0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2" align="center" sx={{ fontWeight: 'bold' }}>
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {movie.description}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
          <Rating 
            value={parseFloat(movie.rating) / 2} 
            precision={0.5} 
            readOnly
          />
          <Typography variant="body2" color="text.secondary">
            ({movie.rating}/10)
          </Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ padding: 2, justifyContent: 'center' }}>
        <Button
          size="small"
          variant="contained"
          startIcon={<Movie />}
          onClick={() => router.push(`/movies/${movie.id}`)}
          sx={{ mr: 1 }}
        >
          Details
        </Button>
        <Button
          size="small"
          variant="outlined"
          startIcon={<LocalMovies />}
          onClick={() => router.push(`/genres/${movie.genreId}`)}
        >
          Genre
        </Button>
      </CardActions>
    </Card>
  );
} 