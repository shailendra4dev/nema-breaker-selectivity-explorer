import {
  Alert,
  Box,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { useBreakers } from '../../features/breakers/hooks/useBreakers';
import { ExplorerForm } from '../../features/explorer/components/ExplorerForm';
import { ExplorerResult } from '../../features/explorer/components/ExplorerResult';
import { useSelectivityLookup } from '../../features/explorer/hooks/useSelectivityLookup';
import type { ExplorerFormData } from '../../features/explorer/schemas/explorerSchema';

export const SelectivityExplorerPage = () => {
  const {
    data: breakers = [],
    isLoading: isBreakersLoading,
    isError: isBreakersError,
  } = useBreakers();

  const selectivityLookup =
    useSelectivityLookup();

  const handleSubmit = (
    values: ExplorerFormData,
  ) => {
    selectivityLookup.mutate(values);
  };

  if (isBreakersLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          py: 6,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isBreakersError) {
    return (
      <Alert severity="error">
        Failed to load breakers. Verify that the server
        is running and the Breaker API is available.
      </Alert>
    );
  }

  return (
    <Stack spacing={4}>
      <Box>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
        >
          Selectivity Explorer
        </Typography>

        <Typography color="text.secondary">
          Select the system voltage, upstream breaker,
          and downstream breaker to check the available
          selectivity information.
        </Typography>
      </Box>

      <Paper
        variant="outlined"
        sx={{
          p: 3,
          maxWidth: 700,
        }}
      >
        <ExplorerForm
          breakers={breakers}
          onSubmit={handleSubmit}
          isLoading={selectivityLookup.isPending}
        />
      </Paper>

      {selectivityLookup.isPending && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <CircularProgress size={32} />
        </Box>
      )}

      {selectivityLookup.isError && (
        <Alert severity="error">
          Unable to check selectivity. Verify that the
          server is running and try again.
        </Alert>
      )}

      {selectivityLookup.isSuccess && (
        <ExplorerResult
          result={selectivityLookup.data}
          breakers={breakers}
        />
      )}
    </Stack>
  );
};

export default SelectivityExplorerPage;