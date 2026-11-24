import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2e7d32',
      dark: '#1b5e20',
      light: '#4caf50',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1565c0',
      dark: '#0d47a1',
      light: '#42a5f5',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f7f9',
      paper: '#ffffff',
    },
    text: {
      primary: '#17212b',
      secondary: '#52606d',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ed6c02',
    },
    success: {
      main: '#2e7d32',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 6,
          minHeight: 40,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #e3e8ee',
          boxShadow: '0 2px 8px rgba(23, 33, 43, 0.06)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        fullWidth: true,
      },
    },
  },
});