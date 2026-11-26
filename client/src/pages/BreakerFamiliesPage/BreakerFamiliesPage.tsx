import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Refresh as RefreshIcon,
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
import { useState } from 'react';
import BreakerFamilyFormDialog from '../../features/breakerFamilies/components/BreakerFamilyFormDialog';
import DeleteBreakerFamilyDialog from '../../features/breakerFamilies/components/DeleteBreakerFamilyDialog';
import {
  useBreakerFamilies,
  useCreateBreakerFamily,
  useDeleteBreakerFamily,
  useUpdateBreakerFamily,
} from '../../features/breakerFamilies/hooks/useBreakerFamilies';
import type { BreakerFamilyFormValues } from '../../features/breakerFamilies/schemas/breakerFamilySchema';
import type { BreakerFamily } from '../../features/breakerFamilies/types/breakerFamily.types';

type FormDialogState =
  | {
      open: false;
      mode: 'create';
      breakerFamily: null;
    }
  | {
      open: true;
      mode: 'create';
      breakerFamily: null;
    }
  | {
      open: true;
      mode: 'edit';
      breakerFamily: BreakerFamily;
    };

const BreakerFamiliesPage = () => {
  const [formDialog, setFormDialog] =
    useState<FormDialogState>({
      open: false,
      mode: 'create',
      breakerFamily: null,
    });

  const [
    breakerFamilyToDelete,
    setBreakerFamilyToDelete,
  ] = useState<BreakerFamily | null>(null);

  const {
    data: breakerFamilies = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useBreakerFamilies();

  const createMutation =
    useCreateBreakerFamily();

  const updateMutation =
    useUpdateBreakerFamily();

  const deleteMutation =
    useDeleteBreakerFamily();

  const openCreateDialog = () => {
    setFormDialog({
      open: true,
      mode: 'create',
      breakerFamily: null,
    });
  };

  const openEditDialog = (
    breakerFamily: BreakerFamily,
  ) => {
    setFormDialog({
      open: true,
      mode: 'edit',
      breakerFamily,
    });
  };

  const closeFormDialog = () => {
    setFormDialog({
      open: false,
      mode: 'create',
      breakerFamily: null,
    });
  };

  const handleFormSubmit = async (
    values: BreakerFamilyFormValues,
  ) => {
    if (formDialog.mode === 'edit') {
      await updateMutation.mutateAsync({
        id: formDialog.breakerFamily.id,
        input: values,
      });
    } else {
      await createMutation.mutateAsync(values);
    }

    closeFormDialog();
  };

  const openDeleteDialog = (
    breakerFamily: BreakerFamily,
  ) => {
    setBreakerFamilyToDelete(
      breakerFamily,
    );
  };

  const closeDeleteDialog = () => {
    setBreakerFamilyToDelete(null);
  };

  const handleDelete = async () => {
    if (!breakerFamilyToDelete) {
      return;
    }

    await deleteMutation.mutateAsync(
      breakerFamilyToDelete.id,
    );

    closeDeleteDialog();
  };

  const formMutationError =
    createMutation.error ??
    updateMutation.error;

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
          >
            Breaker Families
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
          >
            Manage breaker family reference data
            used throughout the selectivity
            explorer.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Tooltip title="Refresh">
            <span>
              <IconButton
                onClick={() => void refetch()}
                disabled={isFetching}
              >
                <RefreshIcon />
              </IconButton>
            </span>
          </Tooltip>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openCreateDialog}
          >
            Add Family
          </Button>
        </Stack>
      </Box>

      {isError && (
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => void refetch()}
            >
              Retry
            </Button>
          }
        >
          {error instanceof Error
            ? error.message
            : 'Unable to load breaker families.'}
        </Alert>
      )}

      {formMutationError && (
        <Alert severity="error">
          {formMutationError instanceof Error
            ? formMutationError.message
            : 'Unable to save the breaker family.'}
        </Alert>
      )}

      {deleteMutation.error && (
        <Alert severity="error">
          {deleteMutation.error instanceof Error
            ? deleteMutation.error.message
            : 'Unable to delete the breaker family.'}
        </Alert>
      )}

      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 240,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell
                  align="right"
                  width={120}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {breakerFamilies.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    align="center"
                  >
                    <Box sx={{ py: 5 }}>
                      <Typography
                        color="text.secondary"
                        gutterBottom
                      >
                        No breaker families found.
                      </Typography>

                      <Button
                        startIcon={<AddIcon />}
                        onClick={openCreateDialog}
                      >
                        Add your first family
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                breakerFamilies.map(
                  (breakerFamily) => (
                    <TableRow
                      key={breakerFamily.id}
                      hover
                    >
                      <TableCell>
                        {breakerFamily.name}
                      </TableCell>

                      <TableCell>
                        {breakerFamily.description ||
                          '—'}
                      </TableCell>

                      <TableCell>
                        <Chip
                          size="small"
                          label={
                            breakerFamily.status ===
                            'active'
                              ? 'Active'
                              : 'Inactive'
                          }
                          color={
                            breakerFamily.status ===
                            'active'
                              ? 'success'
                              : 'default'
                          }
                        />
                      </TableCell>

                      <TableCell align="right">
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() =>
                              openEditDialog(
                                breakerFamily,
                              )
                            }
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() =>
                              openDeleteDialog(
                                breakerFamily,
                              )
                            }
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ),
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <BreakerFamilyFormDialog
        open={formDialog.open}
        mode={formDialog.mode}
        breakerFamily={
          formDialog.breakerFamily
        }
        isSubmitting={
          createMutation.isPending ||
          updateMutation.isPending
        }
        onClose={closeFormDialog}
        onSubmit={handleFormSubmit}
      />

      <DeleteBreakerFamilyDialog
        open={
          breakerFamilyToDelete !== null
        }
        breakerFamily={
          breakerFamilyToDelete
        }
        isDeleting={
          deleteMutation.isPending
        }
        onClose={closeDeleteDialog}
        onConfirm={handleDelete}
      />
    </Stack>
  );
};

export default BreakerFamiliesPage;