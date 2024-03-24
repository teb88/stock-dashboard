import {Box, Typography} from '@mui/joy';
import StockTable from './components/StockTable';

const Dashboard = () => {
  return (
    <Box component="main" sx={{height: '100%'}}>
      <Typography level="h1" textAlign="center">
        Dashboard
      </Typography>
      <Box sx={{p: 3, height: '90%', overflow: 'hidden'}}>
        <StockTable />
      </Box>
    </Box>
  );
};

export default Dashboard;
