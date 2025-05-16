import React from 'react';
import { useRouter } from 'next/router';
import { getMoviesByGenre } from '../../../data/movies';
import MovieCard from '../../../components/MovieCard';
import {
  Container,
  Typography,
  Grid,
  Button,
  Box
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

export async function getServerSideProps(context) {
    const { id } = context.params;
    const moviesData = await getMoviesByGenre(id);
    
    // Serialize the movies data to remove MongoDB ObjectId
    const serializedMovies = moviesData.map(movie => ({
        id: movie.id,
        title: movie.title,
        description: movie.description,
        releaseYear: movie.releaseYear,
        rating: movie.rating,
        genreId: movie.genreId,
        directorId: movie.directorId
    }));

    return {
        props: { 
            movies: serializedMovies,
            genreId: id
        },
    };
}

export default function MoviesByGenre({ movies, genreId }) {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={handleBack}
                    sx={{ mb: 2 }}
                >
                    Back
                </Button>
                <Typography variant="h3" component="h1" gutterBottom align="center">
                    Movies in this Genre
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {movies.map((movie) => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                        <MovieCard movie={movie} />
                    </Grid>
                ))}
            </Grid>

            {movies.length === 0 && (
                <Typography variant="body1" align="center" sx={{ mt: 4 }}>
                    No movies found in this genre.
                </Typography>
            )}
        </Container>
    );
}