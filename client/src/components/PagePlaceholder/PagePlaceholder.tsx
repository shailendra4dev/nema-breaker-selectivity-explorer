import type { ReactNode } from 'react';

import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';

import {
  Alert,
  Box,
  Breadcrumbs,
  Chip,
  Link,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

interface PagePlaceholderProps {
  title: string;
  description: string;
  children?: ReactNode;
}

const PagePlaceholder = ({
  title,
  description,
  children,
}: PagePlaceholderProps) => {
  return (
    <Stack spacing={3}>
      <Box>
        <Breadcrumbs aria-label="Breadcrumb">
          <Link
            component={RouterLink}
            to="/"
            underline="hover"
            color="inherit"
          >
            Dashboard
          </Link>

          <Typography color="text.primary">
            {title}
          </Typography>
        </Breadcrumbs>

        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          sx={{
            mt: 1,
            alignItems: {
              xs: 'flex-start',
              sm: 'center',
            },
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mt: 0.75,
              }}
            >
              {description}
            </Typography>
          </Box>

          <Chip
            icon={<ConstructionOutlinedIcon />}
            label="Coming soon"
            color="warning"
            variant="outlined"
          />
        </Stack>
      </Box>

      {children}

      <Paper
        variant="outlined"
        sx={{
          p: {
            xs: 2,
            sm: 3,
          },
        }}
      >
        <Alert severity="info">
          This page has been added to the application routing
          structure. Its functional implementation will be completed
          during a later development day.
        </Alert>
      </Paper>
    </Stack>
  );
};

export default PagePlaceholder;