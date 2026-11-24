import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import { PreferencesControl } from './features/preferences/preferencesControl';

const configuredTechnologies = [
  'React + TypeScript',
  'Redux Toolkit',
  'TanStack Query',
  'Material UI',
];

function App() {
  return (
    <Box component="main" sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="md">
        <Stack spacing={4}>
          <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
            <Chip
              color="primary"
              icon={<ElectricalServicesIcon />}
              label="Project foundation"
              variant="outlined"
            />

            <Typography component="h1" variant="h1">
              NEMA Breaker Selectivity Explorer
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ maxWidth: 680 }}
              variant="body1"
            >
              Explore selective coordination between main,
              feeder, and branch circuit breakers.
            </Typography>
          </Stack>

          <Card>
            <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
              <Stack spacing={3}>
                <Box>
                  <Typography component="h2" variant="h2">
                    Application foundation
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{ mt: 1 }}
                    variant="body2"
                  >
                    The shared application providers and
                    frontend state infrastructure are
                    configured.
                  </Typography>
                </Box>

                <Divider />

                <Stack spacing={1.5}>
                  {configuredTechnologies.map((technology) => (
                    <Stack
                      direction="row"
                      key={technology}
                      spacing={1}
                      sx={{ alignItems: 'center' }}
                    >
                      <Typography
                        aria-hidden="true"
                        color="success.main"
                        component="span"
                      >
                        ✓
                      </Typography>

                      <Typography variant="body1">
                        {technology}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>

                <Divider />

                <PreferencesControl />
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}

export default App;