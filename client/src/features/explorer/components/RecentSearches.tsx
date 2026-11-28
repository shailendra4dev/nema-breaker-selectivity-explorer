import {
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import {
  useAppDispatch,
  useAppSelector,
} from '../../../app/hooks';

import {
  clearRecentSearches,
} from '../store/explorerSlice';

export const RecentSearches = () => {
  const dispatch = useAppDispatch();

  const recentSearches = useAppSelector(
    (state) => state.explorer.recentSearches,
  );

  if (recentSearches.length === 0) {
    return null;
  }

  return (
    <Paper
      variant="outlined"
      sx={{ p: 3 }}
    >
      <Stack spacing={2}>
        <Stack
          direction="row"
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">
            Recent Searches
          </Typography>

          <Button
            size="small"
            onClick={() =>
              dispatch(clearRecentSearches())
            }
          >
            Clear
          </Button>
        </Stack>

        <Divider />

        {recentSearches.map((search) => (
          <Stack
            key={search.id}
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            spacing={1}
            sx={{
              alignItems: {
                xs: 'flex-start',
                sm: 'center',
              },
            }}
          >
            <Chip
              label={`${search.voltage} V`}
              size="small"
            />

            <Typography variant="body2">
              {search.upstreamBreakerId}
              {' → '}
              {search.downstreamBreakerId}
            </Typography>

            <Typography
              variant="body2"
              sx={{ fontWeight: 600 }}
            >
              {search.selectivityKa} kA
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
};