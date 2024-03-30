import {Box, Typography} from '@mui/joy';

import StockTable from './components/StockTable';
import PageLayout from '../../components/PageLayout';

const Dashboard = () => {
  return (
    <PageLayout
      headerContent={
        <Typography level="h1" fontSize={14} sx={{color: 'inherit'}}>
          Listado de acciones
        </Typography>
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
