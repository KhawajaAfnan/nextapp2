import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MovieCard from '../../components/MovieCard';
import {
  Container,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

export default function MoviesPage() {
    const router = useRouter();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const res = await fetch('/api/movies');
                if (!res.ok) {
                    throw new Error('Failed to fetch movies');
                }
                const data = await res.json();
                setMovies(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchMovies();
    }, []);

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Alert severity="error" sx={{ mt: 2 }}>
                    Error: {error}
                </Alert>
            </Container>
        );
    }

    if (!movies || movies.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Alert severity="info" sx={{ mt: 2 }}>
                    No movies found.
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => router.back()}
                    sx={{ mb: 2 }}
                >
                    Back
                </Button>
                <Typography variant="h3" component="h1" gutterBottom align="center">
                    All Movies
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {movies.map((movie) => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                        <MovieCard movie={movie} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
