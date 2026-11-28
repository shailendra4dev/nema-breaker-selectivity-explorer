import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';

import { useMemo, useState } from 'react';

import { useBreakerFamilies } from '../../features/breakerFamilies/hooks/useBreakerFamilies';

import { BreakerFormDialog } from '../../features/breakers/components/BreakerFormDialog';

import { DeleteBreakerDialog } from '../../features/breakers/components/DeleteBreakerDialog';

import { useBreakers } from '../../features/breakers/hooks/useBreakers';

import type { Breaker } from '../../features/breakers/types/breaker.types';

const BreakersPage = () => {
  const {
    data: breakers = [],
    isLoading,
    isError,
    error,
  } = useBreakers();

  const {
    data: families = [],
    isLoading: familiesLoading,
    isError: familiesError,
    error: familiesQueryError,
  } = useBreakerFamilies();

  const [formOpen, setFormOpen] = useState(false);

  const [selectedBreaker, setSelectedBreaker] = useState<
    Breaker | undefined
  >();

  const [breakerToDelete, setBreakerToDelete] = useState<
    Breaker | undefined
  >();

  /*
   * Convert the Breaker Family array into a Map:
   *
   * bf-1 -> PowerPact H
   * bf-2 -> PowerPact P
   *
   * This allows us to display the family name using the familyId
   * stored by each Breaker.
   */
  const familyNames = useMemo(() => {
    return new Map(
      families.map((family) => [
        family.id,
        family.name,
      ]),
    );
  }, [families]);

  /*
   * Open the form in create mode.
   *
   * selectedBreaker is cleared so BreakerFormDialog knows
   * that it should create a new Breaker.
   */
  const handleAdd = () => {
    setSelectedBreaker(undefined);
    setFormOpen(true);
  };

  /*
   * Open the form in edit mode.
   *
   * The selected Breaker is passed to BreakerFormDialog so
   * its values can be used as the form's default values.
   */
  const handleEdit = (breaker: Breaker) => {
    setSelectedBreaker(breaker);
    setFormOpen(true);
  };

  /*
   * Close the add/edit dialog and clear the selected Breaker.
   */
  const handleCloseForm = () => {
    setFormOpen(false);
    setSelectedBreaker(undefined);
  };

  /*
   * Store the Breaker that the user wants to delete.
   *
   * Once this value exists, the delete dialog opens.
   */
  const handleDelete = (breaker: Breaker) => {
    setBreakerToDelete(breaker);
  };

  /*
   * Closing the delete dialog also clears the selected
   * Breaker from the page state.
   */
  const handleCloseDelete = () => {
    setBreakerToDelete(undefined);
  };

  /*
   * Both datasets are required to display the table.
   *
   * Breakers provide familyId, while Breaker Families provide
   * the human-readable family name.
   */
  if (isLoading || familiesLoading) {
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

  /*
   * Handle errors from either query.
   */
  if (isError || familiesError) {
    const queryError = error ?? familiesQueryError;

    return (
      <Alert severity="error">
        {queryError instanceof Error
          ? queryError.message
          : 'Unable to load breakers.'}
      </Alert>
    );
  }

  return (
    <Stack spacing={3}>
      {/* Page heading and add button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h1"
          >
            Breakers
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Manage breakers and their breaker family relationships.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Add Breaker
        </Button>
      </Box>

      {/* Show an empty state when the API returns an empty array */}
      {breakers.length === 0 ? (
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography color="text.secondary">
            No breakers found. Add your first breaker.
          </Typography>
        </Paper>
      ) : (
        /*
         * Breaker table.
         *
         * The table gets Breaker data from useBreakers() and
         * resolves each familyId through the familyNames Map.
         */
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Catalog Number
                </TableCell>

                <TableCell>
                  Family
                </TableCell>

                <TableCell align="right">
                  Ampere Rating
                </TableCell>

                <TableCell align="right">
                  Poles
                </TableCell>

                <TableCell>
                  Status
                </TableCell>

                <TableCell align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {breakers.map((breaker) => (
                <TableRow
                  key={breaker.id}
                  hover
                >
                  <TableCell>
                    {breaker.catalogNumber}
                  </TableCell>

                  <TableCell>
                    {familyNames.get(breaker.familyId) ??
                      'Unknown family'}
                  </TableCell>

                  <TableCell align="right">
                    {breaker.ampereRating} A
                  </TableCell>

                  <TableCell align="right">
                    {breaker.poles}
                  </TableCell>

                  <TableCell>
                    <Chip
                      size="small"
                      label={
                        breaker.status === 'active'
                          ? 'Active'
                          : 'Inactive'
                      }
                      color={
                        breaker.status === 'active'
                          ? 'success'
                          : 'default'
                      }
                    />
                  </TableCell>

                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        aria-label={`Edit ${breaker.catalogNumber}`}
                        onClick={() => handleEdit(breaker)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="error"
                        aria-label={`Delete ${breaker.catalogNumber}`}
                        onClick={() => handleDelete(breaker)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/*
       * The same form dialog handles both create and edit.
       *
       * selectedBreaker undefined -> create mode
       * selectedBreaker defined   -> edit mode
       */}
      <BreakerFormDialog
        open={formOpen}
        breaker={selectedBreaker}
        onClose={handleCloseForm}
      />

      {/*
       * Boolean(undefined) is false, so the dialog remains
       * closed until the user selects a Breaker to delete.
       */}
      <DeleteBreakerDialog
        open={Boolean(breakerToDelete)}
        breaker={breakerToDelete}
        onClose={handleCloseDelete}
      />
    </Stack>
  );
};

export default BreakersPage;