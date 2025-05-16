import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MovieCard from '../components/MovieCard';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  Stack
} from '@mui/material';
import { Explore, Movie, Help } from '@mui/icons-material';

export default function HomePage() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        const res = await fetch('/api/movies/trending');
        if (!res.ok) throw new Error('Failed to fetch trending movies');
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTrendingMovies();
  }, []);

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <CircularProgress />
    </Box>
  );
  
  if (error) return (
    <Container>
      <Alert severity="error" sx={{ mt: 4 }}>Error: {error}</Alert>
    </Container>
  );
  
  if (!movies.length) return (
    <Container>
      <Alert severity="info" sx={{ mt: 4 }}>No trending movies found.</Alert>
    </Container>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Trending Movies
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="center"
        sx={{ mt: 4 }}
      >
        <Button
          variant="contained"
          startIcon={<Explore />}
          onClick={() => router.push('/genres')}
        >
          Browse Genres
        </Button>
        <Button
          variant="contained"
          startIcon={<Movie />}
          onClick={() => router.push('/movies')}
        >
          Browse All Movies
        </Button>
        <Button
          variant="outlined"
          startIcon={<Help />}
          onClick={() => router.push('/help')}
        >
          Help
        </Button>
      </Stack>
    </Container>
  );
}
