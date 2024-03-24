import {CandlestickData, UTCTimestamp} from 'lightweight-charts';

import {TimeSeriesItem} from '../responses';

export const TimeSeries = (
  ts: TimeSeriesItem
): CandlestickData<UTCTimestamp> => {
  const timeSeries: CandlestickData<UTCTimestamp> = {
    close: parseFloat(ts.close),
    open: parseFloat(ts.open),
    high: parseFloat(ts.high),
    low: parseFloat(ts.low),
    time: (new Date(ts.datetime).getTime() / 1000) as UTCTimestamp,
  };

  return timeSeries;
};
