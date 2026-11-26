import type { PropsWithChildren } from 'react';

import { Provider } from 'react-redux';

import {
  QueryClientProvider,
} from '@tanstack/react-query';

import {
  CssBaseline,
  ThemeProvider,
} from '@mui/material';

import { store } from './store';
import { queryClient } from './queryClient';
import { theme } from './theme';

const AppProviders = ({
  children,
}: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default AppProviders;