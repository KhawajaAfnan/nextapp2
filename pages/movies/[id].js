import { getMovieById } from "../../data/movies";
import { getDirectorById } from "../../data/movies";
import { useRouter } from "next/router";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Rating,
  Chip,
  Divider,
} from '@mui/material';
import { ArrowBack, Person } from '@mui/icons-material';

export async function getStaticProps(context) {
    const id = context.params.id;    
    const data = await getMovieById(id);
    if (!data || data.length === 0) {
        return {
          notFound: true,
        };
    }
    const director = await getDirectorById(data.directorId);
    
    // Create a new object without the MongoDB _id field
    const serializedMovie = {
        id: data.id,
        title: data.title,
        description: data.description,
        releaseYear: data.releaseYear,
        rating: data.rating,
        genreId: data.genreId,
        directorId: data.directorId,
        director: {
            id: director.id,
            name: director.name
        }
    };
    
    return {
        props: { 
            movie: serializedMovie
        },
        revalidate: 60,
    };
}

export async function getStaticPaths() {
    return {
        paths: [], // We'll let Next.js handle this dynamically
        fallback: 'blocking',
    };
}

export default function MovieDetailsPage({ movie }) {
    const router = useRouter();

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Button
                startIcon={<ArrowBack />}
                onClick={() => router.back()}
                sx={{ mb: 3 }}
            >
                Back
            </Button>

            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {movie.title}
                    </Typography>
                    
                    <Box sx={{ my: 2 }}>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            {movie.description}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Typography component="span" variant="body1" sx={{ mr: 1 }}>
                            Rating:
                        </Typography>
                        <Rating 
                            value={parseFloat(movie.rating) / 2}
                            precision={0.5}
                            readOnly
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            ({movie.rating}/10)
                        </Typography>
                    </Box>

                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Release Year: <Chip label={movie.releaseYear} />
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            variant="outlined"
                            startIcon={<Person />}
                            onClick={() => router.push(`/movies/director/${movie.director.id}`)}
                        >
                            Director: {movie.director.name}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}