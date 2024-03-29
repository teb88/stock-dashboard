import {Box, Sheet, Typography} from '@mui/joy';
import React from 'react';

import {hook} from '../../../api/client';
import {DateRange, TimeInterval} from '../../../models/generic';
import ChartView from './ChartView';

interface ChatProps {
  symbol: string;
  interval: TimeInterval;
  dateRange?: DateRange;
}

const Chart: React.FC<ChatProps> = ({symbol, interval, dateRange}) => {
  const {data, error, isSuccess} = hook.useTimeSeries(
    symbol,
    interval,
    dateRange
  );
  return (
    <Sheet
      variant="outlined"
      sx={{boxShadow: 'sm', borderRadius: 'md', p: 2, flexGrow: 1}}
    >
      {error && (
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Typography level="body-sm">{error.message}</Typography>
        </Box>
      )}

      {isSuccess && <ChartView data={data} />}
    </Sheet>
  );
};

export default Chart;
