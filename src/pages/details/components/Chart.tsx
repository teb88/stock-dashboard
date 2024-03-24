import React from 'react';
import {hook} from '../../../api/client';
import {TimeInterval} from '../../../models/generic';
import ChartView from './ChartView';
import {Sheet} from '@mui/joy';

interface ChatProps {
  symbol: string;
  interval: TimeInterval;
  dateRange?: [string, string];
}

const Chart: React.FC<ChatProps> = ({symbol, interval, dateRange}) => {
  const {data} = hook.useTimeSeries(symbol, interval, dateRange);
  return (
    <Sheet
      variant="outlined"
      sx={{boxShadow: 'sm', borderRadius: 'md', p: 2, flexGrow: 1}}
    >
      <ChartView data={data} />
    </Sheet>
  );
};

export default Chart;
