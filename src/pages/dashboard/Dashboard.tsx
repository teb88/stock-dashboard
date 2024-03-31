import {Box, Typography} from '@mui/joy';

import PageLayout from '../../components/PageLayout';
import ExchangePicker from './components/ExchangePicker';
import StockTable from './components/StockTable';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

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
            <CurrencyExchangeIcon sx={{verticalAlign: 'sub', mx: 1}} />
            Listado de acciones
          </Typography>
          <ExchangePicker defaultExchange="NYSE" />
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
