import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Option,
  Select,
  Typography,
} from '@mui/joy';
import React from 'react';

interface TablePaginatorProps {
  page: number;
  maxPages: number;
  rowsPerPage: number;
  totalRows: number;
  onChangeRowsPerPage: (ev: unknown, rowsPerPage: number | null) => void;
  onChangePage: (page: number) => void;
  range: readonly [number, number];
}

const TablePaginator: React.FC<TablePaginatorProps> = ({
  onChangeRowsPerPage,
  onChangePage,
  rowsPerPage,
  totalRows,
  maxPages,
  range,
  page,
}) => {
  return (
    <Box
      sx={{
        gap: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
      }}
    >
      <FormControl orientation="horizontal" size="sm">
        <FormLabel>Rows per page:</FormLabel>
        <Select onChange={onChangeRowsPerPage} value={rowsPerPage}>
          <Option value={10}>10</Option>
          <Option value={20}>20</Option>
          <Option value={30}>30</Option>
        </Select>
      </FormControl>
      <Typography textAlign="center" sx={{minWidth: 80}}>
        {range[0] + 1} - {range[1]} of {totalRows}
      </Typography>
      <Box sx={{display: 'flex', gap: 1}}>
        <IconButton
          size="sm"
          color="neutral"
          variant="outlined"
          disabled={page === 1}
          onClick={() => onChangePage(page - 1)}
          sx={{bgcolor: 'background.surface'}}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <IconButton
          size="sm"
          color="neutral"
          variant="outlined"
          disabled={page === maxPages}
          onClick={() => onChangePage(page + 1)}
          sx={{bgcolor: 'background.surface'}}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TablePaginator;
