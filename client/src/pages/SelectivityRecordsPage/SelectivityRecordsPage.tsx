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

import {
  useMemo,
  useState,
} from 'react';

import { useBreakers } from '../../features/breakers/hooks/useBreakers';

import { DeleteSelectivityRecordDialog } from '../../features/selectivityRecords/components/DeleteSelectivityRecordDialog';

import { SelectivityRecordFormDialog } from '../../features/selectivityRecords/components/SelectivityRecordFormDialog';

import { useSelectivityRecords } from '../../features/selectivityRecords/hooks/useSelectivityRecords';

import type { SelectivityRecord } from '../../features/selectivityRecords/types/selectivityRecord.types';

const SelectivityRecordsPage = () => {
  const {
    data: records = [],
    isLoading,
    isError,
    error,
  } = useSelectivityRecords();

  const {
    data: breakers = [],
    isLoading: breakersLoading,
    isError: breakersError,
    error: breakersQueryError,
  } = useBreakers();

  const [formOpen, setFormOpen] =
    useState(false);

  const [
    selectedRecord,
    setSelectedRecord,
  ] = useState<
    SelectivityRecord | undefined
  >();

  const [
    recordToDelete,
    setRecordToDelete,
  ] = useState<
    SelectivityRecord | undefined
  >();

  const breakerLabels = useMemo(() => {
    return new Map(
      breakers.map((breaker) => [
        breaker.id,
        `${breaker.catalogNumber} - ${breaker.ampereRating} A`,
      ]),
    );
  }, [breakers]);

  const handleAdd = () => {
    setSelectedRecord(undefined);
    setFormOpen(true);
  };

  const handleEdit = (
    record: SelectivityRecord,
  ) => {
    setSelectedRecord(record);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setSelectedRecord(undefined);
  };

  const handleDelete = (
    record: SelectivityRecord,
  ) => {
    setRecordToDelete(record);
  };

  const handleCloseDelete = () => {
    setRecordToDelete(undefined);
  };

  if (isLoading || breakersLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          py: 6,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        {error instanceof Error
          ? error.message
          : 'Unable to load selectivity records.'}
      </Alert>
    );
  }

  if (breakersError) {
    return (
      <Alert severity="error">
        {breakersQueryError instanceof Error
          ? breakersQueryError.message
          : 'Unable to load breakers.'}
      </Alert>
    );
  }

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
          >
            Selectivity Records
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Manage selective coordination
            relationships between upstream
            and downstream breakers.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          disabled={breakers.length < 2}
        >
          Add Record
        </Button>
      </Stack>

      {breakers.length < 2 && (
        <Alert severity="warning">
          At least two breakers are required
          before you can create a selectivity
          record.
        </Alert>
      )}

      {records.length === 0 ? (
        <Paper sx={{ p: 4 }}>
          <Typography
            align="center"
            color="text.secondary"
          >
            No selectivity records found.
            Create your first record to get
            started.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Voltage
                </TableCell>

                <TableCell>
                  Upstream Breaker
                </TableCell>

                <TableCell>
                  Downstream Breaker
                </TableCell>

                <TableCell>
                  Selectivity
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
              {records.map((record) => (
                <TableRow
                  key={record.id}
                  hover
                >
                  <TableCell>
                    {record.voltage} V
                  </TableCell>

                  <TableCell>
                    {breakerLabels.get(
                      record.upstreamBreakerId,
                    ) ?? 'Unknown breaker'}
                  </TableCell>

                  <TableCell>
                    {breakerLabels.get(
                      record.downstreamBreakerId,
                    ) ?? 'Unknown breaker'}
                  </TableCell>

                  <TableCell>
                    {record.selectivityKa} kA
                  </TableCell>

                  <TableCell>
                    <Chip
                      size="small"
                      label={
                        record.status ===
                        'active'
                          ? 'Active'
                          : 'Inactive'
                      }
                      color={
                        record.status ===
                        'active'
                          ? 'success'
                          : 'default'
                      }
                    />
                  </TableCell>

                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() =>
                          handleEdit(record)
                        }
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() =>
                          handleDelete(
                            record,
                          )
                        }
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

      <SelectivityRecordFormDialog
        open={formOpen}
        record={selectedRecord}
        breakers={breakers}
        onClose={handleCloseForm}
      />

      <DeleteSelectivityRecordDialog
        record={recordToDelete}
        onClose={handleCloseDelete}
      />
    </Stack>
  );
};

export default SelectivityRecordsPage;