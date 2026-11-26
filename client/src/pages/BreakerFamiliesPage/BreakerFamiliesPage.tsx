import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import {
  Box,
  Button,
  Chip,
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

import BreakerFamilyFormDialog from '../../features/breakerFamilies/components/BreakerFamilyFormDialog';
import DeleteBreakerFamilyDialog from '../../features/breakerFamilies/components/DeleteBreakerFamilyDialog';
import type { BreakerFamilyFormValues } from '../../features/breakerFamilies/schemas/breakerFamilySchema';
import type { BreakerFamily } from '../../features/breakerFamilies/types/breakerFamily.types';

const initialBreakerFamilies: BreakerFamily[] = [
  {
    id: 'bf-1',
    name: 'PowerPact H',
    description: 'Molded case circuit breaker family.',
    status: 'active',
  },
  {
    id: 'bf-2',
    name: 'PowerPact J',
    description: 'Compact molded case circuit breaker family.',
    status: 'active',
  },
  {
    id: 'bf-3',
    name: 'Legacy Family',
    description: 'Example inactive breaker family.',
    status: 'inactive',
  },
];

const BreakerFamiliesPage = () => {
  const [breakerFamilies, setBreakerFamilies] =
    useState<BreakerFamily[]>(initialBreakerFamilies);

  const [formOpen, setFormOpen] = useState(false);

  const [selectedFamily, setSelectedFamily] =
    useState<BreakerFamily | null>(null);

  const [familyToDelete, setFamilyToDelete] =
    useState<BreakerFamily | null>(null);

  const handleAdd = () => {
    setSelectedFamily(null);
    setFormOpen(true);
  };

  const handleEdit = (family: BreakerFamily) => {
    setSelectedFamily(family);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setSelectedFamily(null);
  };

  const handleFormSubmit = (
    values: BreakerFamilyFormValues,
  ) => {
    if (selectedFamily) {
      setBreakerFamilies((currentFamilies) =>
        currentFamilies.map((family) =>
          family.id === selectedFamily.id
            ? {
                ...family,
                ...values,
              }
            : family,
        ),
      );
    } else {
      const newFamily: BreakerFamily = {
        id: crypto.randomUUID(),
        ...values,
      };

      setBreakerFamilies((currentFamilies) => [
        ...currentFamilies,
        newFamily,
      ]);
    }

    handleFormClose();
  };

  const handleDeleteRequest = (
    family: BreakerFamily,
  ) => {
    setFamilyToDelete(family);
  };

  const handleDeleteClose = () => {
    setFamilyToDelete(null);
  };

  const handleDeleteConfirm = () => {
    if (!familyToDelete) {
      return;
    }

    setBreakerFamilies((currentFamilies) =>
      currentFamilies.filter(
        (family) => family.id !== familyToDelete.id,
      ),
    );

    handleDeleteClose();
  };

  return (
    <Stack spacing={3}>
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          alignItems: {
            xs: 'stretch',
            sm: 'center',
          },
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

          <Typography color="text.secondary">
            Manage the breaker families used by the
            selectivity explorer.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Add Family
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>

              <TableCell>
                Description
              </TableCell>

              <TableCell width={120}>
                Status
              </TableCell>

              <TableCell
                width={120}
                align="right"
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
                  sx={{ py: 6 }}
                >
                  <Typography
                    color="text.secondary"
                  >
                    No breaker families found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              breakerFamilies.map((family) => (
                <TableRow
                  key={family.id}
                  hover
                >
                  <TableCell>
                    <Typography sx={{ fontWeight: 500 }}>
                      {family.name}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    {family.description || '—'}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={
                        family.status === 'active'
                          ? 'Active'
                          : 'Inactive'
                      }
                      color={
                        family.status === 'active'
                          ? 'success'
                          : 'default'
                      }
                      size="small"
                    />
                  </TableCell>

                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        aria-label={`Edit ${family.name}`}
                        onClick={() =>
                          handleEdit(family)
                        }
                      >
                        <EditOutlinedIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        aria-label={`Delete ${family.name}`}
                        color="error"
                        onClick={() =>
                          handleDeleteRequest(
                            family,
                          )
                        }
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <BreakerFamilyFormDialog
        open={formOpen}
        breakerFamily={selectedFamily}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
      />

      <DeleteBreakerFamilyDialog
        open={Boolean(familyToDelete)}
        breakerFamily={familyToDelete}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
      />
    </Stack>
  );
};

export default BreakerFamiliesPage;