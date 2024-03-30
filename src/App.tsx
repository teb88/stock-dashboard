import './App.css';

import {Box} from '@mui/joy';
import {Outlet} from 'react-router-dom';

function App() {
  return (
    <Box sx={{height: '100%'}}>
      <Outlet />
    </Box>
  );
}

export default App;
