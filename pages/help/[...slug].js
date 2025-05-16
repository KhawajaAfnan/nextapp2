import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Breadcrumbs,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  Stack,
  Card,
  CardContent,
  Grid,
  TextField,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  ArrowBack,
  QuestionAnswer,
  Email,
  Security,
  CheckCircle,
  Info,
  ExpandMore,
  Phone,
  LocationOn,
  AccessTime,
  Lock,
  DataUsage,
  Policy
} from '@mui/icons-material';

export default function HelpPage() {
  const router = useRouter();
  const { slug } = router.query;

  const getContent = () => {
    if (!slug || slug.length === 0) {
      return {
        title: 'Help Center',
        content: <Typography>Welcome to the Help Center. Select a section above.</Typography>
      };
    }

    switch (slug[0]) {
      case 'faqs':
        return {
          title: 'Frequently Asked Questions',
          icon: <QuestionAnswer sx={{ fontSize: 40, color: '#2196F3' }} />,
          content: (
            <Box>
              <Alert severity="info" sx={{ mb: 4 }}>
                Find quick answers to the most common questions about our movie platform.
              </Alert>
              
              {[
                {
                  question: 'How do I find movies by a specific director?',
                  answer: 'You can visit our Directors page and click on any director to see their complete filmography. Each director card has a "View Filmography" button that will show you all their movies. You can also use the search function to find specific directors and their works.'
                },
                {
                  question: 'Can I filter movies by genre?',
                  answer: 'Yes! Our Genres page allows you to browse movies by different categories. Simply click on any genre card to see all movies in that category. Each genre section is clearly organized and shows the available movies with their details.'
                },
                {
                  question: 'How are trending movies determined?',
                  answer: 'Trending movies are selected based on user ratings and recent popularity. The top-rated movies appear on our homepage, giving you quick access to the most popular content. The list is regularly updated to ensure fresh content.'
                },
                {
                  question: 'Is the platform mobile-friendly?',
                  answer: 'Yes, our platform is fully responsive and works seamlessly on all devices including smartphones, tablets, and desktop computers. You can enjoy the same great experience no matter how you access the site.'
                },
                {
                  question: 'How often is the movie database updated?',
                  answer: 'Our movie database is regularly updated with new releases and classic films. We ensure that movie information, ratings, and director details are kept current to provide you with the most accurate information.'
                }
              ].map((faq, index) => (
                <Accordion key={index} sx={{ mb: 1 }}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    sx={{ 
                      background: 'linear-gradient(45deg, #f5f5f5 30%, #ffffff 90%)'
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="medium">
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          )
        };

      case 'contact':
        return {
          title: 'Contact Support',
          icon: <Email sx={{ fontSize: 40, color: '#4CAF50' }} />,
          content: (
            <Box>
              <Alert severity="info" sx={{ mb: 4 }}>
                Our support team is available 24/7 to help you with any questions or concerns.
              </Alert>

              <Grid container spacing={4}>
                {/* Contact Methods */}
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom color="primary">
                        Ways to Reach Us
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <Email color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Email Support"
                            secondary="support@movieapp.com"
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemIcon>
                            <Phone color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Phone Support"
                            secondary="1-800-MOVIES (Mon-Fri, 9AM-6PM EST)"
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemIcon>
                            <LocationOn color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Office Location"
                            secondary="123 Movie Street, Hollywood, CA 90028"
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Support Hours */}
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom color="primary">
                        Support Hours & Response Time
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <AccessTime color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Email Response Time"
                            secondary="Within 24 hours"
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemIcon>
                            <Info color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Live Chat"
                            secondary="Available 24/7"
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Contact Form */}
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom color="primary">
                        Send us a Message
                      </Typography>
                      <Box component="form" sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Name"
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Email"
                              variant="outlined"
                              type="email"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Message"
                              variant="outlined"
                              multiline
                              rows={4}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              variant="contained"
                              color="primary"
                              size="large"
                              sx={{ mt: 2 }}
                            >
                              Send Message
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )
        };

      case 'privacy':
        return {
          title: 'Privacy Policy',
          icon: <Security sx={{ fontSize: 40, color: '#9C27B0' }} />,
          content: (
            <Stack spacing={4}>
              <Alert severity="info">
                Last updated: March 2024. We take your privacy seriously and are committed to protecting your personal information.
              </Alert>

              {[
                {
                  title: 'Data Collection',
                  icon: <DataUsage />,
                  content: [
                    'Basic account information (name, email)',
                    'Movie preferences and viewing history',
                    'Device and browser information',
                    'Usage statistics and interaction data'
                  ]
                },
                {
                  title: 'Data Security',
                  icon: <Lock />,
                  content: [
                    'Industry-standard encryption protocols',
                    'Regular security audits and updates',
                    'Secure data storage and transmission',
                    'Limited employee access to personal data'
                  ]
                },
                {
                  title: 'Your Rights',
                  icon: <Policy />,
                  content: [
                    'Access your personal data',
                    'Request data deletion',
                    'Opt-out of marketing communications',
                    'Update your preferences anytime'
                  ]
                }
              ].map((section, index) => (
                <Card key={index} sx={{ overflow: 'visible' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <IconButton
                        sx={{
                          backgroundColor: 'primary.main',
                          color: 'white',
                          mr: 2,
                          '&:hover': {
                            backgroundColor: 'primary.dark',
                          }
                        }}
                      >
                        {section.icon}
                      </IconButton>
                      <Typography variant="h6" component="h3">
                        {section.title}
                      </Typography>
                    </Box>
                    <List>
                      {section.content.map((item, itemIndex) => (
                        <ListItem key={itemIndex}>
                          <ListItemIcon>
                            <CheckCircle color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              ))}

              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                For any privacy-related questions or concerns, please contact our Data Protection Officer at privacy@movieapp.com
              </Typography>
            </Stack>
          )
        };

      default:
        return {
          title: 'Page Not Found',
          content: (
            <Alert severity="error">
              The requested help section could not be found.
            </Alert>
          )
        };
    }
  };

  const content = getContent();

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
        
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link
            component="button"
            variant="body1"
            onClick={() => router.push('/help')}
            underline="hover"
            color="inherit"
          >
            Help Center
          </Link>
          <Typography color="text.primary">{content.title}</Typography>
        </Breadcrumbs>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          {content.icon}
          <Typography variant="h3" component="h1" sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent'
          }}>
            {content.title}
          </Typography>
        </Box>
      </Box>

      <Paper sx={{ p: 4 }}>
        {content.content}
      </Paper>
    </Container>
  );
}
