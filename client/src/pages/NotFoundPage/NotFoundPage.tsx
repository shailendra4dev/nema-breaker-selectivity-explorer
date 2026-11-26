import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        minHeight: '60vh',
        placeItems: 'center',
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          width: '100%',
          maxWidth: 560,
          p: {
            xs: 3,
            sm: 5,
          },
          textAlign: 'center',
        }}
      >
        <Stack
          spacing={2.5}
          sx={{
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h1"
            color="primary"
            sx={{
              fontSize: {
                xs: '4rem',
                sm: '6rem',
              },
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            404
          </Typography>

          <Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
              }}
            >
              Page not found
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 1,
              }}
            >
              The page you requested does not exist or may have
              been moved.
            </Typography>
          </Box>

          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            startIcon={<ArrowBackIcon />}
          >
            Return to dashboard
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default NotFoundPage;