import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Box,
  Button
} from '@mui/material';
import { ArrowBack, LocalMovies } from '@mui/icons-material';

// Fetch genres from the API in getServerSideProps
export async function getServerSideProps() {
  try {
    // Use the correct API endpoint (relative to the server)
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/genres`);
    if (!response.ok) {
      throw new Error('Failed to fetch genres');
    }
    const genres = await response.json();

    return {
      props: { genres },
    };
  } catch (error) {
    console.error('Error fetching genres:', error);
    return {
      props: { genres: [] },
    };
  }
}

export default function GenresPage({ genres }) {
  const router = useRouter();

  if (!genres || genres.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center" color="text.secondary">
          No genres available.
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
          sx={{ mb: 2 }}
        >
          Back
        </Button>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Movie Genres
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {genres.map((genre) => (
          <Grid item key={genre.id} xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
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
              <CardActionArea 
                onClick={() => router.push(`/genres/${genre.id}`)}
                sx={{ height: '100%' }}
              >
                <CardContent>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      justifyContent: 'center'
                    }}
                  >
                    <LocalMovies sx={{ mr: 1, fontSize: 30 }} />
                    <Typography variant="h5" component="h2" gutterBottom>
                      {genre.name}
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary">
                    {genre.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
