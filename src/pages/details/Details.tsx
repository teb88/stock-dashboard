import {ChevronLeft} from '@mui/icons-material';
import {Box, IconButton, Typography} from '@mui/joy';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {hook} from '../../api/client';
import LoadingIndicator from '../../components/LoadingIndicator';
import PageLayout from '../../components/PageLayout';
import {DateRange, TimeInterval} from '../../models/generic';
import Chart from './components/Chart';
import ChartFilters from './components/ChartFilters';
import DetailsHeader from './components/DetailsHeader';

const Details = () => {
  const navigate = useNavigate();
  const {symbol} = useParams<{symbol: string}>();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [interval, setInterval] = useState<TimeInterval>(
    TimeInterval.interval1min
  );

  const {data, isLoading} = hook.useStockDetails(symbol);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (!data || !symbol) {
    return 'error acquiring data';
  }

  return (
    <PageLayout
      headerContent={
        <>
          <IconButton sx={{color: 'neutral.200'}} onClick={() => navigate(-1)}>
            <ChevronLeft />
          </IconButton>
          <Typography sx={{color: 'inherit'}}>{symbol}</Typography>
        </>
      }
    >
      <Box
        component="section"
        sx={{display: 'flex', flexDirection: 'column', height: '100%'}}
      >
        <DetailsHeader {...data} />
        <ChartFilters
          interval={interval}
          onChangeInterval={setInterval}
          onChangeDateRange={setDateRange}
          dateRange={dateRange}
        />
        <Chart interval={interval} symbol={symbol} dateRange={dateRange} />
      </Box>
    </PageLayout>
  );
};

export default Details;
