import {Cancel} from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Sheet,
  ToggleButtonGroup,
  Typography,
} from '@mui/joy';
import React from 'react';

import {DateRange, TimeInterval} from '../../../models/generic';
import DateRangeFilter from './DateRangeFilter';

interface ChartFiltersProps {
  onChangeInterval: (newInterval: TimeInterval) => void;
  onChangeDateRange: (dateRange?: DateRange) => void;
  interval: TimeInterval;
  dateRange?: DateRange;
}

const ChartFilters: React.FC<ChartFiltersProps> = ({
  onChangeInterval,
  interval,
  onChangeDateRange,
  dateRange,
}) => {
  const handleChangeInterval = (_: unknown, interval: TimeInterval | null) => {
    if (interval) {
      onChangeInterval(interval);
    }
  };

  return (
    <Sheet
      variant="outlined"
      sx={{
        p: 1,
        mb: 2,
        display: 'flex',
        justifyContent: 'space-between',
        boxShadow: 'sm',
        borderRadius: 'md',
      }}
    >
      {/* Interval filter */}
      <FormControl orientation="horizontal" size="sm">
        <FormLabel>Interval:</FormLabel>
        <ToggleButtonGroup value={interval} onChange={handleChangeInterval}>
          <Button size="sm" value={TimeInterval.interval1min}>
            1m
          </Button>
          <Button size="sm" value={TimeInterval.interval5min}>
            5m
          </Button>
          <Button size="sm" value={TimeInterval.interval15min}>
            15m
          </Button>
        </ToggleButtonGroup>
      </FormControl>

      <Box sx={{textAlign: 'center'}}>
        {dateRange ? (
          <>
            <Typography fontWeight="bold" level="title-sm">
              Modo Histórico
            </Typography>
            <Typography level="body-sm">
              {dateRange.from} - {dateRange.to}
            </Typography>
          </>
        ) : (
          <>
            <Typography fontWeight="bold" level="title-sm">
              Modo Tiempo Real
            </Typography>
            <Typography level="body-sm">Hoy</Typography>
          </>
        )}
      </Box>

      {/* history time frame  */}
      <Box>
        {dateRange ? (
          <Button
            size="sm"
            onClick={() => onChangeDateRange()}
            variant="outlined"
          >
            <Cancel sx={{mr: 1, fontSize: 16}} />
            Clear Date Range
          </Button>
        ) : (
          <DateRangeFilter onChange={onChangeDateRange} />
        )}
      </Box>
    </Sheet>
  );
};

export default ChartFilters;
