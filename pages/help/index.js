import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Box,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  QuestionAnswer,
  Email,
  Security,
  ArrowBack,
  Help,
  Movie,
  Person,
  Category
} from '@mui/icons-material';

export default function HelpIndex() {
  const router = useRouter();

  const helpSections = [
    {
      title: 'Frequently Asked Questions',
      description: 'Find answers to common questions about using our movie platform',
      icon: <QuestionAnswer />,
      path: '/help/faqs',
      color: '#2196F3'
    },
    {
      title: 'Contact Support',
      description: 'Get in touch with our support team for assistance',
      icon: <Email />,
      path: '/help/contact',
      color: '#4CAF50'
    },
    {
      title: 'Privacy Policy',
      description: 'Learn about how we handle and protect your data',
      icon: <Security />,
      path: '/help/privacy',
      color: '#9C27B0'
    }
  ];

  const features = [
    { title: 'Movies', icon: <Movie />, description: 'Browse our extensive collection of movies' },
    { title: 'Directors', icon: <Person />, description: 'Explore famous directors and their works' },
    { title: 'Genres', icon: <Category />, description: 'Discover movies by your favorite genres' }
  ];

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
          Help Center
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Help Sections */}
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            How Can We Help You?
          </Typography>
          <Grid container spacing={3}>
            {helpSections.map((section) => (
              <Grid item xs={12} sm={6} md={4} key={section.title}>
                <Card 
                  sx={{ 
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  <CardActionArea onClick={() => router.push(section.path)}>
                    <CardContent>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 2,
                        color: section.color 
                      }}>
                        {section.icon}
                        <Typography variant="h6" sx={{ ml: 1 }}>
                          {section.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {section.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Quick Guide */}
        <Grid item xs={12} sx={{ mt: 4 }}>
          <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
            <Typography variant="h5" gutterBottom>
              Quick Guide to Features
            </Typography>
            <List>
              {features.map((feature, index) => (
                <Box key={feature.title}>
                  <ListItem>
                    <ListItemIcon sx={{ color: 'primary.main' }}>
                      {feature.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={feature.title}
                      secondary={feature.description}
                    />
                  </ListItem>
                  {index < features.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
