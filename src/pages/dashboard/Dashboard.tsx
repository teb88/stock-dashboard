import {Box, Typography} from '@mui/joy';

import PageLayout from '../../components/PageLayout';
import ExchangesBar from './components/ExchangesBar';
import StockTable from './components/StockTable';

const Dashboard = () => {
  return (
    <PageLayout
      headerContent={
        <>
          <Typography
            level="h1"
            fontSize={14}
            sx={{color: 'inherit', flexShrink: 0}}
          >
            Listado de acciones
          </Typography>
          <ExchangesBar defaultExchange="NYSE" />
        </>
      }
    >
      <Box
        component="main"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{flexGrow: 1, overflow: 'hidden'}}>
          <StockTable />
        </Box>
      </Box>
    </PageLayout>
  );
};

export default Dashboard;
