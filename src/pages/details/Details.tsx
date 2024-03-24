import {Box} from '@mui/joy';
import {useState} from 'react';
import {useParams} from 'react-router-dom';

import {hook} from '../../api/client';
import {TimeInterval} from '../../models/generic';
import Chart from './components/Chart';
import ChartFilters from './components/ChartFilters';
import DetailsHeader from './components/DetailsHeader';

const Details = () => {
  const {symbol} = useParams<{symbol: string}>();
  const [interval, setInterval] = useState(TimeInterval.interval1min);
  const {data, isLoading} = hook.useStockDetails(symbol);

  if (isLoading) {
    return 'Loading details';
  }

  if (!data || !symbol) {
    return 'error acquiring data';
  }

  return (
    <Box
      component="section"
      sx={{display: 'flex', flexDirection: 'column', height: '100%'}}
    >
      <DetailsHeader {...data} />
      <ChartFilters interval={interval} onChangeInterval={setInterval} />
      <Chart interval={interval} symbol={symbol} />
    </Box>
  );
};

export default Details;
