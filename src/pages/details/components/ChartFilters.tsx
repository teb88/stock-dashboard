import {Box, Button, Sheet, ToggleButtonGroup} from '@mui/joy';
import React from 'react';

import {TimeInterval} from '../../../models/generic';

interface ChartFiltersProps {
  onChangeInterval: (newInterval: TimeInterval) => void;
  interval: TimeInterval;
}

const ChartFilters: React.FC<ChartFiltersProps> = ({
  onChangeInterval,
  interval,
}) => {
  const handleChangeInterval = (_: unknown, interval: TimeInterval | null) => {
    if (interval) {
      onChangeInterval(interval);
    }
  };

  // const handleChangehistoryTimeFrame = () => {
  //   // TODO
  // };

  return (
    <Sheet
      variant="outlined"
      sx={{p: 1, mb: 2, boxShadow: 'sm', borderRadius: 'md'}}
    >
      {/* Interval filter */}
      <Box>
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
      </Box>

      {/* history time frame  */}
      <Box>
        <input type="date" name="from" />
        <input type="date" name="to" />
      </Box>
    </Sheet>
  );
};

export default ChartFilters;
