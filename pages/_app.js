import React from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = React.useState(false);

  // Fix for hydration mismatch with localStorage
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeProvider>
      <ThemedApp Component={Component} pageProps={pageProps} mounted={mounted} />
    </ThemeProvider>
  );
}

function ThemedApp({ Component, pageProps, mounted }) {
  const { isDarkMode } = useTheme();

  // Create theme based on dark mode state
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light',
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#dc004e',
          },
          background: {
            default: isDarkMode ? '#121212' : '#ffffff',
            paper: isDarkMode ? '#1e1e1e' : '#ffffff',
          },
        },
        typography: {
          h3: {
            fontWeight: 700,
          },
          h5: {
            fontWeight: 600,
          },
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 8,
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: 'none',
              },
            },
          },
        },
      }),
    [isDarkMode]
  );

  if (!mounted) {
    return null;
  }

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Component {...pageProps} />
    </MuiThemeProvider>
  );
}

export default MyApp; 