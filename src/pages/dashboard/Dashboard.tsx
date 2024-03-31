import {Box} from '@mui/joy';

import PageLayout from '../../components/PageLayout';
import HeaderContent from './components/HeaderContent';
import StockTable from './components/StockTable';

const Dashboard = () => {
  return (
    <PageLayout headerContent={<HeaderContent />}>
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
