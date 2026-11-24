import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import {
  Button,
  Chip,
  Stack,
  Typography,
} from '@mui/material';

import {
  useAppDispatch,
  useAppSelector,
} from '../../app/hooks';
import { toggleDisplayDensity } from './preferencesSlice';

export function PreferencesControl() {
  const dispatch = useAppDispatch();

  const displayDensity = useAppSelector(
    (state) => state.preferences.displayDensity,
  );

  const isCompact = displayDensity === 'compact';

  return (
    <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
      <Stack
        direction="row"
        spacing={1}
        useFlexGap
        sx={{ alignItems: 'center', flexWrap: 'wrap' }}
      >
        <Typography variant="body1">
          Display density:
        </Typography>

        <Chip
          color={isCompact ? 'secondary' : 'default'}
          label={isCompact ? 'Compact' : 'Comfortable'}
          size="small"
        />
      </Stack>

      <Button
        variant="outlined"
        startIcon={<DensityMediumIcon />}
        onClick={() => dispatch(toggleDisplayDensity())}
      >
        Switch to {isCompact ? 'comfortable' : 'compact'} mode
      </Button>
    </Stack>
  );
}