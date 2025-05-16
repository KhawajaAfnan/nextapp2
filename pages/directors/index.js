import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Box,
  Button,
  Avatar,
  CircularProgress,
  Alert,
  Chip,
  Divider
} from '@mui/material';
import { ArrowBack, Person, Movie, Star, LocationOn } from '@mui/icons-material';

export default function DirectorsPage() {
  const router = useRouter();
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDirectors() {
      try {
        const res = await fetch('/api/directors');
        if (!res.ok) throw new Error('Failed to fetch directors');
        const data = await res.json();
        setDirectors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDirectors();
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

  if (!directors || directors.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center" color="text.secondary">
          No directors available.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.back()}
          variant="outlined"
          sx={{ mb: 2 }}
        >
          Back
        </Button>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ 
          fontWeight: 700,
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          mb: 4
        }}>
          Film Directors
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {directors.map((director) => (
          <Grid item key={director.id} xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease-in-out',
                borderRadius: 2,
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 20px rgba(0,0,0,0.2)',
                }
              }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
                  pt: 4,
                  pb: 2,
                  px: 2,
                  textAlign: 'center'
                }}
              >
                <Avatar 
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    mx: 'auto',
                    mb: 2,
                    border: '4px solid white',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    bgcolor: 'primary.light'
                  }}
                >
                  <Person sx={{ fontSize: 50 }} />
                </Avatar>
                <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ color: 'white', fontWeight: 600 }}>
                  {director.name}
                </Typography>
              </Box>

              <CardContent sx={{ pt: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, alignItems: 'center' }}>
                  {director.nationality && (
                    <Chip
                      icon={<LocationOn />}
                      label={director.nationality}
                      variant="outlined"
                      color="primary"
                    />
                  )}
                  {director.birthYear && (
                    <Typography 
                      variant="body1" 
                      color="text.secondary" 
                      align="center"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      <Star sx={{ fontSize: 20 }} />
                      Born: {director.birthYear}
                    </Typography>
                  )}
                  <Divider sx={{ width: '80%', my: 1 }} />
                  <Button
                    variant="contained"
                    startIcon={<Movie />}
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent CardActionArea click
                      router.push(`/movies/director/${director.id}`);
                    }}
                    sx={{
                      mt: 1,
                      background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
                      color: 'white',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #0d47a1 30%, #1a237e 90%)',
                      }
                    }}
                  >
                    View Filmography
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
  