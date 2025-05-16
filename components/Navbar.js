import { useRouter } from 'next/router';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  useTheme as useMuiTheme
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  Movie,
  TheaterComedy,
  Person
} from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => router.push('/')}
          sx={{ mr: 2 }}
        >
          <Movie />
        </IconButton>
        
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            cursor: 'pointer'
          }}
          onClick={() => router.push('/')}
        >
          Movie App
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            color="inherit"
            startIcon={<Movie />}
            onClick={() => router.push('/movies')}
          >
            Movies
          </Button>
          
          <Button
            color="inherit"
            startIcon={<TheaterComedy />}
            onClick={() => router.push('/genres')}
          >
            Genres
          </Button>
          
          <Button
            color="inherit"
            startIcon={<Person />}
            onClick={() => router.push('/directors')}
          >
            Directors
          </Button>

          <IconButton 
            color="inherit" 
            onClick={toggleTheme}
            sx={{ ml: 1 }}
          >
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 