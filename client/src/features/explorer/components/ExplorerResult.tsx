import {
  Alert,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import type { Breaker } from '../../breakers/types/breaker.types';
import type { SelectivityLookupResult } from '../types/explorer.types';

interface ExplorerResultProps {
  result: SelectivityLookupResult;
  breakers: Breaker[];
}

export const ExplorerResult = ({
  result,
  breakers,
}: ExplorerResultProps) => {
  if (!result) {
    return (
      <Alert severity="info">
        No active selectivity data was found for the
        selected voltage and breaker combination.
      </Alert>
    );
  }

  const upstreamBreaker = breakers.find(
    (breaker) =>
      breaker.id === result.upstreamBreakerId,
  );

  const downstreamBreaker = breakers.find(
    (breaker) =>
      breaker.id === result.downstreamBreakerId,
  );

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Stack
            component="div"
            direction="row"
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h6"
              component="h2"
            >
              Selectivity Result
            </Typography>

            <Chip
              label="Selective"
              color="success"
              size="small"
            />
          </Stack>

          <Divider />

          <Typography>
            <strong>Voltage:</strong>{' '}
            {result.voltage} V
          </Typography>

          <Typography>
            <strong>Upstream Breaker:</strong>{' '}
            {upstreamBreaker?.catalogNumber ??
              result.upstreamBreakerId}
          </Typography>

          <Typography>
            <strong>Downstream Breaker:</strong>{' '}
            {downstreamBreaker?.catalogNumber ??
              result.downstreamBreakerId}
          </Typography>

          <Typography
            variant="h5"
            color="success.main"
          >
            Selective up to {result.selectivityKa} kA
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};