import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ElectricalServicesOutlinedIcon from '@mui/icons-material/ElectricalServicesOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

interface DashboardCard {
  title: string;
  description: string;
  path: string;
  actionLabel: string;
  icon: typeof ExploreOutlinedIcon;
}

const dashboardCards: DashboardCard[] = [
  {
    title: 'Selectivity Explorer',
    description:
      'Choose the system voltage, upstream breaker, and downstream breaker to find the applicable selective coordination value.',
    path: '/explorer',
    actionLabel: 'Open explorer',
    icon: ExploreOutlinedIcon,
  },
  {
    title: 'Breaker Families',
    description:
      'Maintain the high-level breaker family reference data used by individual breaker records.',
    path: '/breaker-families',
    actionLabel: 'View families',
    icon: CategoryOutlinedIcon,
  },
  {
    title: 'Breakers',
    description:
      'Manage breaker catalog records, ratings, and breaker-family relationships.',
    path: '/breakers',
    actionLabel: 'View breakers',
    icon: ElectricalServicesOutlinedIcon,
  },
  {
    title: 'Selectivity Records',
    description:
      'Maintain coordination values associated with system voltage, upstream breakers, and downstream breakers.',
    path: '/selectivity-records',
    actionLabel: 'View records',
    icon: TableChartOutlinedIcon,
  },
];

const DashboardPage = () => {
  return (
    <Stack spacing={4}>
      <Box>
        <Chip
          label="Project foundation"
          color="primary"
          variant="outlined"
          size="small"
          sx={{
            mb: 1.5,
          }}
        />

        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            fontSize: {
              xs: '2rem',
              md: '2.5rem',
            },
          }}
        >
          NEMA Breaker Selectivity Explorer
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            mt: 1.5,
            maxWidth: 800,
            fontWeight: 400,
          }}
        >
          Explore selective coordination between upstream and
          downstream circuit breakers and maintain the supporting
          reference data.
        </Typography>
      </Box>

      <Box>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            mb: 2,
            fontWeight: 600,
          }}
        >
          Application modules
        </Typography>

        <Grid container spacing={3}>
          {dashboardCards.map((card) => {
            const Icon = card.icon;

            return (
              <Grid
                key={card.path}
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    display: 'flex',
                    height: '100%',
                    flexDirection: 'column',
                    transition:
                      'border-color 150ms ease, box-shadow 150ms ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: 2,
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      flexGrow: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'grid',
                        width: 48,
                        height: 48,
                        placeItems: 'center',
                        borderRadius: 2,
                        color: 'primary.main',
                        bgcolor: 'action.hover',
                      }}
                    >
                      <Icon />
                    </Box>

                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        mt: 2.5,
                        fontWeight: 600,
                      }}
                    >
                      {card.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 1,
                      }}
                    >
                      {card.description}
                    </Typography>
                  </CardContent>

                  <CardActions
                    sx={{
                      px: 2,
                      pb: 2,
                    }}
                  >
                    <Button
                      component={RouterLink}
                      to={card.path}
                      endIcon={<ArrowForwardIcon />}
                    >
                      {card.actionLabel}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Stack>
  );
};

export default DashboardPage;