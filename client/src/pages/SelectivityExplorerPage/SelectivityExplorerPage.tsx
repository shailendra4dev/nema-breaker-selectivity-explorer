import { useState } from 'react';

import {
  Alert,
  Box,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';

import { useAppDispatch } from '../../app/hooks';

import { useBreakers } from '../../features/breakers/hooks/useBreakers';

import { ExplorerForm } from '../../features/explorer/components/ExplorerForm';
import { ExplorerResult } from '../../features/explorer/components/ExplorerResult';
import { RecentSearches } from '../../features/explorer/components/RecentSearches';

import { useSelectivityLookup } from '../../features/explorer/hooks/useSelectivityLookup';

import {
  addRecentSearch,
} from '../../features/explorer/store/explorerSlice';

import type {
  ExplorerFormData,
} from '../../features/explorer/schemas/explorerSchema';

import type {
  ExplorerLookupResult,
} from '../../features/explorer/types/explorer.types';

export const ExplorerPage = () => {
  const dispatch = useAppDispatch();

  const [result, setResult] =
    useState<ExplorerLookupResult | null>(null);

  const {
    data: breakers = [],
    isLoading: isBreakersLoading,
    isError: isBreakersError,
  } = useBreakers();

  const {
    mutate: lookupSelectivity,
    isPending,
    isError: isLookupError,
    error: lookupError,
  } = useSelectivityLookup();

  const handleLookup = (
    values: ExplorerFormData,
  ) => {
    setResult(null);

    lookupSelectivity(values, {
      onSuccess: (lookupResult) => {
        if (lookupResult === null) {
          return;
        }

        setResult(lookupResult);

        dispatch(
          addRecentSearch({
            id: `${Date.now()}`,

            voltage: values.voltage,

            upstreamBreakerId:
              values.upstreamBreakerId,

            downstreamBreakerId:
              values.downstreamBreakerId,

            selectivityKa:
              lookupResult.selectivityKa,

            searchedAt:
              new Date().toISOString(),
          }),
        );
      },
    });
  };

  if (isBreakersLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 300,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isBreakersError) {
    return (
      <Alert severity="error">
        Unable to load breakers.
      </Alert>
    );
  }

  return (
    <Stack spacing={4}>
      {/* Page heading */}
      <Box>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
        >
          Selectivity Explorer
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
        >
          Select the system voltage, upstream
          breaker, and downstream breaker to
          check their selectivity limit.
        </Typography>
      </Box>

      {/* Explorer form */}
      <ExplorerForm
        breakers={breakers}
        onSubmit={handleLookup}
        isPending={isPending}
      />

      {/* Lookup in progress */}
      {isPending && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <CircularProgress size={24} />

          <Typography color="text.secondary">
            Checking selectivity...
          </Typography>
        </Box>
      )}

      {/* Lookup error */}
      {isLookupError && (
        <Alert severity="error">
          {lookupError instanceof Error
            ? lookupError.message
            : 'Unable to check selectivity.'}
        </Alert>
      )}

      {/* Lookup result */}
      {result && (
        <ExplorerResult
          breakers={breakers}
          result={
            result as Parameters<typeof ExplorerResult>[0]['result']
          }
        />
      )}

      {/* Redux recent search history */}
      <RecentSearches />
    </Stack>
  );
};

export default ExplorerPage;