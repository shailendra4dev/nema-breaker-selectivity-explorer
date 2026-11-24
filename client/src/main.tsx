import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import { queryClient } from './app/queryClient';
import { store } from './app/store';
import { appTheme } from './app/theme';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    'Unable to start the application: root element was not found.',
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);