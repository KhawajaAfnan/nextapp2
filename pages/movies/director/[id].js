import useSWR from 'swr';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Divider,
  CircularProgress,
  Alert,
  Chip,
  Paper
} from '@mui/material';
import {
  ArrowBack,
  Person,
  Movie,
  Star,
  LocationOn,
  Cake,
  LocalMovies
} from '@mui/icons-material';
import MovieCard from '../../../components/MovieCard';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DirectorPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(id ? `/api/director/${id}` : null, fetcher);

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mt: 2 }}>
          Failed to load director information
        </Alert>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  const { director, movies } = data;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => router.back()}
        variant="outlined"
        sx={{ mb: 4 }}
      >
        Back
      </Button>

      {/* Director Info Card */}
      <Paper
        elevation={3}
        sx={{
          mb: 6,
          borderRadius: 2,
          overflow: 'hidden',
          background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
        }}
      >
        <Box
          sx={{
            p: 4,
            color: 'white',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Avatar
            sx={{
              width: 200,
              height: 200,
              border: '4px solid white',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              bgcolor: 'primary.light'
            }}
          >
            <Person sx={{ fontSize: 100 }} />
          </Avatar>

          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              {director.name}
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' }, mb: 3 }}>
              {director.nationality && (
                <Chip
                  icon={<LocationOn />}
                  label={director.nationality}
                  sx={{ color: 'white', borderColor: 'white' }}
                  variant="outlined"
                />
              )}
              {director.birthYear && (
                <Chip
                  icon={<Cake />}
                  label={`Born ${director.birthYear}`}
                  sx={{ color: 'white', borderColor: 'white' }}
                  variant="outlined"
                />
              )}
            </Box>

            {director.biography && (
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                {director.biography}
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Movies Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <LocalMovies sx={{ fontSize: 30, color: 'primary.main' }} />
          <Typography variant="h4" component="h2">
            Filmography
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
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 4 }}>
            No movies found for this director.
          </Typography>
        )}
      </Box>
    </Container>
  );
}
