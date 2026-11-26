import {
  Alert,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

const technologies = [
  'React 19 and TypeScript',
  'Vite',
  'Redux Toolkit',
  'TanStack Query',
  'React Router',
  'Material UI',
  'React Hook Form and Zod',
  'Node.js, Express, and TypeScript',
  'REST API',
  'GraphQL and Apollo Server',
];

const AboutPage = () => {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
          }}
        >
          About
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mt: 1,
          }}
        >
          Learn about the purpose, scope, and technical foundation
          of the NEMA Breaker Selectivity Explorer.
        </Typography>
      </Box>

      <Alert severity="warning">
        This application is a learning project and must not be used
        as a substitute for official manufacturer documentation,
        coordination studies, or professional engineering judgment.
      </Alert>

      <Paper
        variant="outlined"
        sx={{
          p: 3,
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 600,
          }}
        >
          Project purpose
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mt: 1.5,
          }}
        >
          The application demonstrates an enterprise-style
          full-stack architecture through a focused electrical
          domain workflow. It maintains breaker reference data and
          retrieves selective coordination information for a chosen
          upstream and downstream breaker combination.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 600,
          }}
        >
          Technology stack
        </Typography>

        <List dense>
          {technologies.map((technology) => (
            <ListItem
              key={technology}
              disableGutters
            >
              <ListItemText primary={technology} />
            </ListItem>
          ))}
        </List>

        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ flexWrap: 'wrap' }}
        >
          <Chip label="Learning project" color="primary" />
          <Chip label="CRUD" variant="outlined" />
          <Chip label="REST" variant="outlined" />
          <Chip label="GraphQL" variant="outlined" />
        </Stack>
      </Paper>
    </Stack>
  );
};

export default AboutPage;